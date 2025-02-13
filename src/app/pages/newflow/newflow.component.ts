import { Component, inject, Input, OnInit } from '@angular/core';
import { ModalComponent } from '../../component/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { Mensaje } from '../../interfaces/Mensaje';
import { Flows } from '../../interfaces/Flows';
import { CardmensajesComponent } from '../../component/cardmensajes/cardmensajes.component';
import { FlowsService } from '../../services/flows.service';
import Swal from 'sweetalert2';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-newflow',
  imports: [ModalComponent, FormsModule, CardmensajesComponent,CdkDropList, CdkDrag],
  templateUrl: './newflow.component.html',
  styleUrl: './newflow.component.css'
})
export class NewflowComponent implements OnInit {
  @Input('id')id:string = '';
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
    if(this.id !== undefined){
      //this.cargarFlows();
      this.flowLoad();
    }
  }
  flowLoad() {
    this.flowsServices.getById(this.id).subscribe((res) => {
      this.NewFlow = res.flow;
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
      this.NewFlow ={
        id:0,
        name:'',
        mensajes:[]
      }
    });

  }
  EditarFlow(){
    this.flowsServices.updateById(this.id,this.NewFlow).subscribe((res) => {
      Swal.fire({
        title: 'ESTADO',
        text: res.message,
        icon: 'success',
        timer: 1500,
      });
    });
  }
  toggleflagModalNewMensaje() {
    this.flagModalNewMensaje = !this.flagModalNewMensaje;
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
}
