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
import { CommonModule } from '@angular/common';
import { Users } from '../../../interfaces/users';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavegacionComponent } from '../../../components/navegacion/navegacion.component';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../../services/notification.service';
import { ProgresoEsperaComponent } from '../../../components/progreso-espera/progreso-espera.component';

@Component({
  selector: 'app-nuevo-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NavegacionComponent,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
    ProgresoEsperaComponent,
  ],
  templateUrl: './nuevo-usuario.component.html',
  styleUrl: './nuevo-usuario.component.css',
})
export class NuevoUsuarioComponent implements OnInit, OnDestroy {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private activeRouter = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);

  private subscription: Subscription | null = null;

  errorMessage: string | null = null;
  isEditMode = false;
  userId: string | null = this.activeRouter.snapshot.paramMap.get('id');
  categories: string[] = ['pastor', 'servidor', 'lider', 'profesor'];
  showLoader: boolean = false;

  userForm = this.createFormGroup();

  ngOnInit(): void {
    if (this.userId) {
      this.isEditMode = true;
      this.loadUserData();
    }
    console.log(this.isEditMode);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      fullname: new FormControl(
        { value: '', disabled: this.isEditMode },
        Validators.required
      ),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      category: new FormControl('', Validators.required),
    });
  }

  private loadUserData(): void {
    this.subscription = this.apiService
      .getById<Users>('users', this.userId!)
      .subscribe({
        next: (res) => this.userForm.patchValue(res),
        error: (err) => this.handleError(err),
      });
  }

  private getUserData(): Users | null {
    return this.userForm.valid ? (this.userForm.value as Users) : null;
  }

  onSubmit(): void {
    const userData = this.getUserData();
    if (userData) {
      const request$ = this.isEditMode
        ? this.apiService.update<Users>('users', this.userId!, userData)
        : this.apiService.create<Users>('users', userData);

      this.subscription = request$.subscribe({
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
    this.userForm.reset();
    this.notificationService.showSuccess(
      `Usuario ${this.isEditMode ? 'Modificado' : 'Creado'} correctamente`
    );
    this.router.navigate(['administracionUsuarios']);
  }

  private handleError(err: any): void {
    this.showLoader = false;
    this.errorMessage = err.message;
  }
}
