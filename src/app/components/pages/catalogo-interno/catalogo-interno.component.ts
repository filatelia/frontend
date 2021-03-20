import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RestService } from 'src/app/services/rest.service';
import {PaisesAll, SelectPais} from '../../../models/paises.interface'
import { CatalogoCompleto } from 'src/app/models/catalogo.interface';
import { element } from 'protractor';

@Component({
  selector: 'app-catalogo-interno',
  templateUrl: './catalogo-interno.component.html',
  styleUrls: ['./catalogo-interno.component.scss']
})
export class CatalogoInternoComponent implements OnInit {
  public pais: PaisesAll={};
  public datoscatalogo: CatalogoCompleto[] = [];
  public dataAnio: any=[];
  public  buscarPais ='';
  public dataCatalog: any=[];
  constructor(
    private rest: RestService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}
  ngOnInit(): void {
    //tipo_busqueda
    this.buscarPais = this.route.snapshot.paramMap.get('pais')||'/peru';
    this.buscarPorPais();
    this.buscarCatalogo();
  }
  buscarPorPais(){
    this.rest.getSelectPais(this.buscarPais).subscribe(data =>{
      this.pais=data
    });
  }
  
  buscarCatalogo(){
    
    this.rest.getSelectCatalogPais(this.buscarPais).subscribe(data =>{
        this.datoscatalogo =data;
        this.grupoCatalogo()
    });

  }

  grupoCatalogo(){
    var anio=0;
    var sum=10
    var increment=0
    this.datoscatalogo.forEach((element)=>{
        if(element.Pais.para_buscar!=this.buscarPais) return;
        if(anio==0){
            anio=element.Anio;
            this.dataCatalog.push({
              "Anio":element.Anio,
              Inicio:anio,
              Final: anio+sum,
              Descripcion_de_la_serie: element.Descripcion_de_la_serie,
              Descripcion: element.Descripcion,
              Cantidad: increment+1,
              data:[
                element,
              ]
            });
            this.dataAnio.push(anio)
        }
        else{
          anio=element.Anio;
          var dataAnio=this.dataCatalog.findIndex((el:any)=>element.Anio>=el.Inicio&&element.Anio<=el.Final)
          if(dataAnio!=-1){
            this.dataCatalog[dataAnio].data.push(element);
          }
          else{
            this.dataCatalog.push({
              "Anio":element.Anio,
              Inicio:anio,
              Final: anio+sum,
              Descripcion_de_la_serie: element.Descripcion_de_la_serie,
              Descripcion: element.Descripcion,
              Cantidad: increment+1,
              data:[
                element,
              ]
            });
            this.dataAnio.push(anio)
          }
        }

        
    })
  }
  // anioCatalogo(){
  //   this.datoscatalogo.forEach((element)=>{
  //     if(element.Pais.anio!=this.buscarPais) return;
  //   })
  // }

}
