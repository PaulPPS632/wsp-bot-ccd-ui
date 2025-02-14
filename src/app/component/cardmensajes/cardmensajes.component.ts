import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Mensaje } from '../../interfaces/Mensaje';
import { FormsModule } from '@angular/forms';
import { CdkDragHandle } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-cardmensajes',
  imports: [FormsModule, CdkDragHandle],
  templateUrl: './cardmensajes.component.html',
  styleUrl: './cardmensajes.component.css'
})
export class CardmensajesComponent {
  @Input() posicion: number = 1;
  @Input() mensaje!: Mensaje;
  @Output() MensajeChange = new EventEmitter<Mensaje>();
  Eliminar(){
    this.MensajeChange.emit(this.mensaje);
  }
}
