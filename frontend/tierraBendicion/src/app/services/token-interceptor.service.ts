import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { LoginService } from './login.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  private tokenService = inject(TokenService);
  private loginservice = inject(LoginService);
  private nottificationService = inject(NotificationService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.tokenService.isTokenExpired()) {
      // obtener el token desde el servicio de login
      const authToken = this.tokenService.getToken();

      // Clonar la solicitud y añadir el encabezado de Authorization con el token
      if (authToken) {
        const authReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${authToken}`),
        });

        // Continuar con la solicitud modificada
        return next.handle(authReq);
      }
    } else {
      this.nottificationService.showError(
        'La sesion ha Expirado, por favor inicie sesión nuevamente'
      );
      this.loginservice.logout();
      this.loginservice.redirectToLogin();
    }

    // Si no hay token, continuar con la solicitud original
    return next.handle(req);
  }
}
