import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Flows } from '../interfaces/Flows';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlowsService {
  http = inject(HttpClient);
  apiUrl: string = environment.API_URL + `/flows`;
  constructor() {}
  headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  })
    create(flow: Flows): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}`, { flow },{headers: this.headers});
    }
    delete(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${id}`,{headers: this.headers});
    }
    
    listar():Observable<any>{
      console.log(this.apiUrl)
      return this.http.get<any>(this.apiUrl,{headers: this.headers});
    }
    getById(id: string):Observable<any>{
      return this.http.get<any>(`${this.apiUrl}/${id}`,{headers: this.headers});
    }
    search(search: string): Observable<any>{
      return this.http.post<any>(`${this.apiUrl}/search`, {
        search
      },{headers: this.headers})
    }
    updateById(id: string, flow: Flows):Observable<any>{
      return this.http.put<any>(`${this.apiUrl}/${id}`,{
        flow
      },{headers: this.headers});
    }
}
