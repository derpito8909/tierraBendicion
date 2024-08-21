import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Credentials } from '../../interfaces/credentials';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  private loginService = inject(LoginService);

  // Conectar el formulario con nuestro grupo de controles
  credentialForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessage: string | null = null;

  // Obtener las credenciales para iniciar sesión
  private getCredentials(): Credentials | null {
    if (this.credentialForm.valid) {
      return this.credentialForm.value as Credentials;
    }
    return null;
  }

  //metodo para hacer la peticion de login
  onLogin(): void {
    const credentials = this.getCredentials();

    if (credentials) {
      this.loginService.login(credentials).subscribe({
        next: (res: any) => {
          if (res?.token) {
            this.loginService.setToken(res.token);
            console.log(res);
          }
          this.errorMessage = null;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = err.message;
          this.credentialForm.reset();
        },
      });
    }
  }
}
