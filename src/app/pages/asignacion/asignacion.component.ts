import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-asignacion',
  imports: [FormsModule, RouterLink],
  templateUrl: './asignacion.component.html',
  styleUrl: './asignacion.component.css',
})
export class AsignacionComponent implements OnInit {

  asignaciones: any[]=[];
  reportsServices = inject(ReportsService);
  modalFlow: boolean = false;
  ngOnInit(): void {
    this.cargar();
  }
  cargar(){
    this.reportsServices.asignaciones().subscribe((res) => {
      this.asignaciones = res.asignaciones;
    })
  }
  toggleModalFlow(){
    this.modalFlow
  }
}
