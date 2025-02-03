import { Component, Input } from '@angular/core';
import { Flows } from '../../interfaces/Flows';

@Component({
  selector: 'app-card-flows',
  imports: [],
  templateUrl: './card-flows.component.html',
  styleUrl: './card-flows.component.css'
})
export class CardFlowsComponent {
  @Input() flow!: Flows;
}
