import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-iniciar',
  templateUrl: './iniciar.component.html',
  styleUrls: ['./iniciar.component.scss'],
  providers: [AuthService]
  })
  export class IniciarComponent implements OnInit {
    private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    response: any={loading:false}
    isLoggedIn = false;
    
    errorMessage = '';
    roleuser: string[] = [];
    loginForm: FormGroup;
    
  
    constructor(private authService: AuthService,
      private router: Router, 
      private tokenStorage: TokenInterceptorService) {
        this.loginForm=this.createFormGroup()
      }
  
      ngOnInit(): void {
        if (this.tokenStorage.getToken()) {
          this.isLoggedIn = true;
          this.roleuser = this.tokenStorage.getUser().roleuser;
        }
      }
      createFormGroup(){
        return new FormGroup({
          email:new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern(this.emailPattern)]),
          password:new FormControl('',[Validators.required,Validators.minLength(6)]),
        });
      }
      onSubmit(){
          //extraer datos
        if(!this.loginForm.valid) return;
        this.response.loading=true

          var {password,email}=this.updateValue()

          this.authService.login(email, password).subscribe(
            data => {
            if(data.ok){

              data.msg=data.msg?data.msg:"Bienvenido..."
              this.response=data
              this.response.loading=false
              
              this.tokenStorage.saveToken(data.token);
              this.tokenStorage.saveUser(data);
      
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
              } 
              else {
                window.location.href="/user/dashboard"
              }



            }else{
              Swal.fire(
                '¡Uuuups...!',
                'Correo o contraseña erronea',
                'error'
              )
            }
  
            },
            (err) => {
              console.log(err.error.msg)
              err.msg=err.error.msg?err.error.msg:"El correo ya existe"
              this.response.loading=false
              this.response=err
      
             // console.log("email"+email, "Password"+password);
            }
          );
      }
    

    reloadPage(): void {
      window.location.href ="/";
    }
    updateValue(){
      return{
        email:this.email?.value,
        password:this.password?.value
      }
    }
    get email(){return this.loginForm.get('email')}
    get password(){return this.loginForm.get('password')}
  }
  
