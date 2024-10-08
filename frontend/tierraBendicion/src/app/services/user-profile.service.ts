import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private baseUrl = 'http://localhost:3000/users';
  private http = inject(HttpClient);

  getUserProfile(): Observable<Users> {
    return this.http.get<Users>(`${this.baseUrl}/profile/get`);
  }

  // Actualizar información del usuario
  updateUserProfile(data: Partial<Users>): Observable<Users> {
    return this.http.put<Users>(`${this.baseUrl}/profile/update`, data);
  }

  // Cambiar la contraseña del usuario
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/profile/change-password`, {
      oldPassword,
      newPassword,
    });
  }
}
