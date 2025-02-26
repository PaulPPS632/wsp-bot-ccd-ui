import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReportsService } from '../../services/reports.service';
import { Mensaje } from '../../interfaces/Mensaje';
import { ModalComponent } from "../../component/modal/modal.component";
import { Flows } from '../../interfaces/Flows';
import { CardmensajesComponent } from "../../component/cardmensajes/cardmensajes.component";

@Component({
  selector: 'app-asignacion',
  imports: [FormsModule, RouterLink, ModalComponent, CardmensajesComponent],
  templateUrl: './asignacion.component.html',
  styleUrl: './asignacion.component.css',
})
export class AsignacionComponent implements OnInit {

  asignaciones: any[]=[];
  reportsServices = inject(ReportsService);
  modalFlow: boolean = false;
  currentflow: Flows| undefined;
  ngOnInit(): void {
    this.cargar();
  }
  cargar(){
    this.reportsServices.asignaciones().subscribe((res) => {
      this.asignaciones = res.asignaciones;
    })
  }
  toggleModalFlow(flow: Flows){
    this.modalFlow = !this.modalFlow;
    this.currentflow = flow;
    console.log(flow);
  }
}
