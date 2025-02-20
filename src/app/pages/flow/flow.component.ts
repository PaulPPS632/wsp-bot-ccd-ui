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
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Mensaje } from '../../interfaces/Mensaje';

@Component({
  selector: 'app-flow',
  imports: [FormsModule, CommonModule, CardmensajesComponent,CdkDropList, CdkDrag],
  templateUrl: './flow.component.html',
  styleUrl: './flow.component.css',
})
export class FlowComponent implements OnInit {
  @Input('id') id: string = '';

  flowService = inject(FlowsService);
  flow: Flows = {
    id: 0,
    name: '',
    cursos: [],
    variables:'',
    mensajes: [],
  };
  ngOnInit(): void {
    this.flowLoad();
  }

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

    drop(event: CdkDragDrop<Mensaje[]>){
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }
}
