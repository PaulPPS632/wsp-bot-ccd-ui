import { Component, inject, OnInit } from '@angular/core';
import { Masivo } from '../../interfaces/Masivo';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MasivosService } from '../../services/masivos.service';
import { Flows } from '../../interfaces/Flows';
import { CardFlowsComponent } from "../../component/card-flows/card-flows.component";
import { FlowsService } from '../../services/flows.service';
import { LeadsService } from '../../services/leads.service';
import { LoaderComponent } from "../../component/loader/loader.component";
@Component({
  selector: 'app-newmasivos',
  imports: [FormsModule, CdkDropList, CdkDrag, CommonModule, CardFlowsComponent, LoaderComponent],
  templateUrl: './newmasivos.component.html',
  styleUrl: './newmasivos.component.css'
})
export class NewmasivosComponent implements OnInit {

  masivosService = inject(MasivosService);
  flowsService = inject(FlowsService);
  leadsService = inject(LeadsService);
  cantLeasRestantes: number = 0;
  listaFlows: Flows[] = [];
  selectedFlows: Flows[]=[];
  masivo: Masivo = {
    name: "",
    cant: 0,
    delaymin: 0,
    delaymax: 30,
    flows: [],
  };
  flagLoader: boolean = false;
  ngOnInit(): void {
    this.cargarcantRespantes()
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
    this.flowsService.listar(true).subscribe((res) => {
      this.listaFlows = res.flows;
    })
  }
  SendMasivos() {
    this.masivo.flows = this.selectedFlows;
    this.toogleLoader();
    this.masivosService.sendmasivos(this.masivo).subscribe((res) => {
      Swal.fire({
        title: 'ESTADO',
        text: res.message,
        icon: 'success',
        timer: 1500,
      });
      
      this.selectedFlows = [];
      this.masivo = {
        name: "",
        cant: 0,
        delaymin: 0,
        delaymax: 30,
        flows: [],
      };
      this.toogleLoader();
      this.cargarcantRespantes();
      this.cargarFlows();
    });
  }
  toogleLoader(){
    this.flagLoader = !this.flagLoader
  }
  cargarcantRespantes(){
    this.leadsService.cantRestantes().subscribe((res) => {
      this.cantLeasRestantes = res.cant;
    })
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
