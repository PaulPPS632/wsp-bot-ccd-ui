import { Component, inject, OnInit } from '@angular/core';
import { Mensaje } from '../../interfaces/Mensaje';
import { CardmensajesComponent } from '../../component/cardmensajes/cardmensajes.component';
import { Masivo } from '../../interfaces/Masivo';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MensajesService } from '../../services/mensajes.service';
import { MasivosService } from '../../services/masivos.service';
@Component({
  selector: 'app-masivos',
  imports: [FormsModule, CardmensajesComponent, CdkDropList, CdkDrag, CommonModule],
  templateUrl: './masivos.component.html',
  styleUrl: './masivos.component.css',
})
export class MasivosComponent implements OnInit {

  masivosService = inject(MasivosService);
  mensajesService = inject(MensajesService);
  listaMensajes: Mensaje[] = [];
  selectedMensajes: Mensaje[]=[];
  masivo: Masivo = {
    cant: 0,
    delaymin: 0,
    delaymax: 30,
    mensajes: [],
  };
  NewMensaje: Mensaje = {
    id:'',
    tipo: 'texto',
    content: {
      body: '',
      footer: '',
    },
  };
  toogleNewMensaje:boolean = false;
  ngOnInit(): void {
this.cargarMensajes();
  }
  drop(event: CdkDragDrop<Mensaje[]>){
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  newMensaje() {
    this.NewMensaje.id = uuidv4();
    this.masivo.mensajes.push(this.NewMensaje);
    this.togglemensaje();
  }
  cargarMensajes(){
    this.mensajesService.listar().subscribe((res) => {
      this.listaMensajes = res.mensajes;
    })
  }
  SendMasivos() {
    this.masivo.mensajes = this.selectedMensajes;
    this.masivosService.sendmasivos(this.masivo).subscribe((res) => {
      Swal.fire({
        title: 'ESTADO',
        text: res.message,
        icon: 'success',
        timer: 1500,
      });
      this.selectedMensajes = [];
      this.cargarMensajes();
    });
  }
  deleteMasivo(currentmensaje: Mensaje){
    this.listaMensajes = this.listaMensajes.filter((mensaje) => mensaje.id != currentmensaje.id)
  }
  deleteMasivoSelected(currentmensaje: Mensaje){
    this.selectedMensajes = this.selectedMensajes.filter((mensaje) => mensaje.id != currentmensaje.id)
  }
  guardarNewMensaje(){
    this.listaMensajes.push(this.NewMensaje);
    this.togglemensaje();
    this.mensajesService.create(this.NewMensaje).subscribe((res) => {
      Swal.fire({
        title: 'ESTADO',
        text: res.message,
        icon: 'success',
        timer: 1500,
      });
    })
  }
  togglemensaje(){
    this.toogleNewMensaje = !this.toogleNewMensaje;
  }
}
