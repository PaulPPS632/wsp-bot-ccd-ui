import { Component, inject, Input, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leads-asignacion',
  imports: [CommonModule],
  templateUrl: './leads-asignacion.component.html',
  styleUrl: './leads-asignacion.component.css'
})
export class LeadsAsignacionComponent implements OnInit {
  @Input('id')id: string = '';
  leadsAsignacion: any[]=[];
  reportsService = inject(ReportsService);
  ngOnInit(): void {
    this.reportsService.leadsAsignaciones(this.id).subscribe((res) => {
      this.leadsAsignacion = res.leadsasignacion;
    })
  }
  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDIENTE':
        return 'bg-yellow-200 text-yellow-800'; // Fondo amarillo con texto oscuro
      case 'ENVIADO':
        return 'bg-green-200 text-green-800'; // Verde claro
      case 'ERROR':
        return 'bg-red-200 text-red-800'; // Rojo claro
      default:
        return 'bg-gray-200 text-gray-800'; // Gris por defecto
    }
  }
}
