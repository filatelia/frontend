import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../services/rest.service'
import {PaisesAll, SelectPais} from '../../../models/paises.interface'
import {CatalogoCompleto} from '../../../models/catalogo.interface'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
   
   datospaises:any =[];
  datoscatalogo: CatalogoCompleto[] = [];
  api = environment.conect_url;

  constructor(private rest: RestService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // cargar todos los catalogos

    this.mostrarDatosCatalogo();
    this.mostrarDatosPais();

  }

  mostrarDatosCatalogo(){
        
    this.rest.getAllCatalogo().subscribe(data =>{

      console.log("catalogo recibido: ", data);


     this.datoscatalogo =data;

        
     for (let index = 0; index < this.datoscatalogo.length; index++) {
      const element = this.datoscatalogo[index];
    
      if(!this.datospaises.includes.call(arguments, element.Pais)){
        this.datospaises[index].pais = element.Pais;
        console.log("this.datospaises", this.datospaises);
        

      }
      
    }    


   })


  }
  mostrarDatosPais(){
console.log("En paises");

    this.datoscatalogo;
    console.log("en pasieses datos catalogo", this.datoscatalogo);
    
    for (let index = 0; index < this.datoscatalogo.length; index++) {
      const element = this.datoscatalogo[index];
    
      if(!this.datospaises.includes.call(arguments, element.Pais)){
        this.datospaises[index].pais = element.Pais;
        console.log("this.datospaises", this.datospaises);
        

      }
      
    }    

  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  

}
