import { Component, inject, Input, OnInit } from '@angular/core';
import { ModalComponent } from '../../component/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { Mensaje } from '../../interfaces/Mensaje';
import { Flows } from '../../interfaces/Flows';
import { CardmensajesComponent } from '../../component/cardmensajes/cardmensajes.component';
import { FlowsService } from '../../services/flows.service';
import Swal from 'sweetalert2';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { ArchivosService } from '../../services/archivos.service';

@Component({
  selector: 'app-newflow',
  imports: [
    ModalComponent,
    FormsModule,
    CardmensajesComponent,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './newflow.component.html',
  styleUrl: './newflow.component.css',
})
export class NewflowComponent implements OnInit {
  @Input('id') id: string = '';
  clonar: boolean = false;
  router = inject(ActivatedRoute);
  flowsServices = inject(FlowsService);
  archivosService = inject(ArchivosService);
  flagModalNewMensaje: boolean = false;
  CurrentFlows: Flows[] = [];
  flagCursos: boolean = false;
  Cursos: string | undefined = "";
  NewFlow: Flows = {
    id: 0,
    name: '',
    cursos: [],
    variables: {},
    mensajes: [],
  };
  NewMensaje: Mensaje = {
    id: '',
    tipo: 'texto',
    content: {
      body: '',
      footer: '',
    },
  };
  selectedFile: File | null = null;
  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.clonar = params['clonar'] === 'true';
    });
    if (this.id !== undefined) {
      //this.cargarFlows();
      this.flowLoad();
    }
  }
  flowLoad() {
    this.flowsServices.getById(this.id).subscribe((res) => {
      this.NewFlow = res.flow;
      if(res.flow.cursos != null && res.flow.cursos.length > 0){
        this.Cursos = this.NewFlow.cursos?.join("\n");
        this.flagCursos = true;
      }
      if (this.clonar) {
        this.NewFlow.name = this.NewFlow.name + ' (copy)';
        
      }
    });
  }
  eliminarmensaje(posicion: number) {
    this.NewFlow.mensajes.splice(posicion - 1, 1);
  }
  
  addNewMensaje() {
    this.NewFlow.mensajes.push(this.NewMensaje);
    this.NewMensaje = {
      id: '',
      tipo: 'texto',
      content: {
        body: '',
        footer: '',
      },
    };
    this.toggleflagModalNewMensaje();
  }
    
/*
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    let res = this.archivosService.uploadImage(this.selectedFile!);
    console.log(res);
  }
*/
files: File[]=[];
onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  this.files.push(Array.from(event.target.files));
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
    this.files.push(this.selectedFile);
  }
}
createFormData(flow: Flows): FormData{
  const formData = new FormData();
  this.files.forEach((file) => {
    formData.append('files', file);
  });
  formData.append('flow', JSON.stringify(flow));

  console.log('FormData creado:', formData);
  return formData;
/*
  this.archivosService.uploadImage(formData).subscribe({
    next: (response) =>{
      console.log('Imagen subida con éxito:', response)
      console.log('URL de la imagen:', response.files[0].url);
      
      this.NewMensaje.content.body = response.files[0].url;
    },
    error: (error) => console.error('Error al subir la imagen:', error)
  });
  */
  }
  CrearFlow() {
    if (this.NewFlow.name == '') {
      Swal.fire({
        title: 'FALTA NOMBRE',
        text: 'NO PUEDES CREAR UN FLUJO SIN NOMBRE',
        icon: 'warning',
        timer: 1500,
      });
      return;
    }
    this.parsearTexArea();
    const form = this.createFormData(this.NewFlow);


    this.flowsServices.create(form).subscribe((res) => {
      Swal.fire({
        title: 'ESTADO',
        text: res.message,
        icon: 'success',
        timer: 1500,
      });
      this.NewFlow = {
        id: 0,
        name: '',
        cursos: [],
        variables: {},
        mensajes: [],
      };
    });
  }
  EditarFlow() {
    this.parsearTexArea();
    this.flowsServices.updateById(this.id, this.NewFlow).subscribe((res) => {
      Swal.fire({
        title: 'ESTADO',
        text: res.message,
        icon: 'success',
        timer: 1500,
      });
    });
  }
  toggleflagModalNewMensaje() {
    this.flagModalNewMensaje = !this.flagModalNewMensaje;
  }
  drop(event: CdkDragDrop<Mensaje[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  parsearTexArea() {
    // 🔹 Convertir el contenido del textarea en un array 
    if(!this.Cursos) {this.NewFlow.cursos = null; return;}
    let cursoslist = this.Cursos
      .split(/\n+/) // Dividir por saltos de línea
      .map((num) => num.trim()) // Quitar espacios extra
      .filter((num) => num !== ''); // Eliminar líneas vacías
      console.log(cursoslist.length === 0 ? null : cursoslist);
    this.NewFlow.cursos = cursoslist.length === 0 ? null : cursoslist;
    // 🔹 Enviar los datos al servicio
  }
}
