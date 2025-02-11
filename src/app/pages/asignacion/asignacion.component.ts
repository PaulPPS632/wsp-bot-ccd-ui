import { Component } from '@angular/core';

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
