import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BotsService } from '../../services/bots.service';
import { FlowsService } from '../../services/flows.service';
import { AsignacionesService } from '../../services/asignaciones.service';
import { Flows } from '../../interfaces/Flows';
import { Bot } from '../../interfaces/Bot';
import { Asignaciones } from '../../interfaces/Asignaciones';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignacion',
  imports: [FormsModule],
  templateUrl: './asignacion.component.html',
  styleUrl: './asignacion.component.css',
})
export class AsignacionComponent {

  botService = inject(BotsService);
  flowService = inject(FlowsService);
  asignacionesService = inject(AsignacionesService);

  flows: Flows[] = [];
  bots: Bot[] = [];

  NewAsignacion: Asignaciones = {
    numeros:[],
    delaymin: 10,
    delaymax: 30,
    flowId: 0,
    botId: 0
  }
  newBot = {
    phone: '', 
    flow: '',
    namebot: '',
  };
  ngOnInit(): void {
    this.BotsLoad();
    this.FlowsLoad();
  }

  BotsLoad(): void {
    this.botService.getBots().subscribe((res) => {
      this.bots = res;
    });
  }
  FlowsLoad(): void {
    this.flowService.listar().subscribe((res) => {
      this.flows = res;
    });
  }
  SendAsignacion() {
    this.asignacionesService.SendAsignaciones(this.NewAsignacion).subscribe((res) => {
      Swal.fire({
        title: 'ESTADO',
        text: res.message,
        icon: 'success',
        timer: 1500,
      });
    });
  }

  parsearTexArea(){
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
        return `51${num}`; // ➕ Agregar "+51" si el número tiene solo 9 dígitos
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
    this.SendAsignacion();
  }
}
