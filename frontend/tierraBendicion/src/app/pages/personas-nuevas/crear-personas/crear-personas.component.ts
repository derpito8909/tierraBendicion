// importaciones externas
import { Component, inject, OnInit, OnDestroy, model } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
//importaciones internas
import { Members } from '../../../interfaces/members';
import { Courses } from '../../../interfaces/courses';
import { ApiService } from '../../../services/api.service';
import { NavegacionComponent } from '../../../components/navegacion/navegacion.component';
import { NotificationService } from '../../../services/notification.service';
import { ProgresoEsperaComponent } from '../../../components/progreso-espera/progreso-espera.component';

@Component({
  selector: 'app-crear-personas',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NavegacionComponent,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    RouterLink,
    ProgresoEsperaComponent,
  ],
  templateUrl: './crear-personas.component.html',
  styleUrls: ['./crear-personas.component.css'],
})
export class CrearPersonasComponent implements OnInit, OnDestroy {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private activeRouter = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);

  private destroy$ = new Subject<void>();

  errorMessage: string | null = null;
  isEditMode = false;
  memberId: string | null = this.activeRouter.snapshot.paramMap.get('id');
  lastCompletedCourse: Courses | null = null;
  selectedCompletedCourse: string | null = null;
  availableCourses: Courses[] = [];
  displayedCourses: Courses[] = [];
  maritalStatus: string[] = ['Soltero', 'Casado', 'Union Libre'];
  showLoader: boolean = false;
  readonly checked = model(true);

  memberForm: FormGroup = this.createFormGroup();

  ngOnInit(): void {
    this.loadCourseData();
    this.isEditMode = Boolean(this.memberId);
    if (this.isEditMode) {
      this.loadMemberData();
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      fullname: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      neighbourhood: new FormControl(''),
      reference: new FormControl(''),
      cellPhoneNumber: new FormControl('', [Validators.required]),
      visitAccepted: new FormControl(''),
      visitTime: new FormControl(''),
      maritalStatus: new FormControl('', [Validators.required]),
      age: new FormControl(null, [Validators.required, Validators.min(0)]),
      prayerRequest: new FormControl(''),
      isActive: new FormControl(true),
      course: new FormControl(''),
    });
  }

  private getMemberData(): Members | null {
    return this.memberForm.valid ? (this.memberForm.value as Members) : null;
  }

  private loadCourseData(): void {
    this.apiService
      .getAll<Courses>('courses')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (courses) => {
          this.availableCourses = courses;
          console.log(courses);
        },
        error: (err) => this.handleError(err),
      });
  }

  private loadMemberData(): void {
    this.apiService
      .getById<Members>('members', this.memberId!)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (member) => {
          this.selectedCompletedCourse = member.course[0]._id;
          this.memberForm.patchValue(member);
        },
        error: (err) => this.handleError(err),
      });
  }

  onSubmit(): void {
    const memberData = this.getMemberData();
    if (memberData) {
      const request$ = this.isEditMode
        ? this.apiService.update<Members>('members', this.memberId!, memberData)
        : this.apiService.create<Members>('members', memberData);

      request$.pipe(takeUntil(this.destroy$)).subscribe({
        next: (res) => {
          this.showLoader = true;
          setTimeout(() => {
            this.handleSuccess(res);
          }, 1000);
        },
        error: (err) => {
          this.showLoader = true;
          setTimeout(() => {
            this.handleError(err);
          }, 1000);
        },
      });
    }
  }

  private handleSuccess(res: any): void {
    this.memberForm.reset();
    this.notificationService.showSuccess(
      `Miembro ${this.isEditMode ? 'Modificado' : 'Creado'} correctamente`
    );
    this.router.navigate(['miembros/list']);
  }

  private handleError(err: any): void {
    this.showLoader = false;
    this.errorMessage = err.message;
  }
}
