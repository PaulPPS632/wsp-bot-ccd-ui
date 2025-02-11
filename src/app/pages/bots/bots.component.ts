import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CardBotComponent } from "../../component/card-bot/card-bot.component";
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Bot } from '../../interfaces/Bot';
import { BotsService } from '../../services/bots.service';
import { MasivosService } from '../../services/masivos.service';
import { WebsocketService } from '../../services/websocket.service';
import { Subscription } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bots',
  imports: [CardBotComponent, FormsModule, FontAwesomeModule],
  templateUrl: './bots.component.html',
  styleUrl: './bots.component.css'
})
export class BotsComponent implements OnInit, OnDestroy {
  faPlusSquare = faPlusSquare;
  botsService = inject(BotsService);
  masivosServices = inject(MasivosService);
  websocketService = inject(WebsocketService);
  cdRef = inject(ChangeDetectorRef);
  bots: Bot[] = [];
  newBot = {
    phone: '',
    imagebot: 'bot',
    name: '',
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
            
            
            if(updatedBot.status == "desvinculado"){
              bot.status = false;
              this.playAlertSound("desvinculado.mp3");
              Swal.fire({
                title:`Bot ${updatedBot.phone} Desvinculado`,
                text: `vincula nuevamente tu bot tu code: ${updatedBot.newPairingCode} `,
                icon: "error",
                position: "top-end", // 📌 Esquina superior derecha,
                timer: 30000,
                toast: true, // 📌 Hace que sea más parecido a una notificación
                showConfirmButton: false, // 📌 Oculta el botón de "OK"

              })
            }else if (updatedBot.status == "inactivo"){
              bot.status = false;
              this.playAlertSound("alert.mp3");
              Swal.fire({
                title:`Bot ${updatedBot.phone} Inactivo`,
                text: `Verifica si se a bloqueado o reinicia el bot`,
                icon: "error",
                position: "top-end", // 📌 Esquina superior derecha
                timer: 30000,
                toast: true, // 📌 Hace que sea más parecido a una notificación
                showConfirmButton: false, // 📌 Oculta el botón de "OK"
                background:"#f00"
              })
            }else if(updatedBot.status == "activo"){
              bot.status = true;
            }
          }

        });
      } else {
        console.warn("⚠️ La respuesta no es un array de bots:", data);
      }
      
    });
    
  }
  playAlertSound(tipoaudio: string){
    const audio = new Audio(tipoaudio);
    audio.play();
  }
  ngOnDestroy(): void {
    // 🔹 Evitar fugas de memoria
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  CreateBot() {
    this.botsService.createBot(this.newBot.phone, this.newBot.imagebot,this.newBot.name).subscribe((res) => {
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
