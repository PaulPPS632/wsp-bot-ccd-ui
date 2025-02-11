import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  ngOnInit(): void {
    initFlowbite();
  }

  validatePhoneNumber(event: any) {
    let input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, ''); // Permite solo números
    if (input.value.length > 9) {
      input.value = input.value.slice(0, 9); // Limita a 9 dígitos
    }
  }
  
}
