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
import { CatalogointernoAdminComponent } from './components/admin/catalogointerno-admin/catalogointerno-admin.component';
import { PeticionesAdminComponent } from './components/admin/peticiones-admin/peticiones-admin.component';
import { SubastaPagesComponent } from './components/pages/subasta-pages/subasta-pages.component';
import { PeticioncatalogouserComponent } from './components/user/peticioncatalogo-user/peticioncatalogouser.component';
import { NotifyComponent } from './components/notify/notify.component';
import { CatalogoUserComponent } from './components/user/catalogo-user/catalogo-user.component';
import { SearchPaisesComponent } from './components/partials/search-paises/search-paises.component';
import { SearchTypeComponent } from './components/partials/search-type/search-type.component';
import { SolicitudPatialsComponent } from './components/partials/solicitud-patials/solicitud-patials.component';
import { CabeceraAdminComponent } from './components/admin/cabecera-admin/cabecera-admin.component';
import { ModalMancolistaComponent } from './components/partials/modal-mancolista/modal-mancolista.component';
import { ModalComponent } from './components/partials/modal/modal.component';
import { ChatAdminComponent } from './components/admin/chat-admin/chat-admin.component';
import { NgSimpleSidebarModule } from 'ng-simple-sidebar';

import { MessagePartialsComponent } from './components/partials/message-partials/message-partials.component';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';
import { ModalEstampillaComponent } from './components/partials/modal-estampilla/modal-estampilla.component';
import { ModalReporteComponent } from './components/partials/modal-reporte/modal-reporte.component';
import { ExporterService } from './services/exporter.service';
import { SubastaDetalleComponent } from './components/pages/subasta-detalle/subasta-detalle.component';
import { TiendaDetalleComponent } from './components/pages/tienda-detalle/tienda-detalle.component';
import { ReporteComponent } from './components/admin/reporte/reporte.component';
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
    DashboardUserComponent,
    FooterComponent, 
    ChartsAdminComponent, 
    CatalogoAdminComponent, 
    TiendaAdminComponent, 
    CabeceraComponent, 
    TablaCatalogoComponent, 
    BlogAdminComponent,
    TiendaAdminLinkComponent, 
    CatalogointernoAdminComponent,
    PeticioncatalogouserComponent,
    AjustesAdminLinkComponent, 
    AjustesAdminComponent, 
    PedidosAdminComponent, 
    ClientesAdminComponent, 
    CuponesAdminComponent, 
    PagosAdminComponent, 
    TemasAdminComponent, 
    CorreoAdminComponent, 
    EnvioAdminComponent, 
    ProductosAdminComponent, 
    MimancolistapublicaPageComponent, 
    CatalogointernoAdminComponent, 
    PeticionesAdminComponent, 
    SubastaPagesComponent, 
    NotifyComponent, CatalogoUserComponent, 
    SearchPaisesComponent, SearchTypeComponent, 
    SolicitudPatialsComponent,CabeceraAdminComponent, 
    ModalMancolistaComponent, ModalComponent,
    ChatAdminComponent,
    MessagePartialsComponent,
    ModalEstampillaComponent,
    ModalReporteComponent,
    SubastaDetalleComponent,
    TiendaDetalleComponent,
    ReporteComponent,
  ],
  imports: [
    NgSimpleSidebarModule,
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
    ReactiveFormsModule,
  ],
  exports : [
    SidebarComponent, FooterComponent
  ],
  providers: [authInterceptorProviders,{provide:APP_BASE_HREF,useValue:'/'},WebsocketService,ChatService,ExporterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
