import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bot } from '../interfaces/Bot';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient);
  apiUrl: string = 'http://localhost:8000';

  getBots(): Observable<Bot[]>{
    return this.http.get<Bot[]>(`${this.apiUrl}/bots`);
  }
  offBot(containerId: string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/stop-bot`,{
      containerId
    })
  }
  onBot(containerId: string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/start-bot`,{
      containerId
    })
  }
  startBots(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/start-bots`);
  }
  stopBots(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/stop-bots`);
  }
  createBot(phone: string, imagebot: string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/create-bot`,{
      phone,
      imagebot
    })
  }
  masivos(cant: number):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/bot/masivos`,{
      cant
    })
  }
  codigo(bot:Bot):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/bot/codigo`,{
      port:bot.port
    })
  }
}
