import { Component, inject, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-bases',
  imports: [],
  templateUrl: './bases.component.html',
  styleUrl: './bases.component.css'
})
export class BasesComponent implements OnInit {

  masivos: any[] =[];
  asignaciones: any[] = [];
  
  reportesService = inject(ReportsService);
  ngOnInit(): void {
    this.reportesService.masivos().subscribe((res) => {
      this.masivos = res.masivos;
    })
  }
}
