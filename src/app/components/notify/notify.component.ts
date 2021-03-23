import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {
  isLoggedIn = false;
  private roleuser: string = '';
  dataNotify: any=[]
  constructor(private tokenInterceptorService: TokenInterceptorService,
    private restService:RestService
    ) { }

  ngOnInit(): void {
    this.verLogeo();
  }
  verLogeo() {
    console.log("verificado logueo");

    const user = this.tokenInterceptorService.getUser();
    console.log("user", user);

    if (user.ok) {
      console.log("Logueo correcto");
   
      this.isLoggedIn = true;
      this.roleuser = user.role;
      this.checkedList();
      console.log(this.roleuser)

    } else {
      console.log("NO logueo ");

    }
  }
  checkedList(){
    if(this.roleuser=='client') return;
    this.getSolicitud();
  }
  getSolicitud(){
    this.restService.getSolicitudCatalogo({}).subscribe(
      (res:any)=>{
        this.dataNotify=res.todas_solicitudes
      },
      (err:any)=>{
        console.log(err)
      }
    )
  }


}
