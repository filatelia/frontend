import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.scss']
})
export class RegistrateComponent implements OnInit {
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  response: any={loading:false}
  
  registerForm: FormGroup;
  

  constructor(private router: Router, private formBuilder: FormBuilder,private authService:AuthService) {
    this.registerForm=this.createFormGroup();
  }

  ngOnInit(): void {
  }

  createFormGroup(){

    // return new FormGroup({
    //   email:new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern(this.emailPattern)]),
    //   name:new FormControl('',[Validators.required,Validators.minLength(3)]),
    //   password:new FormControl('',[Validators.required,Validators.minLength(6)]),
    //   password_confirm:new FormControl('',[Validators.required,Validators.minLength(6),this.validatePasswordConfirmation]),
    // });
    return this.formBuilder.group({
        email:new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern(this.emailPattern)]),
        name:new FormControl('',[Validators.required,Validators.minLength(3)]),
        password:new FormControl('',[Validators.required,Validators.minLength(6)]),
        password_confirm:new FormControl('',[Validators.required,Validators.minLength(6)]),
      },
      {validator: this.passwordMatchValidator}
    );
  }
  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password')?.value; 
    const confirmPassword: string = control.get('password_confirm')?.value; 
    if (password !== confirmPassword) {
      control.get('password_confirm')?.setErrors({ NoPassswordMatch: true });
    }
  }
  registrar(){
    if(this.registerForm.valid){
      this.response.loading=true
      var {name,password,email}=this.updateValue()
      this.authService.register(name,email,password).subscribe(res=>{
          this.onResetForm()
          res.msg=res.msg?res.msg:"Usuario creado ya puedes ingresar a nuestra plataforma"
          this.response=res
          this.response.loading=false
          setTimeout(()=>{
              this.router.navigate(['/auth/login'])
          },3000)
      },
      (err)=>{
        err.msg=err.msg?err.msg:"Error desconocido vuelve a ingresa su coorreo y contraseña"
        this.response.loading=false
        this.response=err
        
      }
      )
    }else{
    }
  }

  onResetForm(){
    this.registerForm.reset();
  }
  updateValue(){
    return{
      email:this.email?.value,
      name:this.name?.value,
      password:this.password?.value
    }
  }

  get email(){return this.registerForm.get('email')}
  get name(){return this.registerForm.get('name')}
  get password(){return this.registerForm.get('password')}
  get password_confirm(){return this.registerForm.get('password_confirm')}

}
