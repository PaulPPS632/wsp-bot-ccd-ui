import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  http = inject(HttpClient);
  apiUrl: string = `http://${window.location.hostname}:8000/api/reports`;
  constructor() {}
  headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  })
  masivos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/masivos`,{headers: this.headers});
  }
  asignaciones(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/asignaciones`,{headers: this.headers});
  }
  leadsinteresados(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/leadsinteresados/${id}`,{headers: this.headers});
  }
  leadsAsignaciones(id: string){
    return this.http.get<any>(`${this.apiUrl}/leadsasignaciones/${id}`,{headers: this.headers});
  }
}
