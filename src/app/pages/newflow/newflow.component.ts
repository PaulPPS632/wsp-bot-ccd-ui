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
import { lastValueFrom } from 'rxjs';
import { LoaderComponent } from "../../component/loader/loader.component";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-newflow',
  imports: [
    ModalComponent,
    FormsModule,
    CardmensajesComponent,
    CdkDropList,
    CdkDrag,
    LoaderComponent
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
  sanitizer = inject(DomSanitizer);

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
  flagLoader: boolean = false;
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

  async onFileSelected(event: any): Promise<void> {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const formData = new FormData();
      
      // Limitar a solo un archivo
      const file = selectedFiles[0]; 
      formData.append('files', file);
      console.log(file);
      // Enviar el archivo al backend
      this.flagLoader = true;
      const url = await this.uploadFile(formData).then(
        res => {
          this.flagLoader = false;
          return res
      });
      if(url){
        this.NewMensaje.content.body = url;
      }
    }
  }
async uploadFile(form: FormData): Promise<string>{
  try {
    const response = await lastValueFrom(this.archivosService.uploadImage(form));
    return response.fileUrl;
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    return ''; 
  }
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
    this.flowsServices.create(this.NewFlow).subscribe((res) => {
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
  get sanitizedBody(): SafeResourceUrl {
    return typeof this.NewMensaje.content.body === 'string' 
      ? this.sanitizer.bypassSecurityTrustResourceUrl(this.NewMensaje.content.body)
      : this.NewMensaje.content.body;
  }
  limpiarBodyNewMensaje(){
    this.NewMensaje.content.body = '';
  }
}
