import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://tierrabendicion.azurewebsites.net';
  private http = inject(HttpClient);

  //metodos de las peticiones de los servicios
  // Obtener todos los elementos de un recurso
  getAll<T>(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${endpoint}`);
  }

  getByRol<T>(endpoint: string, rol: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${endpoint}/role/${rol}`);
  }

  // Obtener un elemento por ID
  getById<T>(endpoint: string, id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id}`);
  }

  // Crear un nuevo elemento
  create<T>(endpoint: string, data: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data);
  }

  // Actualizar un elemento por ID
  update<T>(endpoint: string, id: string, data: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}/${id}`, data);
  }

  // Eliminar un elemento por ID
  delete(endpoint: string, id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${endpoint}/${id}`);
  }
}
