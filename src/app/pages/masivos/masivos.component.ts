import { Component, inject, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-masivos',
  imports: [RouterLink, CommonModule],
  templateUrl: './masivos.component.html',
  styleUrl: './masivos.component.css',
})
export class MasivosComponent implements OnInit {
  
  masivos: any[] =[];
  asignaciones: any[] = [];
  
  reportesService = inject(ReportsService);
  ngOnInit(): void {
    this.reportesService.masivos().subscribe((res) => {
      this.masivos = res.masivos;
    })
  }
}
