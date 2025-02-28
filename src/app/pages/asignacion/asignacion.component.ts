import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReportsService } from '../../services/reports.service';
import { Mensaje } from '../../interfaces/Mensaje';
import { ModalComponent } from "../../component/modal/modal.component";
import { Flows } from '../../interfaces/Flows';
import { CardmensajesComponent } from "../../component/cardmensajes/cardmensajes.component";
import { AsignacionesService } from '../../services/asignaciones.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asignacion',
  imports: [FormsModule, RouterLink, ModalComponent, CardmensajesComponent, CommonModule],
  templateUrl: './asignacion.component.html',
  styleUrl: './asignacion.component.css',
})
export class AsignacionComponent implements OnInit {

  asignaciones: any[]=[];
  reportsServices = inject(ReportsService);
  asignacionesService = inject(AsignacionesService);
  modalFlow: boolean = false;
  currentflow: Flows| undefined;
  searchcurrent: string = '';
  page: number = 1;
  limit: number = 10;
  totalPages: number[] = [1];
  currentPage: number = 1;
  ngOnInit(): void {
    this.cargar();
  }
  cargar(){
    this.asignacionesService.searchAsignacion(this.searchcurrent, 1, 20).subscribe({
      next: (res) =>{
        this.asignaciones = res.asignaciones;
        this.totalPages = Array.from({ length: res.pages }, (_, i) => i + 1);
         this.currentPage = 1;
      },
      error: (err) => {
        Swal.fire({
          title: 'ERROR',
          icon: 'error',
          text: `error al buscar: ${this.searchcurrent}`
        })
      }
    })
  }
  toggleModalFlow(flow: Flows){
    this.modalFlow = !this.modalFlow;
    this.currentflow = flow;
    console.log(flow);
  }
  search(page: number = 1, limit: number = 20){
    this.asignacionesService.searchAsignacion(this.searchcurrent, page, limit).subscribe({
      next: (res) =>{
        this.asignaciones = res.asignaciones;
        this.totalPages = Array.from({ length: res.pages }, (_, i) => i + 1);
         this.currentPage = page;
      },
      error: (err) => {
        Swal.fire({
          title: 'ERROR',
          icon: 'error',
          text: `error al buscar: ${this.searchcurrent}`
        })
      }
    })
  }
  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDIENTE':
        return 'bg-yellow-200 text-yellow-800'; // Fondo amarillo con texto oscuro
      case 'ENVIADO':
        return 'bg-green-200 text-green-800'; // Verde claro
      default:
        return 'bg-gray-200 text-gray-800'; // Gris por defecto
    }
  }
  
}

