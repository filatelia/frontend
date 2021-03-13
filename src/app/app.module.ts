import {HttpClientModule} from '@angular/common/http'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MaterialModule} from './modules/material/material.module'
import { CommonModule } from '@angular/common';
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
import { ConfiguracionCatalogoComponent } from './components/admin/anio-catalogo/configuracion-catalogo.component';
import { PaisCatalogoComponent } from './components/admin/pais-catalogo/pais-catalogo.component';
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
import { DashboardAdminCrudComponent } from './components/admin/dashboard-admin-crud/dashboard-admin-crud.component';
import { ChartsAdminComponent } from './components/admin/charts-admin/charts-admin.component';
import { CatalogoAdminComponent } from './components/admin/catalogo-admin/catalogo-admin.component';

@NgModule({
  declarations: [
    
    AppComponent, 
    DashboardAdminComponent,  
    SidebarComponent, 
    ConfiguracionCatalogoComponent, 
    PaisCatalogoComponent,
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
    FooterComponent, DashboardAdminCrudComponent, ChartsAdminComponent, CatalogoAdminComponent, TiendaAdminComponent
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
    MaterialModule
  ],
  exports : [
    SidebarComponent, ConfiguracionCatalogoComponent, FooterComponent
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
