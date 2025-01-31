import { inject, Injectable } from '@angular/core';
import { Masivo } from '../interfaces/Masivo';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MasivosService {
  http = inject(HttpClient);
  apiUrl: string = environment.API_URL + '/masivos';
  constructor() {}
  sendmasivos(masivos: Masivo) {
    return this.http.post<any>(`${this.apiUrl}`, {
      masivos,
    });
  }
}
