import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Mensaje } from '../interfaces/Mensaje';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MensajesService {
  http = inject(HttpClient);
  apiUrl: string = `http://${window.location.hostname}:8000/api/mensajes`;
  constructor() {}

  create(mensaje: Mensaje): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { mensaje });
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  listar():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
}
