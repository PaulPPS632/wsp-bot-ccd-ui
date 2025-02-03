import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent:() => import('./component/layout/layout.component').then((m) => m.LayoutComponent),
        children:[
            {
                path: '',
                redirectTo: 'bots', // Redirige a 'bots'
                pathMatch: 'full', // pathMatch para que coincida exactamente
            },
            {
                path: 'bots',
                loadComponent: () => import('./pages/bots/bots.component').then((m) => m.BotsComponent)
            },{
                path: 'leads',
                loadComponent: () => import('./pages/leads/leads.component').then((m) => m.LeadsComponent)
            },{
                path: 'bases',
                loadComponent: () => import('./pages/bases/bases.component').then((m) => m.BasesComponent)
            },{
                path: 'masivos',
                loadComponent: () => import('./pages/masivos/masivos.component').then((m) =>  m.MasivosComponent)
            },{
                path: 'flows',
                loadComponent: () => import('./pages/flows/flows.component').then((m) =>  m.FlowsComponent)
            }
        ]
    },
];
