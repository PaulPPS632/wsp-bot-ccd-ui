import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Bot } from '../interfaces/Bot';

@Injectable({
  providedIn: 'root',
})
export class BotsService {
  http = inject(HttpClient);
  apiUrl: string = environment.API_URL + "/bots";
  constructor() {}

  getBots(): Observable<Bot[]> {
    return this.http.get<Bot[]>(this.apiUrl);
  }
  offBot(containerId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/stop`, {
      containerId,
    });
  }
  onBot(containerId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/start`, {
      containerId,
    });
  }
  startBots(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/startAll`);
  }
  stopBots(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stopAll`);
  }
  createBot(phone: string, imagebot: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      phone,
      imagebot,
    });
  }
  codigo(bot:Bot):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/codigo`,{
      port:bot.port
    })
  }
}
