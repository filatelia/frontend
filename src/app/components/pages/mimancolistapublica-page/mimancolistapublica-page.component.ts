import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mimancolistapublica-page',
  templateUrl: './mimancolistapublica-page.component.html',
  styleUrls: ['./mimancolistapublica-page.component.scss']
})
export class MimancolistapublicaPageComponent implements OnInit {
  id_user: string='';
  api = environment.conect_url;

  public datoscatalogo: any = [];
  public usuario: any = {};

    
    constructor(private sanitizer: DomSanitizer,private route:Router,private restService: RestService,private activateRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.id_user = this.activateRoute.snapshot.paramMap.get('id_user')||'/';
    this.buscarMancoLista()
  }
  buscarMancoLista(){
    
    this.restService.getMancolistaPublic(this.id_user).subscribe(resp =>{
        var {msg}=resp;

       
        this.addLista(msg);
        this.datoscatalogo=msg
    },(err=>{

    }));

  }
  addLista(data:any){
    this.datoscatalogo=data;
    this.usuario=data[0].id_usuario;
  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

}
