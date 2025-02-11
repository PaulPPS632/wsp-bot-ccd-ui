import { Component, inject, OnInit } from '@angular/core';
import { BotsService } from '../../services/bots.service';
import { FlowsService } from '../../services/flows.service';
import { Flows } from '../../interfaces/Flows';
import { Bot } from '../../interfaces/Bot';
import { AsignacionesService } from '../../services/asignaciones.service';
import Swal from 'sweetalert2';
import { Asignaciones } from '../../interfaces/asignaciones';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-asignacion',
  imports: [FormsModule],
  templateUrl: './asignacion.component.html',
  styleUrl: './asignacion.component.css',
})
export class AsignacionComponent implements OnInit {
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
  }
}
