import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CardBotComponent } from "../../component/card-bot/card-bot.component";
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Bot } from '../../interfaces/Bot';

@Component({
  selector: 'app-bots',
  imports: [CardBotComponent, FormsModule],
  templateUrl: './bots.component.html',
  styleUrl: './bots.component.css'
})
export class BotsComponent implements OnInit {
  apiService = inject(ApiService);
  bots: Bot[] = [];
  newBot ={
    phone:'',
    imagebot:'bot'
  }
  ngOnInit(): void {
    this.apiService.getBots().subscribe((res) =>  {
      this.bots = res;
    })
  }

  CreateBot(){
    this.apiService.createBot(this.newBot.phone, this.newBot.imagebot).subscribe((res) =>{
      Swal.fire({
        title: "Tu coneccion",
        text: `Contectate con este codigo: ${res.pairingCode}`,
        icon: "success"
      });
    })
  }
  StopBots(){
    this.apiService.stopBots().subscribe((res)=>{
      if(!res.status){
        this.bots.forEach(bot => bot.status = false);
        Swal.fire({
          title: "ESTADO",
          text: `se detuvieron correctamente`,
          icon: "success",
          timer: 1500
        });
        
      }
    })
  }
  StartBots(){
    this.apiService.startBots().subscribe((res)=>{
      if(res.status){
        this.bots.forEach(bot => bot.status = true);
        Swal.fire({
          title: "ESTADO",
          text: `se activaron correctamente`,
          icon: "success",
          timer: 1500
        });
      }
    })
  }
  handleStatusChanged(updatedBot: Bot) {
    const botIndex = this.bots.findIndex((bot) => bot.containerId === updatedBot.containerId);
    if (botIndex !== -1) {
      this.bots[botIndex] = updatedBot; 
    }

  }
}
