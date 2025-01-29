import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Bot } from '../../interfaces/Bot';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-bot',
  imports: [FormsModule],
  templateUrl: './card-bot.component.html',
  styleUrl: './card-bot.component.css'
})
export class CardBotComponent {

  @Input() bot!: Bot;
  @Output() statusChanged = new EventEmitter<Bot>();
  apiService = inject(ApiService);
  ToggleStatus(){
    if(this.bot.status){
      this.apiService.offBot(this.bot.containerId).subscribe((res)=>{
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
      this.apiService.onBot(this.bot.containerId).subscribe((res)=>{
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
    this.apiService.codigo(this.bot).subscribe((res)=>{
      this.bot.pairingCode = res.pairingCode;
      this.statusChanged.emit(this.bot);
    })
  }
}
