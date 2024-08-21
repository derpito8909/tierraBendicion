import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  private router = inject(Router);
  private navegation = inject(ActivatedRoute);
  toastrService = inject(ToastrService);
  private loginService = inject(LoginService);

  handleHttpError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de red
      errorMessage = `Error: ${error.error.message}`;
    } else if (!navigator.onLine) {
      errorMessage =
        'No tienes conexión a Internet. Revisa tu conexión e intenta nuevamente.';
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 401:
        case 403:
          errorMessage = `${error.error.message}`;
          this.toastrService.error(error.error.message);
          this.loginService.logout();
          break;
        case 400:
          errorMessage = `${error.error.message}`;
          break;
        case 404:
          errorMessage = `${error.error.message}`;
          break;
        case 500:
          this.toastrService.error(error.error.message);
          break;
        default:
          errorMessage = 'Ocurrió un error inesperado. Inténtalo más tarde.';
      }
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
