import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: Socket;
  private readonly SERVER_URL = `http://${window.location.hostname}:8000`; // URL del WebSocket

  constructor() {
    this.connect();
  }

  // 🔹 Conectar al WebSocket
  private connect() {
    this.socket = io(this.SERVER_URL, {
      transports: ['websocket'], // Usar WebSocket puro
    });

    this.socket.on('connect', () => {
      console.log('🟢 Conectado al WebSocket en', this.SERVER_URL);
    });

    this.socket.on('disconnect', () => {
      console.log('🔴 Desconectado del WebSocket');
    });
  }

  // 🔹 Escuchar evento "bots-status" con un tipo definido
  listenBotsStatus(): Observable<{ status: string; timestamp: string }> {
    return new Observable((subscriber) => {
      this.socket.on('bots-status', (data: any) => {
        subscriber.next(data);
      });

      return () => {
        this.socket.off('bots-status');
      };
    });
  }

  // 🔹 Enviar datos al servidor con tipo `unknown` para más flexibilidad
  sendMessage(event: string, data: unknown) {
    this.socket.emit(event, data);
  }
}
