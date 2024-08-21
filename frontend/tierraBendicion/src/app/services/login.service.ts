import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from '../interfaces/credentials';
import { LoginResponse } from '../interfaces/login-response';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'https://tierrabendicion.azurewebsites.net/login';
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private toastrService = inject(ToastrService);

  login(credentials: Credentials): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<LoginResponse>(this.apiUrl, credentials, {
      headers,
    });
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Decodifica el token y retorna su contenido
  private decodeToken(): any {
    const token = this.getToken();
    return token ? jwtDecode<any>(token) : null;
  }

  // Verifica si el usuario es administrador
  isAdmin(): boolean {
    const decodedToken = this.decodeToken();
    return decodedToken?.isAdmin ?? false;
  }
  isLeader(): boolean {
    const decodedToken = this.decodeToken();
    return decodedToken?.isLeader ?? false;
  }

  // Verifica si el usuario ha iniciado sesión
  isLogged(): boolean {
    return !!this.getToken();
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  logout(): void {
    this.toastrService.info('Cierre de sesión, hasta la próxima');
    localStorage.removeItem('authToken');
    this.router.navigate(['/inicio']);
  }
}
