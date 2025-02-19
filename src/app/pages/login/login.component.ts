import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authService = inject(AuthService);
  router = inject(Router);

  usuario: Usuario ={
    username: '',
    password:''
  }

  login(){
    this.authService.login(this.usuario).subscribe({
      next: (res) =>{
        
        if(res.rol == "admin" || res.rol == "usuario"){
          console.log(res.rol);
          this.router.navigate(['/bots'])
        }
      },
      error: (error) =>{
        Swal.fire({
          title:'NO EXISTE',
          icon:'error',
          text:'el usuario no existe',
          timer: 1000
        })
      }
    });
  }
}
