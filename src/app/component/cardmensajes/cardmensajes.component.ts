import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Mensaje } from '../../interfaces/Mensaje';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cardmensajes',
  imports: [FormsModule],
  templateUrl: './cardmensajes.component.html',
  styleUrl: './cardmensajes.component.css'
})
export class CardmensajesComponent {

  @Input() mensaje!: Mensaje;
  @Output() MensajeChange = new EventEmitter<Mensaje>();
  Eliminar(){
    this.MensajeChange.emit(this.mensaje);
  }
}
