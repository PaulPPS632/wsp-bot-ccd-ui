import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Flows } from '../interfaces/Flows';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlowsService {
  http = inject(HttpClient);
  apiUrl: string = environment.API_URL + '/flows';
  constructor() {}
    create(flow: Flows): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}`, { flow });
    }
    delete(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
    
    listar():Observable<any>{
      return this.http.get<any>(this.apiUrl);
    }

    search(search: string): Observable<any>{
      return this.http.post<any>(`${this.apiUrl}/search`, {
        search
      })
    }
}
