
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
import { MonedaAdminComponent } from './components/admin/moneda-admin/moneda-admin.component';
import { TransferenciaAdminComponent } from './components/admin/transferencia-admin/transferencia-admin.component';
import { PaypalAdminComponent } from './components/admin/paypal-admin/paypal-admin.component';
import { AddcorreoAdminComponent } from './components/admin/addcorreo-admin/addcorreo-admin.component';
import { ReporteComponent } from './components/admin/reporte/reporte.component';


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TiendaComponent } from './components/pages/tienda/tienda.component';
import { SubastaPagesComponent } from './components/pages/subasta-pages/subasta-pages.component';
import { RegistrateComponent } from './components/pages/registrate/registrate.component';
import { IniciarComponent } from './components/pages/iniciar/iniciar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CatalogoComponent } from './components/pages/catalogo/catalogo.component';
import { CatalogoInternoComponent } from './components/pages/catalogo-interno/catalogo-interno.component';
import {MimancolistapublicaPageComponent} from './components/pages/mimancolistapublica-page/mimancolistapublica-page.component'
import { SubastaDetalleComponent } from './components/pages/subasta-detalle/subasta-detalle.component';
import {TiendaDetalleComponent} from './components/pages/tienda-detalle/tienda-detalle.component'
import {ContactosPagesComponent} from './components/pages/contactos-pages/contactos-pages.component'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { ConfiguracionComponent } from './components/user/configuracion/configuracion.component';
import { MancolistaComponent } from './components/user/mancolista/mancolista.component';
import { DashboardUserComponent } from './components/user/dashboard-user/dashboard-user.component';
import { SubastaComponent } from './components/user/subasta/subasta.component';
import { TiendauserComponent } from './components/user/tiendauser/tiendauser.component';
import {PeticioncatalogouserComponent} from './components/user/peticioncatalogo-user/peticioncatalogouser.component'

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import {AuthGuard, RolGuard} from './guard/auth.guard'
import { CatalogoUserComponent } from './components/user/catalogo-user/catalogo-user.component';


const routes: Routes = [
  
  {
    path: '',
    children: [
 
      //pages 

      { path: '', component: HomeComponent},
      { path: 'tienda',component: TiendaComponent},
      { path: 'catalogo', component:CatalogoComponent},
      { path: 'contactos', component:ContactosPagesComponent},
      { path: 'subasta', component:SubastaPagesComponent},
      { path: 'catalogo-interna/:pais', component:CatalogoInternoComponent},
      { path: 'subastadetalle', component:SubastaDetalleComponent},
      { path: 'tiendadetalle', component:TiendaDetalleComponent},
      //auth
      { path: 'auth/register',component: RegistrateComponent, 
        
    },
      { path: 'auth/login',component: IniciarComponent }
      
    ],
  },
  {
    path: 'mancolista/:id_user', component: MimancolistapublicaPageComponent
  },
  {
    path: 'mimancolistapublica', component: MimancolistapublicaPageComponent
  },


  {
   
    path: 'admin/dashboard',
    component: DashboardAdminComponent,
    canActivate: [AuthGuard,RolGuard],
    children: [
      { path: '', component: PeticionesAdminComponent },
      { path: 'mancolista', component: MancolistaComponent },
      { path: 'reporte', component: ReporteComponent },
      { path: 'tabla', component: TablaCatalogoComponent },
      { path: 'temas', component: TemasCatalogoComponent},
      { path: 'catalogo-admin', component: CatalogoAdminComponent },
      { path: 'catalogo-seleccionado/:id_catalogo', component: CatalogointernoAdminComponent },
      { path: 'detalle-catalogo-admin', component: CatalogointernoAdminComponent },
      { path: 'peticiones', component: PeticionesAdminComponent, },
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
        { path: '',component: MonedaAdminComponent },
        { path: 'monedas',component: MonedaAdminComponent },
        { path: 'pagos',component: PagosAdminComponent },
        { path: 'pagos-transferencia',component: TransferenciaAdminComponent },
        { path: 'envio',component: EnvioAdminComponent },
        { path: 'correo',component: CorreoAdminComponent },
        { path: 'pagos-paypal',component: PaypalAdminComponent },
        { path: 'add-correo',component: AddcorreoAdminComponent }
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
        { path: 'catalogo', component: CatalogoUserComponent },
        { path: 'peticion-catalogo', component: PeticioncatalogouserComponent },
    ]
  }

];


export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: false });
