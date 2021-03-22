import {HttpClientModule} from '@angular/common/http'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormGroup, FormsModule,ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MaterialModule} from './modules/material/material.module'
import { APP_BASE_HREF, CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbAccordionModule, NgbNavModule} from '@ng-bootstrap/ng-bootstrap';


// component de page
import { HomeComponent } from './components/pages/home/home.component';
import { TiendaComponent } from './components/pages/tienda/tienda.component';
import { RegistrateComponent } from './components/pages/registrate/registrate.component';
import { IniciarComponent } from './components/pages/iniciar/iniciar.component';
import { RouterModule } from '@angular/router';
import { CatalogoComponent } from './components/pages/catalogo/catalogo.component';
import { CatalogoInternoComponent } from './components/pages/catalogo-interno/catalogo-interno.component';

import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { TemasCatalogoComponent } from './components/admin/temas-catalogo/temas-catalogo.component';
import { TiendaAdminComponent } from './components/admin/tienda-admin/tienda-admin.component';
import { DashboardAdminComponent } from './components/admin/dashboard-admin/dashboard-admin.component';


import { ConfiguracionComponent } from './components/user/configuracion/configuracion.component';
import { MancolistaComponent } from './components/user/mancolista/mancolista.component';
import { SubastaComponent } from './components/user/subasta/subasta.component';
import { TiendauserComponent } from './components/user/tiendauser/tiendauser.component';
import { DashboardUserComponent } from './components/user/dashboard-user/dashboard-user.component';

import { FooterComponent } from './components/footer/footer.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { ChartsAdminComponent } from './components/admin/charts-admin/charts-admin.component';
import { CatalogoAdminComponent } from './components/admin/catalogo-admin/catalogo-admin.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';

import { DataTablesModule } from "angular-datatables";
import { TablaCatalogoComponent } from './components/admin/tabla-catalogo/tabla-catalogo.component';
import { BlogAdminComponent } from './components/admin/blog-admin/blog-admin.component';
import { TiendaAdminLinkComponent } from './components/admin/tienda-admin-link/tienda-admin-link.component';
import { AjustesAdminLinkComponent } from './components/admin/ajustes-admin-link/ajustes-admin-link.component';
import { AjustesAdminComponent } from './components/admin/ajustes-admin/ajustes-admin.component';
import { PedidosAdminComponent } from './components/admin/pedidos-admin/pedidos-admin.component';
import { ClientesAdminComponent } from './components/admin/clientes-admin/clientes-admin.component';
import { CuponesAdminComponent } from './components/admin/cupones-admin/cupones-admin.component';
import { PagosAdminComponent } from './components/admin/pagos-admin/pagos-admin.component';
import { TemasAdminComponent } from './components/admin/temas-admin/temas-admin.component';
import { CorreoAdminComponent } from './components/admin/correo-admin/correo-admin.component';
import { EnvioAdminComponent } from './components/admin/envio-admin/envio-admin.component';
import { ProductosAdminComponent } from './components/admin/productos-admin/productos-admin.component';
import { MimancolistapublicaPageComponent } from './components/pages/mimancolistapublica-page/mimancolistapublica-page.component';
import { PeticioncatalogouserComponent } from './components/user/peticioncatalogo-user/peticioncatalogouser.component';
@NgModule({
  declarations: [
    
    AppComponent, 
    DashboardAdminComponent,  
    SidebarComponent, 
    TemasCatalogoComponent,  
    TiendaAdminComponent,
    HomeComponent, 
    TiendaComponent, 
    RegistrateComponent, 
    IniciarComponent, 
    CatalogoComponent, 
    CatalogoInternoComponent,
    ConfiguracionComponent,
    MancolistaComponent,
    SubastaComponent,
    TiendauserComponent,
    PeticioncatalogouserComponent,
    DashboardUserComponent,
    FooterComponent, 
    ChartsAdminComponent, 
    CatalogoAdminComponent, 
    TiendaAdminComponent, 
    CabeceraComponent, 
    TablaCatalogoComponent, 
    BlogAdminComponent,
    TiendaAdminLinkComponent, 
    AjustesAdminLinkComponent, AjustesAdminComponent, PedidosAdminComponent, ClientesAdminComponent, CuponesAdminComponent, PagosAdminComponent, TemasAdminComponent, CorreoAdminComponent, EnvioAdminComponent, ProductosAdminComponent, MimancolistapublicaPageComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    RouterModule,
    CommonModule,
    CarouselModule,
    NgbAccordionModule,
    NgbNavModule,
    MaterialModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  exports : [
    SidebarComponent, FooterComponent
  ],
  providers: [authInterceptorProviders,{provide:APP_BASE_HREF,useValue:'/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
