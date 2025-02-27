import { inject, Injectable } from '@angular/core';
import { Masivo } from '../interfaces/Masivo';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasivosService {
  http = inject(HttpClient);
  apiUrl: string = `http://${window.location.hostname}:8000/api/masivos`;
  constructor() {}
  headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  })
  sendmasivos(masivos: Masivo): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, {
      masivos,
    },{headers: this.headers});
  }

  sendMasivosExcel(masivos: Masivo, numeros: number[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/excel`, {masivos, numeros},{headers: this.headers});
  }

  search(search: string): Observable<any>{
        return this.http.post<any>(`${this.apiUrl}/search`, {
          search
        },{headers: this.headers})
  }
}
