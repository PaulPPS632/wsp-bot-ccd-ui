import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignacionesService {
  http = inject(HttpClient);
  apiUrl: string = environment.API_URL + '/asignaciones';
  constructor() { }
  create(asignaciones: Asignaciones): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}`, { asignaciones });
      }
}
