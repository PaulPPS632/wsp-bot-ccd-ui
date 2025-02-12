import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fry-icon',
  imports: [CommonModule],
  templateUrl: './fry-icon.component.html',
  styleUrl: './fry-icon.component.css'
})
export class FryIconComponent {
 @Input() svgClasses: string = '';
}
