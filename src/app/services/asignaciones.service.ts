import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Asignaciones } from '../interfaces/Asignaciones';

@Injectable({
  providedIn: 'root',
})
export class AsignacionesService {
  http = inject(HttpClient);
  apiUrl: string = `http://${window.location.hostname}:8000/api/asignaciones`;
  constructor() {}
    headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    })
  SendAsignaciones(asignaciones: Asignaciones): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { asignaciones },{headers: this.headers});
  }

  ProgramacionAsignacion (asignaciones: Asignaciones, programacion: string):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/programacion`, { asignaciones, programacion },{headers: this.headers});
  }
}
