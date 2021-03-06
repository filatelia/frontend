import { Component, OnInit } from '@angular/core';
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  active=true;
  constructor(private tokenInterceptorService: TokenInterceptorService) { }

  ngOnInit(): void {
    this.checkedRoute();
  }
  checkedRoute(){
    var location=window.location.href;
    if(location.includes("admin/dashboard")){
      this.active=false
    }
  }
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roleuser: string[] = [];

  IsLogin():void{
    this.isLoggedIn = !!this.tokenInterceptorService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenInterceptorService.getUser(); 
      //console.log(user);
      this.roleuser = user.role;
      console.log(this.roleuser)


    }
  }
}
