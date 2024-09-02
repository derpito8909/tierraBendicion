import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  private loginService = inject(LoginService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // obtener el token desde el servicio de login
    const authToken = this.loginService.getToken();

    // Clonar la solicitud y añadir el encabezado de Authorization con el token
    if (authToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });

      // Continuar con la solicitud modificada
      return next.handle(authReq);
    }

    // Si no hay token, continuar con la solicitud original
    return next.handle(req);
  }
}
