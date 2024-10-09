//importaciones extrenas
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
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
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, DatePipe } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
//importaciones internas
import { Activity } from '../../../interfaces/activity';
import { Users } from '../../../interfaces/users';
import { ApiService } from '../../../services/api.service';
import { NavegacionComponent } from '../../../components/navegacion/navegacion.component';
import { NotificationService } from '../../../services/notification.service';
import { ProgresoEsperaComponent } from '../../../components/progreso-espera/progreso-espera.component';

@Component({
  selector: 'app-crear-actividad',
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
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css'],
  providers: [DatePipe],
})
export class CrearActividadComponent implements OnInit, OnDestroy {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private activeRouter = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  private datePipe = inject(DatePipe);
  private destroy$ = new Subject<void>();

  errorMessage: string | null = null;
  isEditMode = false;
  activityId: string | null = this.activeRouter.snapshot.paramMap.get('id');
  leaderUsers: Users[] = [];
  showLoader: boolean = false;

  activityForm: FormGroup = this.createFormGroup();

  ngOnInit(): void {
    this.isEditMode = Boolean(this.activityId);
    this.isEditMode ? this.loadActivityData() : this.loadUserLeader();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      date: new FormControl<Date | null>(null, [Validators.required]),
      attendance: new FormControl('', [Validators.required]),
      user: new FormControl(''),
    });
  }

  private getActivityData(): Activity | null {
    return this.activityForm.valid
      ? (this.activityForm.value as Activity)
      : null;
  }

  private loadUserLeader(): void {
    this.apiService
      .getByRol<Users>('users', 'lider')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (leader) => {
          this.leaderUsers = leader;
        },
        error: (err) => this.handleError(err),
      });
  }
  private loadActivityData(): void {
    this.apiService
      .getById<Activity>('activities', this.activityId!)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (activity) => {
          this.leaderUsers = activity.user;
          this.activityForm.patchValue(activity);
        },
        error: (err) => this.handleError(err),
      });
  }

  onSubmit(): void {
    const activityData = this.getActivityData();
    console.log(activityData);
    if (activityData) {
      activityData.date = this.datePipe.transform(
        activityData.date,
        'yyyy-MM-dd'
      ) as unknown as Date;
      const request$ = this.isEditMode
        ? this.apiService.update<Activity>(
            'activities',
            this.activityId!,
            activityData
          )
        : this.apiService.create<Activity>('activities', activityData);
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
    this.activityForm.reset();
    this.notificationService.showSuccess(
      `Actividad ${this.isEditMode ? 'Modificada' : 'Creada'} correctamente`
    );
    this.router.navigate(['actividadesEspeciales/list']);
  }

  private handleError(err: any): void {
    this.showLoader = false;
    this.errorMessage = err.message;
  }
}
