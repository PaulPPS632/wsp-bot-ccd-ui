import { Component } from '@angular/core';
import { TuiButton } from '@taiga-ui/core'; // Importa el botón correctamente

@Component({
  selector: 'app-asignacion',
  standalone: true,
  imports: [TuiButton], // Importa el componente en lugar del módulo
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
})
export class AsignacionComponent {
  mostrarAlerta() {
    alert('¡Hola desde Taiga UI!');
  }
}