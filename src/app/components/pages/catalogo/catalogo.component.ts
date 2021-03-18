import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../services/rest.service'
import {PaisesAll, SelectPais} from '../../../models/paises.interface'
import {CatalogoCompleto} from '../../../models/catalogo.interface'

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {
   
  datospaises: any;
  datoscatalogo: CatalogoCompleto[] = [];

  constructor(private rest: RestService) { }

  ngOnInit(): void {
    // cargar todos los catalogos

this.mostrarDatosPais();
  }

  mostrarDatosCatalogo(){
        
    this.rest.getAllCatalogoAdmin(1).subscribe(data =>{

      console.log("catalogo recibido: ", data);

      this.datoscatalogo =data;

    
      
     // Al recibir un array, se deben pasar todos los elementos
   console.log("lista: "+this.datoscatalogo) 

   })
  }
  mostrarDatosPais(){

    this.mostrarDatosCatalogo();
        
    this.rest.getSelectPais("Colombia").subscribe(data =>{

      console.log("pais recibido: ", data);

      this.datospaises =data;

    
      
     // Al recibir un array, se deben pasar todos los elementos
   console.log("lista: "+this.datospaises) 

   })
  }
  

}
