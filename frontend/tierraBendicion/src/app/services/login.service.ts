import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from '../interfaces/credentials';
import { LoginResponse } from '../interfaces/login-response';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = `${environment.apiUrl}/login`;
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private tokenService = inject(TokenService);

  login(credentials: Credentials): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<LoginResponse>(this.apiUrl, credentials, {
      headers,
    });
  }

  // Verifica si el usuario es administrador
  isAdmin(): boolean {
    const decodedToken = this.tokenService.decodeToken();
    return decodedToken?.isAdmin ?? false;
  }
  isLeader(): boolean {
    const decodedToken = this.tokenService.decodeToken();
    return decodedToken?.isLeader ?? false;
  }

  // Verifica si el usuario ha iniciado sesión
  isLoggedIn(): boolean {
    return !!this.tokenService.getToken();
  }

  redirectToLogin(): void {
    this.router.navigate(['/inicio']);
  }

  setNameUser(name: string): void {
    localStorage.setItem('nameUser', name);
  }

  getNameUser(): string {
    return localStorage.getItem('nameUser') ?? '';
  }

  setRolUser(rol: string): void {
    localStorage.setItem('rolUser', rol);
  }

  getRolUser(): string {
    return localStorage.getItem('rolUser') ?? '';
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('nameUser');
    localStorage.removeItem('rolUser');
    this.router.navigate(['/inicio']);
  }
}
