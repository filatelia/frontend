import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';

@Component({
  selector: 'app-mimancolistapublica-page',
  templateUrl: './mimancolistapublica-page.component.html',
  styleUrls: ['./mimancolistapublica-page.component.scss']
})
export class MimancolistapublicaPageComponent implements OnInit {
  id_user: string='';
  api = environment.conect_url;
  dataMancoSelected:any=[]
  isLoggedIn = false;

  public datoscatalogo: any = [];
  public usuario: any = {};

    
    constructor(private tokenInterceptorService: TokenInterceptorService,private sanitizer: DomSanitizer,private route:Router,private restService: RestService,private activateRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.id_user = this.activateRoute.snapshot.paramMap.get('id_user')||'/';
    this.buscarMancoLista()
  }
  verLogeo() {

    const user = this.tokenInterceptorService.getUser();

    if (user.ok) {
      this.isLoggedIn = true;

    } else {

    }
  }
  buscarMancoLista(){
    
    this.restService.getMancolistaPublic(this.id_user).subscribe(resp =>{
        var {msg,mancolista}=resp;

       
        this.addLista(mancolista);
        this.datoscatalogo=msg
    },(err=>{

    }));

  }
  addLista(data:any){
    this.usuario=data.id_usuario;
  }
  
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  modalOpen(data:any){
    data.open=true;
    this.dataMancoSelected=data;
  }
}
