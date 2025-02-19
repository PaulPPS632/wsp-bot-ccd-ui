import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mensaje } from '../interfaces/Mensaje';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MensajesService {
  http = inject(HttpClient);
  apiUrl: string = `http://${window.location.hostname}:8000/api/mensajes`;
  constructor() {}
  headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  })
  create(mensaje: Mensaje): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { mensaje },{headers: this.headers});
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`,{headers: this.headers});
  }
  listar():Observable<any>{
    return this.http.get<any>(this.apiUrl,{headers: this.headers});
  }
}
