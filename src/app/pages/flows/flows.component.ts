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
    this.flowSearch('');
  }
  cargarFlows() {
    this.flowsServices.listar(false).subscribe((res) => {
      this.CurrentFlows = res.flows;
    });
  }
  flowSearch(event: Event | string){
    if (event instanceof Event) {
      const inputElement = event.target as HTMLInputElement;
      const selectedText = inputElement.value.toLowerCase();
  
      this.flowsServices.search(selectedText).subscribe((res) => {
        this.CurrentFlows = res.flows;
      });
    }else{
      this.flowsServices.search(event).subscribe((res) => {
        this.CurrentFlows = res.flows;
      });
    }
    
  }
}
