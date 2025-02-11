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
  asignacionesService = new AsignacionesService(); // Asegúrate de inyectarlo correctamente si usas Angular DI

  newBot = {
    phone: '',
    flow: '',
    namebot: '',
  };


  create (){
    this.asignacionesService.create( this.newBot.phone ,this.newBot.namebot , this.newBot.flow).
    subscribe((res)=>{
      Swal.fire({
        title: "Tu conexión",
        text: `Conéctate con este código: ${res.pairingCode}`,
        icon: "success"
      });
    })
  }
}
