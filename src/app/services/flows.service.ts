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
  apiUrl: string = `http://${window.location.hostname}:8000/api/flows`;
  constructor() {}
    create(flow: Flows): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}`, { flow });
    }
    delete(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
    
    listar():Observable<any>{
      console.log(this.apiUrl)
      return this.http.get<any>(this.apiUrl);
    }
    getById(id: string):Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/${id}`);
    }
    search(search: string): Observable<any>{
      return this.http.post<any>(`${this.apiUrl}/search`, {
        search
      })
    }
    updateById(id: string, flow: Flows):Observable<any>{
      return this.http.put<any>(`${this.apiUrl}/${id}`,{
        flow
      });
    }
}
