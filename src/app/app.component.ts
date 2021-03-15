import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenInterceptorService } from './services/token-interceptor.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit{

  private roleuser: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showClientBoard = false;
  name?: string;

  constructor(private tokenInterceptorService: TokenInterceptorService,
    private router: Router, ) {
   
   }


  ngOnInit(){
    console.log("ngOnInit");
    this.IsLogin();
    
   
  }
  
  IsLogin(){

    const getToken = this.tokenInterceptorService.getToken();
    console.log("resultado de islogin f:", getToken);
    

    if (getToken != null) {
      this.isLoggedIn = true;
      const user = this.tokenInterceptorService.getUser(); 
      console.log("User ->",user);
      this.roleuser = user.role;
      console.log(this.roleuser)

      this.showAdminBoard = this.roleuser.includes('admin');
      this.showClientBoard = this.roleuser.includes('cliente');

      this.name = user.name;
    }
  }

  logout(): void {
    this.tokenInterceptorService.signOut();
    window.location.reload();
  }
  


  title = 'filatelia';

  
}



