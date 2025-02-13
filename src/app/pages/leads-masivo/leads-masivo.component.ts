import { Component, inject, Input, OnInit } from '@angular/core';
import { ReportsService } from '../../services/reports.service';

@Component({
  selector: 'app-leads-masivo',
  imports: [],
  templateUrl: './leads-masivo.component.html',
  styleUrl: './leads-masivo.component.css'
})
export class LeadsMasivoComponent implements OnInit {
  @Input('id')id: string = '';
  reportesService = inject(ReportsService);

  leadsInteresados: any[]=[];

  ngOnInit(): void {
    this.reportesService.leadsinteresados(this.id).subscribe((res) => {
      this.leadsInteresados = res.leadsinteresados;
    })
  }
}
