import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
//importaciones internas
import { UserProfileService } from '../../../services/user-profile.service';
import { Users } from '../../../interfaces/users';
import { ProgresoEsperaComponent } from '../../../components/progreso-espera/progreso-espera.component';
import { NotificationService } from '../../../services/notification.service';
import { NavegacionComponent } from '../../../components/navegacion/navegacion.component';

@Component({
  selector: 'app-cambiar-contrasena',
  standalone: true,
  imports: [
    ProgresoEsperaComponent,
    RouterLink,
    NavegacionComponent,
    ReactiveFormsModule,
    NavegacionComponent,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './cambiar-contrasena.component.html',
  styleUrl: './cambiar-contrasena.component.css',
})
export class CambiarContrasenaComponent implements OnInit, OnDestroy {
  private userProfileService = inject(UserProfileService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  private destroy$ = new Subject<void>();

  errorMessage: string | null = null;
  showLoader: boolean = false;

  changePaswordForm: FormGroup = this.createFormGroup();

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createFormGroup(): FormGroup {
    return new FormGroup(
      {
        oldPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordsMatchValidator() }
    );
  }

  passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;
      const newPassword = group.get('newPassword')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return newPassword === confirmPassword
        ? null
        : { passwordsMismatch: true };
    };
  }

  onSubmit(): void {
    if (this.changePaswordForm.invalid) {
      return;
    }
    const { oldPassword, newPassword } = this.changePaswordForm.value;

    this.userProfileService
      .changePassword(oldPassword, newPassword)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (profile) => {
          this.showLoader = true;
          setTimeout(() => {
            this.changePaswordForm.reset();
            this.notificationService.showSuccess(
              `contraseña cambiada correctamente`
            );
            this.router.navigate(['principal']);
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

  private handleError(err: any): void {
    this.showLoader = false;
    this.errorMessage = err.message;
  }
}
