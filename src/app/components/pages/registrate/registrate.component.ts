import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.scss']
})
export class RegistrateComponent implements OnInit {
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  createFormGroup(){
    return new FormGroup({
      email:new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern(this.emailPattern)]),
      name:new FormControl('',[Validators.required,Validators.minLength(3)]),
      password:new FormControl('',[Validators.required,Validators.minLength(6)]),
      password_confirm:new FormControl('',[Validators.required,Validators.minLength(6)]),
    })
  }
  public registerForm: FormGroup;
  constructor() {
    this.registerForm=this.createFormGroup()
  }

  ngOnInit(): void {
  }

  registrar(){
    var email=this.registerForm.value.email
    var password=this.registerForm.value.password
    var password_confirm=this.registerForm.value.password_confirm

    console.log(this.registerForm.value)
  }

  onResetForm(){
    this.registerForm.reset();
  }

}
