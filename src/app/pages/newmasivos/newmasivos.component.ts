import { Component, inject, OnInit } from '@angular/core';
import { Masivo } from '../../interfaces/Masivo';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MasivosService } from '../../services/masivos.service';
import { Flows } from '../../interfaces/Flows';
import { CardFlowsComponent } from "../../component/card-flows/card-flows.component";
import { FlowsService } from '../../services/flows.service';
import { LeadsService } from '../../services/leads.service';
import { LoaderComponent } from "../../component/loader/loader.component";
import { SelectSearchComponent } from "../../component/select-search/select-search.component";
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-newmasivos',
  imports: [FormsModule, CdkDropList, CdkDrag, CommonModule, CardFlowsComponent, LoaderComponent, SelectSearchComponent],
  templateUrl: './newmasivos.component.html',
  styleUrl: './newmasivos.component.css'
})
export class NewmasivosComponent implements OnInit {

  masivosService = inject(MasivosService);
  flowsService = inject(FlowsService);
  leadsService = inject(LeadsService);
  cantLeasRestantes: number = 0;
  listaFlows: Flows[] = [];
  selectedFlows: Flows[]=[];
  masivo: Masivo = {
    name: "",
    cant: 0,
    delaymin: 0,
    delaymax: 30,
    flows: [],
  };
  flagLoader: boolean = false;
  isActive: boolean = false;
  validNumbers: string[] = [];
  invalidNumbers: string[] = [];
  invalidNumbersText: string = ''; // Variable para almacenar el contenido del textarea
  ngOnInit(): void {
    this.cargarcantRespantes()
    this.cargarFlows();
    this.flowSearch('');
  }
  drop(event: CdkDragDrop<Flows[]>){
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
  cargarFlows(){
    this.flowsService.listar(false).subscribe((res) => {
      this.listaFlows = res.flows;
    })
  }

  flowSearch(searchFlow: string){
    this.flowsService.search(searchFlow).subscribe((res) => {
      this.listaFlows = res.flows;
    });
  }

  flowSelect(id: number){
    //this.NewAsignacion.flow = this.flows.find((flow) => flow.id == id);
    this.selectedFlows.push(this.listaFlows.find((flow) => flow.id == id)!)
  }

  // Método para procesar el archivo Excel
  procesarExcel(event: any) {
    const file = event.target.files[0];
    if (!file) {
      this.mostrarError("Por favor, selecciona un archivo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rawNumbers: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 }).flat();
      this.procesarNumero(rawNumbers);
    };
    reader.readAsArrayBuffer(file);
  }

  // Método para procesar los números
  procesarNumero(numbers: any[]) {
    if (!numbers?.length) {
      this.mostrarError("No se encontraron números en el archivo.");
      return;
    }

    // Reiniciar los arrays de números válidos e inválidos
    this.validNumbers = [];
    this.invalidNumbers = [];

    // Validar cada número
    numbers.forEach(num => {
      const trimmedNum = num.toString().trim();

      if (/^\+?51\d{9}$/.test(trimmedNum)) {
        this.validNumbers.push(trimmedNum); // ✅ Número válido con prefijo
      } else if (/^\d{9}$/.test(trimmedNum)) {
        this.validNumbers.push(`51${trimmedNum}`); // ➕ Agregar "51" si el número tiene 9 dígitos
      } else {
        this.invalidNumbers.push(trimmedNum); // ❌ Número inválido
      }
    });

    // Actualizar el contenido del textarea con los números inválidos
    this.invalidNumbersText = this.invalidNumbers.join('\n');

    // Mostrar alerta si hay números inválidos
    if (this.invalidNumbers.length) {
      Swal.fire({
        title: "Atención",
        text: `Se encontraron números inválidos: ${this.invalidNumbers.join(", ")}`,
        icon: "warning"
      });
    }

    // Verificar si hay al menos un número válido
    if (!this.validNumbers.length) {
      this.toogleLoader();
      this.mostrarError("Ingresa al menos un número válido con 9 dígitos.");
      return;
    }

    console.log("Números válidos:", this.validNumbers);
    console.log("Números inválidos:", this.invalidNumbers);
  }


  validarNumerosEditados() {
    const numerosEditados = this.invalidNumbersText.split('\n');
    const nuevosValidos: string[] = [];
    const nuevosInvalidos: string[] = [];

    numerosEditados.forEach(num => {
      const trimmedNum = num.toString().trim();

      if (/^\+?51\d{9}$/.test(trimmedNum)) {
        nuevosValidos.push(trimmedNum); // ✅ Número válido con prefijo
      } else if (/^\d{9}$/.test(trimmedNum)) {
        nuevosValidos.push(`51${trimmedNum}`); // ➕ Agregar "51" si el número tiene 9 dígitos
      } else {
        nuevosInvalidos.push(trimmedNum); // ❌ Número inválido
      }
    });


    this.validNumbers = [...this.validNumbers, ...nuevosValidos]; 
    this.invalidNumbers = nuevosInvalidos; 

    this.invalidNumbersText = this.invalidNumbers.join('\n');

    if (nuevosValidos.length > 0) {
      Swal.fire({
        title: "Éxito",
        text: `Se movieron ${nuevosValidos.length} números a válidos.`,
        icon: "success"
      });
      console.log("Números válidos:", this.validNumbers);
      
    }
  }

  // Método para mostrar errores
  mostrarError(mensaje: string) {
    Swal.fire({
      title: "Error",
      text: mensaje,
      icon: "error"
    });
  }


  SendMasivos() {
    if(!this.isActive){
      this.masivo.flows = this.selectedFlows;
      this.toogleLoader();
      this.masivosService.sendmasivos(this.masivo).subscribe((res) => {
        Swal.fire({
          title: 'ESTADO',
          text: res.message,
          icon: 'success',
          timer: 1500,
        });
        
        this.selectedFlows = [];
        this.masivo = {
          name: "",
          cant: 0,
          delaymin: 0,
          delaymax: 30,
          flows: [],
        };
        this.toogleLoader();
        this.cargarcantRespantes();
        this.cargarFlows();
      });
    }else{
      const numerosParseados = this.validNumbers.map(num => parseInt(num));
      console.log("Usando excel");
      this.masivosService.sendMasivosExcel(this.masivo, numerosParseados).subscribe((res) => {
        
        Swal.fire({
          title: 'ESTADO',
          text: res.message,
          icon: 'success',
          timer: 1500,
        });
        this.selectedFlows = [];
        this.masivo = {
          name: "",
          cant: this.validNumbers.length,
          delaymin: 0,
          delaymax: 30,
          flows: [],
        };
        this.toogleLoader();
        this.cargarcantRespantes();
        this.cargarFlows();
      });
    }
  }
  toogleLoader(){
    this.flagLoader = !this.flagLoader
  }
  cargarcantRespantes(){
    this.leadsService.cantRestantes().subscribe((res) => {
      this.cantLeasRestantes = res.cant;
    })
  }
downloadExcel() {
  this.leadsService.excel().subscribe(blob => {
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    
    a.href = url;
    a.download = `leads_${new Date().toISOString()}.xlsx`;
    document.body.appendChild(a);
    a.click();
    
    // Liberar recursos
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  });
}
toggleInputExcel(){
  this.isActive = !this.isActive
}
// Método para convertir el array de números inválidos en una cadena con saltos de línea
getNumerosInvalidos(): string {
  return this.invalidNumbers.join('\n');
}
}
