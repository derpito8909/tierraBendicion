import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private jwtHelper = inject(JwtHelperService);
  private http = inject(HttpClient);

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Decodifica el token y retorna su contenido
  decodeToken(): any {
    const token = this.getToken();
    return token ? jwtDecode<any>(token) : null;
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (token) {
      const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
      if (expirationDate) {
        const now = new Date();
        const timeLeft = expirationDate.getTime() - now.getTime();
        const minutesLeft = timeLeft / 60000; // Convertir milisegundos a minutos
        return minutesLeft < 0;
      }
    }
    return false;
  }
}
