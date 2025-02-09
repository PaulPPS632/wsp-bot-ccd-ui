import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CardBotComponent } from "../../component/card-bot/card-bot.component";
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Bot } from '../../interfaces/Bot';
import { BotsService } from '../../services/bots.service';
import { MasivosService } from '../../services/masivos.service';
import { WebsocketService } from '../../services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bots',
  imports: [CardBotComponent, FormsModule],
  templateUrl: './bots.component.html',
  styleUrl: './bots.component.css'
})
export class BotsComponent implements OnInit, OnDestroy {
  botsService = inject(BotsService);
  masivosServices = inject(MasivosService);
  websocketService = inject(WebsocketService);

  bots: Bot[] = [];
  newBot = {
    phone: '',
    imagebot: 'bot'
  };
  masivo: number = 0;
  private subscription!: Subscription;

  ngOnInit(): void {
    // 🔹 Cargar bots iniciales desde la API
    this.botsService.getBots().subscribe((res) => {
      this.bots = res;
    });

    // 🔹 Escuchar actualizaciones de estado en tiempo real desde WebSocket
    this.subscription = this.websocketService.listenBotsStatus().subscribe((data) => {
      console.log('🔔 Estado de bots recibido:', data);
    
      if (Array.isArray(data)) {
        this.bots.forEach(bot => {
          const updatedBot = data.find((b: Bot) => b.containerId === bot.containerId);
          if (updatedBot) {
            bot.status = updatedBot.status;
            if(updatedBot.status == "desvinculado"){
              Swal.fire({
                title:"Desvinculado",
                text: `vincula nuevamente tu bot`,
                icon: "warning"
              })
            }else if (updatedBot.status == "inactivo"){
              Swal.fire({
                title:"Inactivo",
                text: `Verifica si se a bloqueado o reinicia el bot`,
                icon: "warning"
              })
            }
          }
        });
      } else {
        console.warn("⚠️ La respuesta no es un array de bots:", data);
      }
    });
    
  }

  ngOnDestroy(): void {
    // 🔹 Evitar fugas de memoria
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  CreateBot() {
    this.botsService.createBot(this.newBot.phone, this.newBot.imagebot).subscribe((res) => {
      Swal.fire({
        title: "Tu conexión",
        text: `Conéctate con este código: ${res.pairingCode}`,
        icon: "success"
      });
    });
  }

  StopBots() {
    this.botsService.stopBots().subscribe((res) => {
      if (!res.status) {
        this.bots.forEach(bot => bot.status = false);
        Swal.fire({
          title: "ESTADO",
          text: `Se detuvieron correctamente`,
          icon: "success",
          timer: 1500
        });
      }
    });
  }

  StartBots() {
    this.botsService.startBots().subscribe((res) => {
      if (res.status) {
        this.bots.forEach(bot => bot.status = true);
        Swal.fire({
          title: "ESTADO",
          text: `Se activaron correctamente`,
          icon: "success",
          timer: 1500
        });
      }
    });
  }

  handleStatusChanged(updatedBot: Bot) {
    const botIndex = this.bots.findIndex((bot) => bot.containerId === updatedBot.containerId);
    if (botIndex !== -1) {
      this.bots[botIndex] = updatedBot;
    }
  }
}
