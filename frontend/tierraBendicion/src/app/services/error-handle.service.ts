import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoginService } from './login.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  private router = inject(Router);
  private navegation = inject(ActivatedRoute);
  private loginService = inject(LoginService);
  private notificactionService = inject(NotificationService);

  handleHttpError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de red
      this.notificactionService.showError(error.error.message);
    } else if (!navigator.onLine) {
      this.notificactionService.showError(
        'No tienes conexión a Internet. Revisa tu conexión e intenta nuevamente.'
      );
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 401:
          this.notificactionService.showError(error.error.message);
          break;
        case 403:
          this.notificactionService.showError(error.error.message);
          break;
        case 400:
          errorMessage = `${error.error.message}`;
          break;
        case 404:
          errorMessage = `${error.error.message}`;
          break;
        case 500:
          this.notificactionService.showError(error.error.message);
          break;
        default:
          errorMessage = '';
          this.notificactionService.showError(
            'Ocurrió un error inesperado. Inténtalo más tarde.'
          );
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
