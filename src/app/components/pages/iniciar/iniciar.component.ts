import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';

@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.component.html',
  styleUrls: ['./iniciar.component.scss'],
  providers: [AuthService]
  })
  export class IniciarComponent implements OnInit {
    form: any = {
      email: null,
      password: null
    };
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roleuser: string[] = [];
  
    constructor(private authService: AuthService, private tokenStorage: TokenInterceptorService) { }
  
      ngOnInit(): void {
        if (this.tokenStorage.getToken()) {
          this.isLoggedIn = true;
          this.roleuser = this.tokenStorage.getUser().roleuser;
        }
      }
      onSubmit(){
          //extraer datos
          const { email, password } = this.form;

          this.authService.login(email, password).subscribe(
            data => {
              this.tokenStorage.saveToken(data.accessToken);
              this.tokenStorage.saveUser(data);
      
              this.isLoginFailed = false;
              this.isLoggedIn = true;
              this.roleuser = this.tokenStorage.getUser().roleuser;
              this.reloadPage();
            },
            err => {
              this.errorMessage = err.error.message;
              this.isLoginFailed = true;
      
             // console.log("email"+email, "Password"+password);
            }
          );
      }
    

    reloadPage(): void {
      window.location.href ="";
    }
  }
  
