import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../services/rest.service'
import {PaisesAll, SelectPais} from '../../../models/paises.interface'
import {CatalogoCompleto} from '../../../models/catalogo.interface'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
   
   datospaises:any []=[];
  datoscatalogo: CatalogoCompleto[] = [];
  api = environment.conect_url;

  constructor(private rest: RestService, private sanitizer: DomSanitizer,
    private router: Router) { }

  ngOnInit(): void {
    // cargar todos los catalogos

    this.mostrarDatosCatalogo();

  }
  buscar(name:string){
    console.log("name", name);
    this.router.navigate(['/catalogo-interna']);

  }
  mostrarDatosCatalogo(){
        
    this.rest.getAllCatalogo().subscribe(data =>{

      console.log("catalogo recibido: ", data);



       var datosPre: CatalogoCompleto[] = []; ;
     for (let index = 0; index < data.length; index++) {
      const element = data[index];
    
      if(!datosPre.find(res=> res.Pais.name == element.Pais.name)){
      datosPre.push(element);

        console.log("resultado datos paises:->", this.datospaises.includes(element.Pais));
        

        console.log("element pais", element.Pais);
        
  
  
  
        console.log("this.datospaises", datosPre);
        

      }else{
        console.log("resultado datos paises en else......:->", datosPre.includes(element));

      }
      this.datoscatalogo = datosPre;
      
    }    


   })


  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  

}
