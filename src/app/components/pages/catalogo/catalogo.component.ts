import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../services/rest.service'
import {PaisesAll, SelectPais} from '../../../models/paises.interface'
import {CatalogoCompleto} from '../../../models/catalogo.interface'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
  isLoggedIn = false;
   
   datospaises:any =[];
  datoscatalogo: CatalogoCompleto[] = [];
  api = environment.conect_url;
  
  datosTema: any []=[]

  constructor(private tokenInterceptorService: TokenInterceptorService,private rest: RestService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // cargar todos los catalogos
    this.mostrarDatosPais();
    this.mostrarDatosTema();
    this.verLogeo();
  }
  verLogeo() {
    console.log("verificado logueo");

    const user = this.tokenInterceptorService.getUser();
    console.log("user", user);

    if (user.ok) {
      console.log("Logueo correcto");
      this.isLoggedIn = true;

    } else {
      console.log("NO logueo ");

    }
  }
  mostrarDatosPais(){
    this.rest.getCatalogoPaises().subscribe((resp: any) =>{
       this.datospaises =resp.data
   })


  }

  mostrarDatosTema(){
     
     this.rest.getAllTemas(1).subscribe((data: any) =>{
        this.datosTema =data.temas;
        console.log(this.datosTema)
    })
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  

}
