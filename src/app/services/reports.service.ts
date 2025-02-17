import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  http = inject(HttpClient);
  apiUrl: string = environment.API_URL + '/reports';
  constructor() {}

  masivos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/masivos`);
  }
  asignaciones(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/asignaciones`);
  }
  leadsinteresados(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/leadsinteresados/${id}`);
  }
  leadsAsignaciones(id: string){
    return this.http.get<any>(`${this.apiUrl}/leadsasignaciones/${id}`);
  }
}
