import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
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
//importaciones internas
import { UserProfileService } from '../../services/user-profile.service';
import { Users } from '../../interfaces/users';
import { ProgresoEsperaComponent } from '../../components/progreso-espera/progreso-espera.component';
import { NotificationService } from '../../services/notification.service';
import { NavegacionComponent } from '../../components/navegacion/navegacion.component';

@Component({
  selector: 'app-perfil-usuario',
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
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css',
})
export class PerfilUsuarioComponent implements OnInit, OnDestroy {
  private userProfileService = inject(UserProfileService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  private destroy$ = new Subject<void>();

  errorMessage: string | null = null;
  userProfile: Users | null = null;
  showLoader: boolean = false;

  profileForm: FormGroup = this.createFormGroup();

  ngOnInit(): void {
    this.showLoader = true;
    this.getProfileData();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  private getProfileData(): void {
    this.userProfileService
      .getUserProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (profile) => {
          setTimeout(() => {
            this.showLoader = false;
            this.userProfile = profile;
            this.profileForm.patchValue({
              fullname: profile.fullname,
              email: profile.email,
            });
          }, 1000);
        },
        error: (err) => {
          setTimeout(() => {
            this.handleError(err);
          }, 1000);
        },
      });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      return;
    }
    this.userProfileService
      .updateUserProfile(this.profileForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (profile) => {
          this.showLoader = true;
          setTimeout(() => {
            this.profileForm.reset();
            this.notificationService.showSuccess(
              `Perfil actualizado correctamente`
            );
            this.router.navigate(['principal']);
          }, 1000);
        },
        error: (err) => {
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
