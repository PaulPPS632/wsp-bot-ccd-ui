import { Component, inject, OnInit } from '@angular/core';
import { ModalComponent } from '../../component/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { Mensaje } from '../../interfaces/Mensaje';
import { Flows } from '../../interfaces/Flows';
import { CardmensajesComponent } from '../../component/cardmensajes/cardmensajes.component';
import { FlowsService } from '../../services/flows.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flows',
  imports: [ModalComponent, FormsModule, CardmensajesComponent],
  templateUrl: './flows.component.html',
  styleUrl: './flows.component.css',
})
export class FlowsComponent implements OnInit {
  flowsServices = inject(FlowsService);
  flagModalNewMensaje: boolean = false;
  CurrentFlows: Flows[] = [];
  NewFlow: Flows = {
    id: 0,
    name: '',
    mensajes: [],
  };
  NewMensaje: Mensaje = {
    id: '',
    tipo: 'texto',
    content: {
      body: '',
      footer: '',
    },
  };
  ngOnInit(): void {
    this.cargarFlows();
  }
  cargarFlows() {
    this.flowsServices.listar().subscribe((res) => {
      this.CurrentFlows = res.flows;
    });
  }
  addNewMensaje() {
    this.NewFlow.mensajes.push(this.NewMensaje);
    this.NewMensaje = {
      id: '',
      tipo: 'texto',
      content: {
        body: '',
        footer: '',
      },
    };
    this.toggleflagModalNewMensaje();
  }
  CrearFlow() {
    this.flowsServices.create(this.NewFlow).subscribe((res) => {
      Swal.fire({
        title: 'ESTADO',
        text: res.message,
        icon: 'success',
        timer: 1500,
      });
      this.cargarFlows();
      this.NewFlow ={
        id:0,
        name:'',
        mensajes:[]
      }
    });

  }
  toggleflagModalNewMensaje() {
    this.flagModalNewMensaje = !this.flagModalNewMensaje;
  }
}
