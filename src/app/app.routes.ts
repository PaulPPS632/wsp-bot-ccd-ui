import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
export const routes: Routes = [
    
    
    {
        path:'login',
        loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
    }
    ,
    {
        path: '',
        redirectTo: 'login', // Redirige a 'bots'
        pathMatch: 'full', // pathMatch para que coincida exactamente
    },
    {
        path:'',
        canActivate:[authGuard],
        data:{
            title:'Dashboard',
            roles: ['admin', 'usuario']
        },
        loadComponent:() => import('./component/layout/layout.component').then((m) => m.LayoutComponent),
        children:[
            {
                path: 'bots',
                loadComponent: () => import('./pages/bots/bots.component').then((m) => m.BotsComponent)
            },{
                path: 'masivos',
                loadComponent: () => import('./pages/masivos/masivos.component').then((m) =>  m.MasivosComponent)
            }
            ,{
                path: 'newmasivos',
                loadComponent: () => import('./pages/newmasivos/newmasivos.component').then((m) =>  m.NewmasivosComponent)
            },{
                path: 'masivos/:id',
                loadComponent: () => import('./pages/leads-masivo/leads-masivo.component').then((m) =>  m.LeadsMasivoComponent)
            },{
                path: 'flows',
                loadComponent: () => import('./pages/flows/flows.component').then((m) =>  m.FlowsComponent)
            },{
                path: 'newflows',
                loadComponent: () => import('./pages/newflow/newflow.component').then((m) =>  m.NewflowComponent)
            }
            ,{
                path: 'newflows/:id',
                loadComponent: () => import('./pages/newflow/newflow.component').then((m) =>  m.NewflowComponent)
            },{
                path: 'asignacion',
                loadComponent: () => import('./pages/asignacion/asignacion.component').then((m) => m.AsignacionComponent)
            },{
                path: 'asignacion/:id',
                loadComponent: () => import('./pages/leads-asignacion/leads-asignacion.component').then((m) => m.LeadsAsignacionComponent)
            },
            {
                path: 'newasignacion',
                loadComponent: () => import('./pages/newasignacion/newasignacion.component').then((m) => m.NewasignacionComponent)
            },
            {
                path: 'usuarios',
                loadComponent: () => import('./pages/usuarios/usuarios.component').then((m) => m.UsuariosComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'login', // Redirige a 'bots'
        pathMatch: 'full', // pathMatch para que coincida exactamente
    },
];
