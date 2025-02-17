import { Component, inject, Input, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-leads-asignacion',
  imports: [],
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
}
