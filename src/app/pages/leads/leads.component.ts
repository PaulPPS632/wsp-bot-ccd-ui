import { Component, inject, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-leads',
  imports: [],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.css'
})
export class LeadsComponent implements OnInit {

  reportesService = inject(ReportsService);

  leadsInteresados: any[]=[];

  ngOnInit(): void {
    this.reportesService.leadsinteresados().subscribe((res) => {
      this.leadsInteresados = res.leadsinteresados;
    })
  }
}
