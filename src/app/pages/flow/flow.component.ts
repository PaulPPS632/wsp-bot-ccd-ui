import {
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { FlowsService } from '../../services/flows.service';
import { Flows } from '../../interfaces/Flows';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardmensajesComponent } from "../../component/cardmensajes/cardmensajes.component";

@Component({
  selector: 'app-flow',
  imports: [FormsModule, CommonModule, CardmensajesComponent],
  templateUrl: './flow.component.html',
  styleUrl: './flow.component.css',
})
export class FlowComponent implements OnInit {
  @Input('id') id: string = '';

  flowService = inject(FlowsService);
  flow: Flows = {
    id: 0,
    name: '',
    mensajes: [],
  };
  ngOnInit(): void {}

  flowLoad() {
    this.flowService.getById(this.id).subscribe((res) => {
      this.flow = res.flow;
    });
  }
  flowUpdate() {
    if (this.flow.id == 0) {
      Swal.fire({
        title: 'Error',
        text: 'No hay un flow',
        icon: 'warning',
      });
      return;
    }
    this.flowService.updateById(this.id, this.flow).subscribe((res) => {
      Swal.fire({
        title: 'Cargado',
        text: 'se actualizo correctamente',
        icon: 'success',
      });
    });
  }
}
