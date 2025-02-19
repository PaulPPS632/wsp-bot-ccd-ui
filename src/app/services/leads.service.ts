import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {
  http = inject(HttpClient);
  apiUrl: string = `http://${window.location.hostname}:8000/api/leads`;
  constructor() { }
  headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  })
  excel():Observable<Blob>{
    return this.http.get(`${this.apiUrl}/excel`, {
      responseType: 'blob', // Importante para recibir archivos binarios
      headers: this.headers
    });
  }
  cantRestantes():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/leadsrestantes`,{headers: this.headers});
  }
}
