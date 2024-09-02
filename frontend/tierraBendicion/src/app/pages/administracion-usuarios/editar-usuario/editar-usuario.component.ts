//exportaciones externas
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
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
//exportaciones internas
import { Users } from '../../../interfaces/users';
import { ApiService } from '../../../services/api.service';
import { NavegacionComponent } from '../../../components/navegacion/navegacion.component';
import { NotificationService } from '../../../services/notification.service';
import { ProgresoEsperaComponent } from '../../../components/progreso-espera/progreso-espera.component';

@Component({
  selector: 'app-editar-usuario',
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
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css',
})
export class EditarUsuarioComponent implements OnInit, OnDestroy {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private activeRouter = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);

  private destroy$ = new Subject<void>();

  errorMessage: string | null = null;
  editUserId: string | null = this.activeRouter.snapshot.paramMap.get('id');
  showLoader: boolean = false;
  categories: string[] = ['pastor', 'servidor', 'lider', 'profesor'];

  editUserForm: FormGroup = this.createFormGroup();
  ngOnInit(): void {
    this.loadUserData();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      category: new FormControl(''),
    });
  }

  private getEditUserData(): Users | null {
    return this.editUserForm.valid ? (this.editUserForm.value as Users) : null;
  }

  private loadUserData(): void {
    this.apiService
      .getById<Users>('users', this.editUserId!)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (user) => {
          this.editUserForm.patchValue(user);
        },
        error: (err) => this.handleError(err),
      });
  }

  onSubmit(): void {
    const userData = this.getEditUserData();
    if (userData) {
      this.showLoader = true;
      this.apiService
        .update<Users>('users', this.editUserId!, userData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            setTimeout(() => {
              this.handleSuccess(res);
            }, 1000);
          },
          error: (err) => {
            setTimeout(() => {
              this.handleError(err);
            }, 1000);
          },
        });
    }
  }

  private handleSuccess(res: any): void {
    this.editUserForm.reset();
    this.notificationService.showSuccess(`Datos actualizados correctamente`);
    this.router.navigate(['administracionUsuarios']);
  }

  private handleError(err: any): void {
    this.showLoader = false;
    this.errorMessage = err.message;
  }
}
