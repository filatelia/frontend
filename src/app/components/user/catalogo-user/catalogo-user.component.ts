import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-catalogo-user',
  templateUrl: './catalogo-user.component.html',
  styleUrls: ['./catalogo-user.component.scss']
})
export class CatalogoUserComponent implements OnInit {
  activePage: any='catalog';
  catalogo: any={};
  dataCatalogo: any=[]
  constructor(
    private router:Router,
    private restService:RestService,
  ) { }

  ngOnInit(): void {
      this.listar()
  }
  listar(){
    this.restService.getMyCatalog({}).subscribe(
      (res:any)=>{
        // var data=res.todas_solicitudes.map(()=> {index:if, value:})
        this.dataCatalogo=res.catalogo
        if(this.dataCatalogo.length==0) this.activePage='peticion'
        else this.activePage='catalog'
      },
      (err:any)=>{
        console.log(err)
      }
    )
    
  }
  publicCatalog(data:any){
      this.catalogo=data
      this.activePage="upload"
  }
  viewStatus(id:any){
    
  }
}
