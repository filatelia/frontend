
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './components/admin/dashboard-admin/dashboard-admin.component';
import { ConfiguracionCatalogoComponent } from './components/admin/anio-catalogo/configuracion-catalogo.component';
import { PaisCatalogoComponent } from './components/admin/pais-catalogo/pais-catalogo.component';
import { TemasCatalogoComponent } from './components/admin/temas-catalogo/temas-catalogo.component';
import { CatalogoAdminComponent } from './components/admin/catalogo-admin/catalogo-admin.component';
import { BlogAdminComponent } from './components/admin/blog-admin/blog-admin.component';
import { TiendaAdminComponent } from './components/admin/tienda-admin/tienda-admin.component';
import { AjustesAdminComponent } from './components/admin/ajustes-admin/ajustes-admin.component';

import { TiendaComponent } from './components/pages/tienda/tienda.component';
import { RegistrateComponent } from './components/pages/registrate/registrate.component';
import { IniciarComponent } from './components/pages/iniciar/iniciar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CatalogoComponent } from './components/pages/catalogo/catalogo.component';
import { CatalogoInternoComponent } from './components/pages/catalogo-interno/catalogo-interno.component';

import { ConfiguracionComponent } from './components/user/configuracion/configuracion.component';
import { MancolistaComponent } from './components/user/mancolista/mancolista.component';
import { DashboardUserComponent } from './components/user/dashboard-user/dashboard-user.component';
import { SubastaComponent } from './components/user/subasta/subasta.component';
import { TiendauserComponent } from './components/user/tiendauser/tiendauser.component';

import {AuthGuard} from './guard/auth.guard'
import { TablaCatalogoComponent } from './components/admin/tabla-catalogo/tabla-catalogo.component';

const routes: Routes = [
  
  {
    path: '',
    children: [
 
      //pages 

      { path: '', component: HomeComponent},
      { path: 'tienda',component: TiendaComponent},
      { path: 'catalogo', component:CatalogoComponent},
      { path: 'catalogo-interna/:pais', component:CatalogoInternoComponent},

      //auth
      { path: 'auth/register',component: RegistrateComponent, 
        
    },
      { path: 'auth/login',component: IniciarComponent }
      
    ],
  },

  {
   
    path: 'admin/dashboard',
    component: DashboardAdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ConfiguracionCatalogoComponent },
      
      { path: 'tabla', component: TablaCatalogoComponent },
      { path: 'pais', component: PaisCatalogoComponent },
      { path: 'temas', component: TemasCatalogoComponent},
      { path: 'catalogo-admin', component: CatalogoAdminComponent },
      { path: 'tienda-admin', component: TiendaAdminComponent },
      { path: 'blog-admin', component: BlogAdminComponent },
      { path: 'ajustes-admin', component: AjustesAdminComponent }
    ],
  },

  {
    path: 'user/dashboard',
    component: DashboardUserComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', component: SubastaComponent },
        { path: 'subasta', component: SubastaComponent },
        { path: 'configuracion', component: ConfiguracionComponent },
        { path: 'mancolista', component: MancolistaComponent },
        { path: 'tienda', component: TiendauserComponent },
    ]
  }

];


export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true });
