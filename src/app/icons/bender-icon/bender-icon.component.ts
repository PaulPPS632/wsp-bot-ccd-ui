import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bender-icon',
  imports: [CommonModule],
  templateUrl: './bender-icon.component.html',
  styleUrl: './bender-icon.component.css'
})
export class BenderIconComponent {
 @Input() svgClasses: string = '';
}
