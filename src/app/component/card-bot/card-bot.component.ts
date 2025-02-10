import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Bot } from '../../interfaces/Bot';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { BotsService } from '../../services/bots.service';
import { BenderIconComponent } from "../../icons/bender-icon/bender-icon.component";
import { CommonModule } from '@angular/common';
import { LeelaIconComponent } from "../../icons/leela-icon/leela-icon.component";

@Component({
  selector: 'app-card-bot',
  imports: [FormsModule, BenderIconComponent, CommonModule, LeelaIconComponent],
  templateUrl: './card-bot.component.html',
  styleUrl: './card-bot.component.css'
})
export class CardBotComponent {

  @Input() bot!: Bot;
  @Output() statusChanged = new EventEmitter<Bot>();
  botsService = inject(BotsService);
  ToggleStatus(){
    if(this.bot.status){
      this.botsService.offBot(this.bot.containerId).subscribe((res)=>{
        if(res.status){
          this.bot.status = false; 
          this.statusChanged.emit(this.bot);
          Swal.fire({
            title: "ESTADO",
            text: `se detuvo correctamente`,
            icon: "success",
            timer: 1500
          });
        }else{
          Swal.fire({
            title: "ESTADO",
            text: `ocurrio un error`,
            icon: "error",
            timer: 1500
          });
        }
      })
    }else{
      this.botsService.onBot(this.bot.containerId).subscribe((res)=>{
        if(res.status){
          this.bot.status = true; 
          this.statusChanged.emit(this.bot);
          Swal.fire({
            title: "ESTADO",
            text: `se activo correctamente`,
            icon: "success",
            timer: 1500
          });
        }else{
          Swal.fire({
            title: "ESTADO",
            text: `ocurrio un error`,
            icon: "error",
            timer: 1500
          });
        }
      })
    }
  }
  ResetPairingCode(){
    this.botsService.codigo(this.bot).subscribe((res)=>{
      this.bot.pairingCode = res.pairingCode;
      this.statusChanged.emit(this.bot);
    })
  }
}
