//importaciones extrenas
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, DatePipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
//importaciones internas
import { Courses } from '../../../interfaces/courses';
import { Users } from '../../../interfaces/users';
import { ApiService } from '../../../services/api.service';
import { NavegacionComponent } from '../../../components/navegacion/navegacion.component';
import { NotificationService } from '../../../services/notification.service';
import { ProgresoEsperaComponent } from '../../../components/progreso-espera/progreso-espera.component';

@Component({
  selector: 'app-crear-cursos',
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
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './crear-cursos.component.html',
  styleUrls: ['./crear-cursos.component.css'],
  providers: [DatePipe],
})
export class CrearCursosComponent implements OnInit, OnDestroy {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private activeRouter = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  private datePipe = inject(DatePipe);

  private destroy$ = new Subject<void>();

  errorMessage: string | null = null;
  isEditMode = false;
  courseId: string | null = this.activeRouter.snapshot.paramMap.get('id');
  teacherUsers: Users[] = [];
  showLoader: boolean = false;

  courseForm: FormGroup = this.createFormGroup();

  ngOnInit(): void {
    this.isEditMode = Boolean(this.courseId);
    this.isEditMode ? this.loadCourseData() : this.loadUserTeacher();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      user: new FormControl(''),
      dateStart: new FormControl<Date | null>(null, [Validators.required]),
      dateEnd: new FormControl<Date | null>(null, [Validators.required]),
      schedule: new FormControl(
        'Jueves 7:30 pm a 8:30 pm - Domingos 7 am -8 am'
      ),
    });
  }

  private getCourseData(): Courses | null {
    return this.courseForm.valid ? (this.courseForm.value as Courses) : null;
  }

  private loadUserTeacher(): void {
    this.apiService
      .getByRol<Users>('users', 'profesor')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (teacher) => {
          this.teacherUsers = teacher;
        },
        error: (err) => this.handleError(err),
      });
  }

  private loadCourseData(): void {
    this.apiService
      .getById<Courses>('courses', this.courseId!)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (course) => {
          this.courseForm.patchValue(course);
        },
        error: (err) => this.handleError(err),
      });
  }

  onSubmit(): void {
    const courseData = this.getCourseData();
    if (courseData) {
      courseData.dateStart = this.datePipe.transform(
        courseData.dateStart,
        'yyyy-MM-dd'
      ) as unknown as Date;
      courseData.dateEnd = this.datePipe.transform(
        courseData.dateEnd,
        'yyyy-MM-dd'
      ) as unknown as Date;
      const request$ = this.isEditMode
        ? this.apiService.update<Courses>('courses', this.courseId!, courseData)
        : this.apiService.create<Courses>('courses', courseData);
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
    this.courseForm.reset();
    this.notificationService.showSuccess(
      `curso ${this.isEditMode ? 'Modificado' : 'Creado'} correctamente`
    );
    this.router.navigate(['educacionCristiana/curso/list']);
  }

  private handleError(err: any): void {
    this.showLoader = false;
    this.errorMessage = err.message;
  }
}
