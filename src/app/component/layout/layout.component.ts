import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  authService = inject(AuthService);
  flagAdmin: boolean = false;
  
  ngOnInit(): void {
    initFlowbite();
    /*
    this.authService.usuario$.subscribe((res)=>{
      r
    })*/
    this.authService.isLoggedIn().subscribe((res)=>{
      this.flagAdmin = res.rol === 'admin';
    })
  }
  logout(){
    this.authService.logout();
  }
}
