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
import { Flows } from '../../interfaces/Flows';
import { CardFlowsComponent } from "../../component/card-flows/card-flows.component";
import { FlowsService } from '../../services/flows.service';
import { LeadsService } from '../../services/leads.service';
@Component({
  selector: 'app-masivos',
  imports: [FormsModule, CdkDropList, CdkDrag, CommonModule, CardFlowsComponent],
  templateUrl: './masivos.component.html',
  styleUrl: './masivos.component.css',
})
export class MasivosComponent implements OnInit {

  masivosService = inject(MasivosService);
  flowsService = inject(FlowsService);
  leadsService = inject(LeadsService);

  listaFlows: Flows[] = [];
  selectedFlows: Flows[]=[];
  masivo: Masivo = {
    cant: 0,
    delaymin: 0,
    delaymax: 30,
    flows: [],
  };
  ngOnInit(): void {
    this.cargarFlows();
  }
  drop(event: CdkDragDrop<Flows[]>){
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
  cargarFlows(){
    this.flowsService.listar().subscribe((res) => {
      this.listaFlows = res.flows;
    })
  }
  SendMasivos() {
    this.masivo.flows = this.selectedFlows;
    this.masivosService.sendmasivos(this.masivo).subscribe((res) => {
      Swal.fire({
        title: 'ESTADO',
        text: res.message,
        icon: 'success',
        timer: 1500,
      });
      this.selectedFlows = [];
      this.cargarFlows();
    });
  }

downloadExcel() {
  this.leadsService.excel().subscribe(blob => {
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    
    a.href = url;
    a.download = `leads_${new Date().toISOString()}.xlsx`;
    document.body.appendChild(a);
    a.click();
    
    // Liberar recursos
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  });
}
}
