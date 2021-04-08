import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RestService } from 'src/app/services/rest.service';
import {PaisesAll, SelectPais} from '../../../models/paises.interface'
import { CatalogoCompleto } from 'src/app/models/catalogo.interface';
import { element } from 'protractor';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';

@Component({
  selector: 'app-catalogo-interno',
  templateUrl: './catalogo-interno.component.html',
  styleUrls: ['./catalogo-interno.component.scss']
})
export class CatalogoInternoComponent implements OnInit {
  public pais: PaisesAll={};
  public datoscatalogo: CatalogoCompleto[] = [];
  public datos: CatalogoCompleto[] = [];
  public dataAnio: any=[];
  public dataAnioSearch: any=[];
  public  buscarPais ='';
  public dataCatalog: any=[];
  dataMancoSelected: any={};
  api = environment.conect_url;
  isLoggedIn = false;

  page:number =1;
  current:number =0;
  pages:number =0;
  pageFirst:number =0;
  pageLast:number =0;


  params:any ={};
  pagesArray:any=[];
  constructor(
    private tokenInterceptorService: TokenInterceptorService,
    private rest: RestService,
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer

  ) {}
  ngOnInit(): void {
    //tipo_busqueda
    this.getParams()
    this.verLogeo();
  }
  getParams(){
    this.buscarPais = this.route.snapshot.paramMap.get('pais')||'/peru';
    this.route.queryParamMap.subscribe((params:any)=>{
      this.params=params.params
      this.buscarPorPais();
      this.page=this.params.page||1
    })
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
  buscarPorPais(){
    this.rest.getSelectPais(this.buscarPais).subscribe(data =>{
      this.pais=data
      this.buscarCatalogo();
    });
  }
  
  buscarCatalogo(){
    this.dataCatalog =[];
    
    this.rest.getSelectCatalogPais(this.pais.uid||'','',this.page,12).subscribe((res:any) =>{
        let {data,current,pages}=res
        this.datoscatalogo =data;
        this.datos =data;
        this.current=current
        this.pages=pages

        this.pageFirst=(current>3?current-2:1)
        var i=this.pageFirst;
        this.pagesArray=[]
        for(;i<=(current+2)&& i <=this.pages;i++){
          this.pagesArray.push({
            page:i
          })
        }
        window.scrollTo( 0, 0 );
        this.grupoCatalogo()
    });

  }
  buscarCatalogoAnio(start:number,end:number){
    if(end==-1){
      end=new Date().getFullYear();
    }
    this.rest.getSelectCatalogAnio(start,end).subscribe((data:any) =>{
        this.dataCatalog =[];
        this.datos =data.catalogoPorPais;
        this.datoscatalogo =data.catalogoPorPais;
        this.grupoCatalogo()
    });

  }
  modalOpen(data:any){
    data.open=true;
    this.dataMancoSelected=data;
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
              Cantidad: 1,
              data:[
                element,
              ]
            });
            this.dataAnio.push(anio)
            this.checkedAnio(element);

        }
        else{
          anio=element.Anio;
          var dataAnio=this.dataCatalog.findIndex((el:any)=>element.Anio>=el.Inicio&&element.Anio<=el.Final)
          if(dataAnio!=-1){
            
            this.dataCatalog[dataAnio].Cantidad=this.dataCatalog[dataAnio].Cantidad+1;
            this.dataCatalog[dataAnio].data.push(element);

            this.checkedAnio(element);
          }
          else{
            this.dataCatalog.push({
              "Anio":element.Anio,
              Inicio:anio,
              Final: anio+sum,
              Descripcion_de_la_serie: element.Descripcion_de_la_serie,
              Descripcion: element.Descripcion,
              Cantidad: 1,
              data:[
                element,
              ]
            });
            this.dataAnio.push(anio)
            this.checkedAnio(element);

          }
        }

        
    })
  }
  checkedAnio(element:any){
    var i=this.dataAnioSearch.findIndex((e:any)=>e.Anio==element.Anio);
    if(i==-1){
      this.dataAnioSearch.push({
        Anio:element.Anio,
        active:false,
      })
    }
  }
  async searchAnios(){
    var data:any=[]
    var i=0
    await this.dataAnioSearch.forEach((element:any) => {
      if(element.active){
        var search=this.datos.filter((e:any)=>element.Anio==e.Anio);
        data.push(...search)
        i++;
      }
    });
    if(i!=0){
      this.dataAnio=[]
      this.dataCatalog=[]
      this.datoscatalogo=data
      this.grupoCatalogo()
    }
    else{
      this.dataAnio=[]
      this.dataCatalog=[]
      this.datoscatalogo=this.datos
      this.grupoCatalogo()
    }
  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
 
  
  // anioCatalogo(){
  //   this.datoscatalogo.forEach((element)=>{
  //     if(element.Pais.anio!=this.buscarPais) return;
  //   })
  // }

}
