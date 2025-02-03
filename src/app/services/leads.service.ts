import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {
  http = inject(HttpClient);
  apiUrl: string = environment.API_URL + '/leads';
  constructor() { }
  excel():Observable<Blob>{
    return this.http.get(`${this.apiUrl}/excel`, {
      responseType: 'blob' // Importante para recibir archivos binarios
    });
  }
}
