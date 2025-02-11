import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AsignacionesService } from '../../services/asignaciones.service';

@Component({
  selector: 'app-asignacion',
  imports: [],
  templateUrl: './asignacion.component.html',
  styleUrl: './asignacion.component.css'
})
export class AsignacionComponent {
  asignacionesService = new AsignacionesService(); 

  newBot = {
    phone: '', 
    flow: '',
    namebot: '',
  };

  create() {
    // 🔹 Convertir el contenido del textarea en un array de números
    let phoneNumbers = this.newBot.phone
      .split(/\n+/) // Dividir por saltos de línea
      .map(num => num.trim()) // Quitar espacios extra
      .filter(num => num !== ""); // Eliminar líneas vacías

    // 🔹 Verificar y agregar el código de Perú si es necesario
    phoneNumbers = phoneNumbers.map(num => {
      if (/^\+?51\d{9}$/.test(num)) {
        return num; // ✅ Ya tiene el código de país, lo dejamos igual
      } else if (/^\d{9}$/.test(num)) {
        return `+51${num}`; // ➕ Agregar "+51" si el número tiene solo 9 dígitos
      } else {
        return null; // ❌ Número inválido
      }
    }).filter(num => num !== null); // Eliminar los números inválidos

    // 🔹 Verificar si hay al menos un número válido antes de enviar
    if (phoneNumbers.length === 0) {
      Swal.fire({
        title: "Error",
        text: "Ingresa al menos un número válido con 9 dígitos.",
        icon: "error"
      });
      return;
    }

    // 🔹 Enviar los datos al servicio
    this.asignacionesService.create(phoneNumbers, this.newBot.namebot, this.newBot.flow)
      .subscribe((res) => {
        Swal.fire({
          title: "Tu conexión",
          text: `Conéctate con este código: ${res.pairingCode}`,
          icon: "success"
        });
      });
  }
}
