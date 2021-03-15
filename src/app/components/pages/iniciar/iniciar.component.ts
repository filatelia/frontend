import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';
import Swal from 'sweetalert2';
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
    
  
    constructor(private authService: AuthService,
      private router: Router, 
      private tokenStorage: TokenInterceptorService) { }
  
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
            if(data.ok){

              
              this.tokenStorage.saveToken(data.token);
              this.tokenStorage.saveUser(data);
      
              this.isLoginFailed = false;
              this.isLoggedIn = true;
              const usuarioBD = this.tokenStorage.getUser();
              this.roleuser = usuarioBD.role;

              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Bienvenido '+ this.tokenStorage.getUser().name
              }).then(
                result=>{
                  if(result.dismiss === Swal.DismissReason.timer){


                  }
                  
                }
              );

              //Como se logró el login, se redirige. 
              if (usuarioBD.role == "admin" ) {
                this.router.navigate(['/admin/dashboard']);
                
              } else {
                this.router.navigate(['/user/dashboard']);
                
              }



            }else{
              Swal.fire(
                '¡Uuuups...!',
                'Correo o contraseña erronea',
                'error'
              )
            }
  
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
  
