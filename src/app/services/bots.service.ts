import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Bot } from '../interfaces/Bot';

@Injectable({
  providedIn: 'root',
})
export class BotsService {
  http = inject(HttpClient);
  apiUrl: string = `http://${window.location.hostname}:8000/api/bots`;
  constructor() {}
  headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  })
  getBots(): Observable<Bot[]> {
    return this.http.get<Bot[]>(this.apiUrl,{headers: this.headers});
  }
  offBot(containerId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/stop`, {
      containerId,
    },{headers: this.headers});
  }
  onBot(containerId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/start`, {
      containerId,
    },{headers: this.headers});
  }
  startBots(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/startAll`,{headers: this.headers});
  }
  stopBots(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stopAll`,{headers: this.headers});
  }
  createBot(phone: string, imagebot: string,namebot: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      phone,
      imagebot,
      namebot
    },{headers: this.headers});
  }
  codigo(bot:Bot):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/codigo`,{
      port:bot.port
    },{headers: this.headers})
  }
  search(search: string, imagebot: string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/search?imagebot=${imagebot}`, {
      search
    },{headers: this.headers})
  }
  deletecache(id: number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/deletecache/${id}`,{headers: this.headers});
  }
}
