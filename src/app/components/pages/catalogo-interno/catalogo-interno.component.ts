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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  data_variantes:any=[];
  catalog:any={}
  public rangeAnio: any=[
    {
      start:1800,
      end:1849,
      estampillas:0,
      active:false,
      data:[]
    },
    {
      start:1850,
      end:1899,
      estampillas:0,
      active:false,
      data:[]
    },
    {
      start:1900,
      end:1949,
      estampillas:0,
      active:false,
      data:[]
    },
    {
      start:1950,
      end:1999,
      estampillas:0,
      active:false,
      data:[]
    },
    {
      start:2000,
      end:1999,
      estampillas:0,
      active:false,
      data:[]
    }
  ]
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
  
  anios:any='';
  tema:any ={};
  params:any ={};
  pagesArray:any=[];
  search: any='';
  start: number=0;
  end: number=0;

  id_catalogo: any='';
  constructor(
    private tokenInterceptorService: TokenInterceptorService,
    private rest: RestService,
    private route: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal

  ) {}
  openVerticallyCentered(content : any) {
    this.modalService.open(content, { centered: true,size: 'lg', windowClass: "modal__admin"});

  }
  ngOnInit(): void {
    //tipo_busqueda
    this.getParams()
    this.verLogeo();
    
  }
  getCatalogo(type:any,id:any){
    this.rest.getCatalogoPaisTema(type,id).subscribe(
      (resp:any)=>{
        if(resp.ok)this.id_catalogo=resp.msg
      }
    )
  }
  openVariantes(content : any,data:any){
    console.log(data)
    this.data_variantes=data
    this.openVerticallyCentered(content)
  }
  getParams(){
    this.buscarPais = this.route.snapshot.paramMap.get('pais')||'/peru';
    this.route.queryParamMap.subscribe((params:any)=>{
      this.params=params.params
      this.queryType();
      this.page=this.params.page||1
    })
  }
  verLogeo() {

    const user = this.tokenInterceptorService.getUser();

    if (user.ok) {
      this.isLoggedIn = true;

    } else {

    }
  }
  queryType(){
    switch(this.params.type){
      case "pais":
        this.buscarPorPais();
        break;
      case "tema":
        this.buscarPorTema();
        break;
    }
  }
  buscarPorTema(){
    this.rest.getSelectTema(this.buscarPais).subscribe((resp:any) =>{
      this.tema=resp.data
      this.getCatalogo('tema',this.tema.uid)
      this.buscarCatalogo();
    });
  }
  buscarPorPais(){
    this.rest.getSelectPais(this.buscarPais).subscribe(data =>{
      this.pais=data
      this.getCatalogo('pais',this.pais.uid)
      this.buscarCatalogo();
    });
  }
  
  buscarCatalogo(){
    this.dataCatalog =[];
    
    this.rest.getSelectCatalogPais(this.pais.uid||'',this.tema.uid||'',this.page,12,this.anios,this.search,this.start,this.end).subscribe((res:any) =>{
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

  
  buscarCatalogoAnio(index:number,start:number,end:number){
    if(end==-1){
      end=new Date().getFullYear();
    }
    // this.rangeAnio.forEach((element:any,i:number)=>{
    //   if(i==index){
    //     element.active=true
    //   }
    //   else{
    //     element.active=false
    //   }
    // })
    this.rest.getSelectCatalogAnio(start,end,this.pais.uid||'',this.tema.uid||'').subscribe((resp:any) =>{
        var {start,end,total,data}=resp
        this.rangeAnio[index].start=start;
        this.rangeAnio[index].end=end;
        this.rangeAnio[index].estampillas=total;
        this.rangeAnio[index].data=data;
        
    });
  }
  modalOpen(data:any,type=''){
    
    if(type=='all'){
      let modalData={
        open:true,
        all:true,
        data:data.data,
      }
      console.log(modalData)
      this.dataMancoSelected=modalData;
    }
    else if(type=='catalog'){
      let modalData={
        open:true,
        catalog:true,
        data: {
          id_catalogo:this.id_catalogo,
        },
      }
      this.dataMancoSelected=modalData;
    }
    else{
      data.open=true;
      this.dataMancoSelected=data;
    }
  }
  grupoCatalogo(){
    var anio=0;
    var sum=10
    var increment=0

    this.datoscatalogo=this.datoscatalogo.sort((a:any, b:any) => Number(a.ANIO) -Number(b.ANIO) )
    this.datoscatalogo.forEach((element:any)=>{
        if(anio==0){
            anio=Number(element.ANIO);
            this.dataCatalog.push({
              "Anio":Number(element.ANIO),
              Inicio:anio,
              Final: Number(anio)+Number(sum),
              TITULO_DE_LA_SERIE: element.TITULO_DE_LA_SERIE,
              Descripcion: '',
              Cantidad: 1,
              data:[
                element,
              ]
            });
            this.dataAnio.push(anio)
            this.checkedAnio(element);

        }
        else{
          anio=Number(element.ANIO);
          console.log(anio)

          var dataAnio=this.dataCatalog.findIndex((el:any)=>el.TITULO_DE_LA_SERIE==element.TITULO_DE_LA_SERIE)
          // var dataAnio=this.dataCatalog.findIndex((el:any)=>(Number(element.ANIO)>=Number(el.Inicio)&&Number(element.ANIO)<=Number(el.Final))&&el.TITULO_DE_LA_SERIE==element.TITULO_DE_LA_SERIE)
          if(dataAnio!=-1){
            this.dataCatalog[dataAnio].Cantidad=this.dataCatalog[dataAnio].Cantidad+1;
            this.dataCatalog[dataAnio].data.push(element);
  
            this.checkedAnio(element);
          }
          else{
            this.dataCatalog.push({
              "Anio":Number(element.ANIO),
              Inicio:anio,
              Final: Number(anio)+Number(sum),
              TITULO_DE_LA_SERIE: element.TITULO_DE_LA_SERIE,
              Descripcion: '',
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
  async searchAnios(data:any){
    var anios:any=[]
    var i=0

    this.page=1
    data.forEach((element:any)=>{
      if(element.active){
        anios.push(element.anio)
      }
    })
    this.anios=JSON.stringify(anios)
    this.buscarCatalogo();
    // await this.dataAnioSearch.forEach((element:any) => {
    //   if(element.active){
    //     var search=this.datos.filter((e:any)=>element.Anio==e.Anio);
    //     data.push(...search)
    //     i++;
    //   }
    // });
    // if(i!=0){
    //   this.dataAnio=[]
    //   this.dataCatalog=[]
    //   this.datoscatalogo=data
    //   this.grupoCatalogo()
    // }
    // else{
    //   this.dataAnio=[]
    //   this.dataCatalog=[]
    //   this.datoscatalogo=this.datos
    //   this.grupoCatalogo()
    // }
  }
  searchAnioRange(data:any){
    this.start=0;
    this.end=0;
    if(data.active){
      this.start=data.start;
      this.end=data.end;
      this.buscarCatalogo()
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
