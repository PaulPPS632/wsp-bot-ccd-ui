import { Component, EventEmitter, inject, Input, input, Output } from '@angular/core';
import { Mensaje } from '../../interfaces/Mensaje';
import { FormsModule } from '@angular/forms';
import { CdkDragHandle } from '@angular/cdk/drag-drop';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoaderComponent } from "../loader/loader.component";
import { lastValueFrom } from 'rxjs';
import { ArchivosService } from '../../services/archivos.service';

@Component({
  selector: 'app-cardmensajes',
  imports: [FormsModule, CdkDragHandle, LoaderComponent],
  templateUrl: './cardmensajes.component.html',
  styleUrl: './cardmensajes.component.css'
})
export class CardmensajesComponent {
  @Input() posicion: number = 1;
  @Input() mensaje!: Mensaje;
  @Output() MensajeChange = new EventEmitter<number>();
  sanitizer = inject(DomSanitizer);
  flagLoader: boolean = false;
  archivosService = inject(ArchivosService);
  Eliminar(){
    this.MensajeChange.emit(this.posicion);
  }
  async onFileSelected(event: any): Promise<void>{
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
        this.mensaje.content.body = url;
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
  limpiarBodyNewMensaje(){
    this.mensaje.content.body = '';
  }
  get sanitizedBody(): SafeResourceUrl {
    return typeof this.mensaje.content.body === 'string' 
      ? this.sanitizer.bypassSecurityTrustResourceUrl(this.mensaje.content.body)
      : this.mensaje.content.body;
  }
}
