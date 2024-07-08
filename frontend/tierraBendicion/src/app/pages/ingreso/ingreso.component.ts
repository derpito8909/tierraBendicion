import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; // interactuar con formularios en angular
import { Router } from '@angular/router'; // redireccion a otra pagina

@Component({
  selector: 'app-ingreso',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ingreso.component.html',
  styleUrl: './ingreso.component.css',
})
export class IngresoComponent {
  // inyectar la directiva del router
  router = inject(Router);
  // validacion para la administracion
  administracion = {
    correo: 'prueba@gmail.com',
    contrasena: 'david123',
  };
  correo: string = '';
  contrasena: string = '';

  // logica para redireccionar a la otra pagina
  iniciarSesion() {
    if (
      this.correo === this.administracion.correo &&
      this.contrasena === this.administracion.contrasena
    ) {
      this.router.navigate(['/principal']);
    } else {
      alert('correo y contraseña incorrectos');
    }
  }
}
