
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './components/admin/dashboard-admin/dashboard-admin.component';
import { TemasCatalogoComponent } from './components/admin/temas-catalogo/temas-catalogo.component';
import { CatalogoAdminComponent } from './components/admin/catalogo-admin/catalogo-admin.component';
import { BlogAdminComponent } from './components/admin/blog-admin/blog-admin.component';
import { TiendaAdminComponent } from './components/admin/tienda-admin/tienda-admin.component';
import { AjustesAdminComponent } from './components/admin/ajustes-admin/ajustes-admin.component';
import { TablaCatalogoComponent } from './components/admin/tabla-catalogo/tabla-catalogo.component';
import {PedidosAdminComponent} from './components/admin/pedidos-admin/pedidos-admin.component';
import {ClientesAdminComponent} from './components/admin/clientes-admin/clientes-admin.component';
import {CuponesAdminComponent} from './components/admin/cupones-admin/cupones-admin.component';
import {ProductosAdminComponent} from './components/admin/productos-admin/productos-admin.component';
import {PagosAdminComponent} from './components/admin/pagos-admin/pagos-admin.component';
import {EnvioAdminComponent} from './components/admin/envio-admin/envio-admin.component';
import {CorreoAdminComponent} from './components/admin/correo-admin/correo-admin.component';
import {CatalogointernoAdminComponent} from './components/admin/catalogointerno-admin/catalogointerno-admin.component';
import {PeticionesAdminComponent} from './components/admin/peticiones-admin/peticiones-admin.component'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TiendaComponent } from './components/pages/tienda/tienda.component';
import { RegistrateComponent } from './components/pages/registrate/registrate.component';
import { IniciarComponent } from './components/pages/iniciar/iniciar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CatalogoComponent } from './components/pages/catalogo/catalogo.component';
import { CatalogoInternoComponent } from './components/pages/catalogo-interno/catalogo-interno.component';
import {MimancolistapublicaPageComponent} from './components/pages/mimancolistapublica-page/mimancolistapublica-page.component'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { ConfiguracionComponent } from './components/user/configuracion/configuracion.component';
import { MancolistaComponent } from './components/user/mancolista/mancolista.component';
import { DashboardUserComponent } from './components/user/dashboard-user/dashboard-user.component';
import { SubastaComponent } from './components/user/subasta/subasta.component';
import { TiendauserComponent } from './components/user/tiendauser/tiendauser.component';
import {PeticioncatalogoUserComponent} from './components/user/peticioncatalogo-user/peticioncatalogo-user.component'

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {AuthGuard, RolGuard} from './guard/auth.guard'


const routes: Routes = [
  
  {
    path: '',
    children: [
 
      //pages 

      { path: '', component: HomeComponent},
      { path: 'tienda',component: TiendaComponent},
      { path: 'catalogo', component:CatalogoComponent},
      { path: 'subasta', component:CatalogoComponent},
      { path: 'catalogo-interna/:pais', component:CatalogoInternoComponent},
      //auth
      { path: 'auth/register',component: RegistrateComponent, 
        
    },
      { path: 'auth/login',component: IniciarComponent }
      
    ],
  },
  {
    path: 'mimancolistapublica', component: MimancolistapublicaPageComponent
  },


  {
   
    path: 'admin/dashboard',
    component: DashboardAdminComponent,
    canActivate: [AuthGuard,RolGuard],
    children: [
      
      { path: 'tabla', component: TablaCatalogoComponent },
      { path: 'temas', component: TemasCatalogoComponent},
      { path: 'catalogo-admin', component: CatalogoAdminComponent },
      { path: 'detalle-catalogo-admin', component: CatalogointernoAdminComponent },
      { path: 'peticiones', component: PeticionesAdminComponent },
      { path: 'tienda-admin', component: TiendaAdminComponent, 
       children:[
        { path: '',component: ProductosAdminComponent },
        { path: 'productos',component: ProductosAdminComponent },
        { path: 'pedidos',component: PedidosAdminComponent },
        { path: 'clientes',component: ClientesAdminComponent },
        { path: 'cupones',component: CuponesAdminComponent }
      ]
    },
      { path: 'blog-admin', component: BlogAdminComponent },
      { path: 'ajustes-admin', component: AjustesAdminComponent,
      children:[
        { path: 'pagos',component: PagosAdminComponent },
        { path: 'envio',component: EnvioAdminComponent },
        { path: 'correo',component: CorreoAdminComponent }
      ]}
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
        { path: 'peticion-catalogo', component: PeticioncatalogoUserComponent },
    ]
  }

];


export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: false });
