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
    this.mostrarDatosCatalogo();
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
  mostrarDatosCatalogo(){
        
    this.rest.getAllCatalogo().subscribe(data =>{

       this.datoscatalogo =data;
       for (let index = 0; index < this.datoscatalogo.length; index++) {
        const element = this.datoscatalogo[index];
        this.mostrarDatosTema(element)
        var isPais=this.datospaises.find((el:any)=>el.Pais._id==element.Pais._id)
        if(!isPais){
          console.log(element)
          // this.datospaises[index].pais = element.Pais;
          this.datospaises.push(element)
        }

      
    }    


   })


  }
  mostrarDatosPais(){

    this.datoscatalogo;
    
    for (let index = 0; index < this.datoscatalogo.length; index++) {
      const element = this.datoscatalogo[index];
    
      if(!this.datospaises.includes.call(arguments, element.Pais)){
        this.datospaises[index].pais = element.Pais;
        

      }
      
    }    

  }
  mostrarDatosTema(element:any){
     var tema=this.datosTema.find((el:any)=>el.ParaBuscar==element.Tema.ParaBuscar);
     if(!tema){
        this.datosTema.push(element.Tema)
     }
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  

}
