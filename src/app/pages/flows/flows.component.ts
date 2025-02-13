import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flows } from '../../interfaces/Flows';
import { FlowsService } from '../../services/flows.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-flows',
  imports: [FormsModule, RouterLink],
  templateUrl: './flows.component.html',
  styleUrl: './flows.component.css',
})
export class FlowsComponent implements OnInit {
  flowsServices = inject(FlowsService);
  CurrentFlows: Flows[] = [];
  ngOnInit(): void {
    this.cargarFlows();
  }
  cargarFlows() {
    this.flowsServices.listar().subscribe((res) => {
      this.CurrentFlows = res.flows;
    });
  }
  
}
