import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';
import { ModalComponent } from "../../component/modal/modal.component";
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  imports: [ModalComponent, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  flagModal: boolean = false;
  newusuario: Usuario = {
    name:'',
    username: '',
    password: '',
    rolId: 1,
  }
  usuarios : Usuario[] = [];

  authService = inject(AuthService);

  ngOnInit(): void {
    this.cargarusuarios();
  }
  cargarusuarios(){
    this.authService.listar().subscribe((res) => {
      this.usuarios = res.usuarios;
    })
  }
  toogleflagModal(){
    this.flagModal = !this.flagModal;
  }
  crearusuario(){
    this.toogleflagModal();
  }
  crear(){
    this.authService.crear(this.newusuario).subscribe({
      next: (res) =>{
        this.flagModal = false;
        Swal.fire({
          icon:'success',
          title:'Se creo con exito',
          text: 'usuario creado con exito',
          timer: 1000
        })
        this.cargarusuarios();
      },
      error: (err)=>{
        this.flagModal = false;
        Swal.fire({
          icon: 'error',
          title:'Error al crear usuario',
          text: err.message,
          timer: 1000
        })
      }
    })
  }
}
