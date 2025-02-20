import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BotsService } from '../../services/bots.service';
import { FlowsService } from '../../services/flows.service';
import { AsignacionesService } from '../../services/asignaciones.service';
import { Flows } from '../../interfaces/Flows';
import { Bot } from '../../interfaces/Bot';
import { Asignaciones } from '../../interfaces/Asignaciones';
import Swal from 'sweetalert2';
import { SelectSearchComponent } from "../../component/select-search/select-search.component";
import { ModalComponent } from "../../component/modal/modal.component";
import { LoaderComponent } from "../../component/loader/loader.component";

@Component({
  selector: 'app-newasignacion',
  imports: [FormsModule, SelectSearchComponent, ModalComponent, LoaderComponent],
  templateUrl: './newasignacion.component.html',
  styleUrl: './newasignacion.component.css'
})
export class NewasignacionComponent {

  botService = inject(BotsService);
  flowService = inject(FlowsService);
  asignacionesService = inject(AsignacionesService);
  flagConfigurar: boolean = false;
  fechaConfiguracion!: Date ;
  flows: Flows[] = [];
  bots: Bot[] = [];

  NewAsignacion: Asignaciones = {
    name: "",
    numeros:[],
    delaymin: 10,
    delaymax: 30,
  }
  numeros: string = ''; 
  flagLoader: boolean = false;
  ngOnInit(): void {
    this.botSearch('');
    this.flowSearch('');
  }

  BotsLoad(): void {
    this.botService.getBots().subscribe((res) => {
      this.bots = res;
    });
  }
  FlowsLoad(): void {
    this.flowService.listar(false).subscribe((res) => {
      this.flows = res.flows;
    });
  }


  flowSearch(searchFlow: string){
    this.flowService.search(searchFlow).subscribe((res) => {
      this.flows = res.flows;
    });
  }
  flowSelect(id: number){
    this.NewAsignacion.flow = this.flows.find((flow) => flow.id == id);
  }
  botSearch(searchBot: string){
    this.botService.search(searchBot,'asignacion').subscribe((res) => {
      this.bots = res.bots;
    });
  }
  botSelect(id: number){
    this.NewAsignacion.bot = this.bots.find((bot) => bot.id == id);
  }
  modalconfigurar(){
    this.flagConfigurar = !this.flagConfigurar;
  }
  enviarConfiguracion(){
    this.parsearTexArea();
    const fechaISO = new Date(this.fechaConfiguracion).toISOString();
    console.log(this.fechaConfiguracion);
    console.log(fechaISO);
    this.asignacionesService.ProgramacionAsignacion(this.NewAsignacion, fechaISO).subscribe((res)=>{
      this.RequestConrretoyLimpiar(res.message);
      this.modalconfigurar();
    })
  }
  SendAsignacion() {
    this.toogleLoader();
    this.parsearTexArea();
    this.asignacionesService.SendAsignaciones(this.NewAsignacion).subscribe({
      next:(res) => {
        this.RequestConrretoyLimpiar(res.message);
        this.toogleLoader();
      },
      error: (err) => {
        Swal.fire({
          title: 'ERROR',
          text: err.message,
          icon: 'error',
          timer: 1500,
        });
        this.toogleLoader();
      }
    });
  }
  toogleLoader(){
    this.flagLoader = !this.flagLoader
  }
  RequestConrretoyLimpiar(message: string){
    Swal.fire({
      title: 'ESTADO',
      text: message,
      icon: 'success',
      timer: 1500,
    });
    this.NewAsignacion = {
      name:"",
      numeros:[],
      delaymin: 10,
      delaymax: 30,
    }
  }
  parsearTexArea(){
    // 🔹 Convertir el contenido del textarea en un array de números
    let phoneNumbers = this.numeros
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
      this.toogleLoader();
      Swal.fire({
        title: "Error",
        text: "Ingresa al menos un número válido con 9 dígitos.",
        icon: "error"
      });
      return;
    }
    this.NewAsignacion.numeros = phoneNumbers;
    // 🔹 Enviar los datos al servicio

  }
  onKeyPress(event: KeyboardEvent) {
    // Permitir solo números y algunas teclas especiales como Backspace
    if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key != "Enter") {
      event.preventDefault();
    }
  }
  onInput() {
    // Eliminar cualquier carácter no numérico si se pega algo incorrecto
    this.numeros = this.numeros.replace(/[^\d\n]/g, '');
  }
}
