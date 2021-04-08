import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';
import Swal from 'sweetalert2';
import 'sidebarjs/lib/sidebarjs.css';

@Component({
  selector: 'app-cabecera-admin',
  templateUrl: './cabecera-admin.component.html',
  styleUrls: ['./cabecera-admin.component.scss']
})
export class CabeceraAdminComponent {

 
  private roleuser: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showClientBoard = false;
  name?: string;
  public isCollapsed = false;
  public isCollapse= false

  constructor(private tokenInterceptorService: TokenInterceptorService,
    private router: Router,
    private rest: RestService,
    private _activatedRoute: ActivatedRoute, 
    ) {
    console.log("estamos en el contructor de cabecera");

  }

  ngOnInit(): void {
    this.verLogeo();
    this._activatedRoute.paramMap.subscribe((params: ParamMap) => {
        console.log("params================")
        console.log(params)
    })

  }
  

  //Funciones
  verLogeo() {
    console.log("verificado logueo");

    const user = this.tokenInterceptorService.getUser();
    console.log("user", user);

    if (user.ok) {
      console.log("Logueo correcto");
   
      this.isLoggedIn = true;
      this.roleuser = user.role;
      this.name = user.name;
      if(user.role == "admin"){
        this.showAdminBoard = true;
      }else{
        this.showClientBoard = true;
      }

    } else {
      console.log("NO logueo ");

    }
  }

  logout(): void {
    this.tokenInterceptorService.signOut();
    //this.reloadPage();


  }
  toggleState():void { // manejador del evento
        let foo = this.isCollapse;
        this.isCollapse = foo === false ? true : false; 
    }
    reloadPage(){
      window.location.href ="/";
    }
}

