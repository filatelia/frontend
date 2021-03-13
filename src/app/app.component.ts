import { Component, OnInit } from '@angular/core';

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

  constructor(private tokenInterceptorService: TokenInterceptorService) { }


  ngOnInit(){
    this.IsLogin();
   
  }
  
  IsLogin():void{
    this.isLoggedIn = !!this.tokenInterceptorService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenInterceptorService.getUser(); 
      //console.log(user);
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



