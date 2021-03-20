import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  private roleuser: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showClientBoard = false;
  name?: string;
  public isCollapse= false

  constructor(private tokenInterceptorService: TokenInterceptorService,
    private router: Router) {
    console.log("estamos en el contructor de cabecera");

  }

  ngOnInit(): void {
    this.verLogeo();
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


