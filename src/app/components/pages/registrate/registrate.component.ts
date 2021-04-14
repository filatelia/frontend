import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-registrate',
  templateUrl: './registrate.component.html',
  styleUrls: ['./registrate.component.scss']
})
export class RegistrateComponent implements OnInit {
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  response: any={loading:false}
  
  registerForm: FormGroup;
  registerForm1: FormGroup;
  registerForm2: FormGroup;
  tabViews: any=[
      {
        'title':"1",
        'active':true,
      },
      {
        'title':"2",
        'active':false,
      },
      {
        'title':"3",
        'active':false,
      }
  ];

  paisValue= new FormControl('');
  timaticaValue= new FormControl('');
  paisSearchValue= new FormControl('');
  
  id_pais= '';
  id_tema= '';

  dataTipo: any=[
  ];
  dataPaises:any=[]
  dataTema:any=[]
  
  catalogo_pais=false;
  catalogo_tema=false;
  constructor(private router: Router,private restService:RestService, private formBuilder: FormBuilder,private authService:AuthService) {
    this.registerForm=this.createFormGroup();
    this.registerForm1=this.createForm1Group();
    this.registerForm2=this.createForm2Group();
    
  }

  ngOnInit(): void {
    this.listarTipo()
  }
  
  createForm1Group(){
    return this.formBuilder.group({
        pais:new FormControl('',[Validators.required,Validators.minLength(3)]),
        name:new FormControl('',[Validators.required,Validators.minLength(3)]),
        apellidos:new FormControl('',[Validators.required,Validators.minLength(3)]),
        fecha_nacimiento:new FormControl('',[Validators.required,Validators.minLength(8)]),
      },
    );
  }
  createForm2Group(){
    return this.formBuilder.group({
          tipo_catalogo: new FormControl('',[]),
          timatica: new FormControl('',[]),
          pais_search: new FormControl('',[]),
      },
    );
  }
  createFormGroup(){
    return this.formBuilder.group({
        email:new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern(this.emailPattern)]),
        nickname:new FormControl('',[Validators.required,Validators.minLength(6)]),
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
  async registrar(){
    console.log(this.registerForm)
    if(this.registerForm.valid){
      this.response.loading=true
      var data=await this.updateValue()
      this.authService.register(data).subscribe(res=>{
          this.onResetForm()
          res.msg=res.msg?res.msg:"Usuario creado ya puedes ingresar a nuestra plataforma"
          this.response=res
          this.response.loading=false
          setTimeout(()=>{
              this.router.navigate(['/auth/login'])
          },3000)
      },
      (err)=>{
        err.msg=err.msg?err.msg:"Error desconocido vuelve a ingresar su correo y contraseña"
        this.response.loading=false
        this.response=err
        
      }
      )
    }else{
    }
  }
  listarTipo(){
    this.restService.getTipoCatalogo().subscribe((res:any)=>{
      this.dataTipo=res.tipo_catalogos;
    },
    (err: any)=>{

    });
  }
  selectPais(data:any){
    this.paisValue.setValue(data.name);
    this.id_pais=data.para_buscar
  }
  checkedType(){
      
      this.dataTipo.forEach((element:any)=>{
          if(element.name=='País'){
            this.catalogo_pais=element.active
            if(element.active==false) this.dataPaises=[]
          }
          else if(element.name=='Temático'){
            this.catalogo_tema=element.active
            if(element.active==false) this.dataTema=[]
          }
      })
  }
  select(data:any,type=''){
    
    if(this.catalogo_tema&&type=='tema'){
      this.timaticaValue.setValue(data.name);
      this.registerForm2.controls['timatica'].setValue(data.name);
      this.dataTema.push({name:data.name,uid:data.uid})
    }
    else if(this.catalogo_pais&&type=='pais'){
      this.paisSearchValue.setValue('');
      this.dataPaises.push({name:data.name,uid:data.uid})
    }
  }
  removeCollect(index:number,type=''){
    var val=""
    if(this.catalogo_tema&&type=='tema'){
        this.dataTema.splice(index,1)
    }
    if(this.catalogo_pais&&type=='pais'){
        this.dataPaises.splice(index,1)
    }
  }
  onResetForm(){
    this.registerForm.reset();
  }
  async updateValue(){

    var pais:any=[];
    await this.dataPaises.forEach((element:any) => {
        pais.push(element.uid)
    });
    var temas:any=[]
    await this.dataTema.forEach((element:any) => {
      temas.push(element.uid)
  });
    return{
      email:this.email?.value,
      name:this.name?.value,
      password:this.password?.value,
      apellidos:this.apellidos?.value,
      nickname:this.nickname?.value,
      pais_usuario:this.pais?.value,
      fecha_nacimiento:this.fecha_nacimiento?.value,
      tipo_catalogo:this.dataTipo.filter((el:any)=>el.active==true),
      paises_coleccionados:pais,
      temas:temas,
    }
  }

  get email(){return this.registerForm.get('email')}
  get password(){return this.registerForm.get('password')}
  get password_confirm(){return this.registerForm.get('password_confirm')}
  get nickname(){return this.registerForm.get('nickname')}
  

  get apellidos(){return this.registerForm1.get('apellidos')}
  get name(){return this.registerForm1.get('name')}
  get pais(){return this.registerForm1.get('pais')}
  get fecha_nacimiento(){return this.registerForm1.get('fecha_nacimiento')}
  
  get tipo_catalogo(){return this.registerForm2.get('tipo_catalogo')}
  get timatica(){return this.registerForm2.get('timatica')}
  get pais_search(){return this.registerForm2.get('pais_search')}
  
  next(index:number){
    switch(index){
      case 1:
        if(this.registerForm1.valid){
          this.tabactive(index)
        }
        break;
      case 2:
        if(this.registerForm2.valid){
          this.tabactive(index)
        }
        
        break;
      case 2:
        break;
    }
  }
  tabactive(index:number){

    this.tabViews.forEach((element:any,i:number) => {
      if(index==i) element.active=true;
      else element.active=false;
    });
    
  }
}
