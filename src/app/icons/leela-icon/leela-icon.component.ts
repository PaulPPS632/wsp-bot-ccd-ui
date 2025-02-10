import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-leela-icon',
  imports: [CommonModule],
  templateUrl: './leela-icon.component.html',
  styleUrl: './leela-icon.component.css'
})
export class LeelaIconComponent {
 @Input() svgClasses: string = '';
}
