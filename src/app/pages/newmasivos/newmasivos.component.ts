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
  numerosParseados: number[] = [];
  ngOnInit(): void {
    this.cargarcantRespantes()
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
    this.flowsService.listar(true).subscribe((res) => {
      this.listaFlows = res.flows;
    })
  }

  flowSearch(searchFlow: string){
    this.flowsService.search(searchFlow, true).subscribe((res) => {
      this.listaFlows = res.flows;
    });
  }

  flowSelect(id: number){
    //this.NewAsignacion.flow = this.flows.find((flow) => flow.id == id);
    this.selectedFlows.push(this.listaFlows.find((flow) => flow.id == id)!)
  }

  procesarExcel(event: any) {
    const file = event.target.files[0];
    if (!file) {
      Swal.fire({
        title: "Error",
        text: "Por favor, selecciona un archivo.",
        icon: "error"
      });
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      
      // Tomar la primera hoja del archivo
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
  
      // Convertir a JSON
      const rawNumbers: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 }).flat();
      
      // Llamar a la función de formateo
      this.procesarNumero(rawNumbers);
    };
    reader.readAsArrayBuffer(file);
  }
  
  parsearNumeros(numbers: string[]): { validNumbers: string[], invalidNumbers: string[] } {
    let validNumbers: string[] = [];
    let invalidNumbers: string[] = [];
  
    numbers.forEach(num => {
      num = num.toString().trim();
  
      if (/^\+?51\d{9}$/.test(num)) {
        validNumbers.push(num); // ✅ Ya tiene el prefijo, lo dejamos igual
      } else if (/^\d{9}$/.test(num)) {
        validNumbers.push(`51${num}`); // ➕ Agregar "51" si el número tiene solo 9 dígitos
      } else {
        invalidNumbers.push(num); // ❌ Número inválido
      }
    });
  
    return { validNumbers, invalidNumbers };
  }
  
  procesarNumero(numbers: any[]) {
    if (!numbers || numbers.length === 0) {
      Swal.fire({
        title: "Error",
        text: "No se encontraron números en el archivo.",
        icon: "error"
      });
      return;
    }
  
    // Llamar a la función que formatea los números
    const { validNumbers, invalidNumbers } = this.parsearNumeros(numbers);
  
    // Mostrar alerta con los números inválidos si hay
    if (invalidNumbers.length > 0) {
      Swal.fire({
        title: "Atención",
        text: `Se encontraron números inválidos: ${invalidNumbers.join(", ")}`,
        icon: "warning"
      });
    }
  
    // Verificar si hay al menos un número válido
    if (validNumbers.length === 0) {
      this.toogleLoader();
      Swal.fire({
        title: "Error",
        text: "Ingresa al menos un número válido con 9 dígitos.",
        icon: "error"
      });
      return;
    }
  
    console.log("Números válidos:", validNumbers);
  }


  SendMasivos() {
    this.masivo.flows = this.selectedFlows;
    this.toogleLoader();
    if(!this.isActive){
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
}
