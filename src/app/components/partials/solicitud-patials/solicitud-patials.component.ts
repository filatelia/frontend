import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
@Component({
  selector: 'app-solicitud-patials',
  templateUrl: './solicitud-patials.component.html',
  styleUrls: ['./solicitud-patials.component.scss']
})
export class SolicitudPatialsComponent implements OnInit {

  @Input() back: Boolean=false;
  @Output() activePage =new EventEmitter();
  
  form: FormGroup;
  response: any={loading:false}
  dataCatalogo: any=[
    
  ]
  paisValue= new FormControl('');
  timaticaValue= new FormControl('');


  loading_tema: boolean=false;
  user_exist: boolean=false;
  user_info: any={};

  id_pais= '';
  id_tema= '';

  dataTipo: any=[];
  constructor(private restService:RestService, private router: Router) {
    this.form=this.createFormGroup()
  }

  ngOnInit(): void {
    this.listarTipo();
  }
  listarTipo(){
    this.restService.getTipoCatalogo().subscribe((res:any)=>{
      this.dataTipo=res.tipo_catalogos;
    },
    (err: any)=>{

    });
  }
  registrar(){
    if(!this.form.valid) return;
    this.response.loading=true
    var data=this.updateValue()
    this.restService.createSolicitud(data).subscribe(
      (res:any)=>{
        this.response=res
        this.response.loading=false
        this.onResetForm()
        
      },
      (err:any)=>{
        this.response=err
        this.response.loading=false
      }
    )
  }

  redirect(id:any){
      
  }
  viewStatus(id:any){

  }
  createFormGroup(){
    return new FormGroup({
      nombre:new FormControl('',[Validators.required,Validators.minLength(3)]),
      pais:new FormControl('',[]),
      tipo_catalogo: new FormControl('',[Validators.required,Validators.minLength(1)]),
      timatica: new FormControl('',[]),
    });
  }
  backPage(){
      this.activePage.emit('catalog')
  }
  onResetForm(){
    location.reload();
    this.form.reset();
  }
  select(data:any){
    
    switch(this.tipo_catalogo?.value){
      case 'Temático':
          this.timaticaValue.setValue(data.name);
          this.form.controls['timatica'].setValue(data.name);
          this.id_tema=data.uid
          this.searchTema(data.ParaBuscar);
        break;
      case 'País':
        this.paisValue.setValue(data.name);
        this.id_pais=data.para_buscar
        this.searchPais(data.uid);
        break;
        
    }
  }
  searchPais(data:any){
    this.loading_tema=true;
    this.restService.getVerificarPais(data).subscribe((resp:any)=>{
      this.loading_tema=false;
      if(resp.msg===true) this.user_exist=false
      else {
        this.user_exist=true
        this.user_info=resp.msg
      }
    },
    (err:any)=>{
      this.loading_tema=false;
    });
    
  }
  searchTema(data:any){
    this.loading_tema=true;
    this.restService.getVerificarTema(data).subscribe((resp:any)=>{
      this.loading_tema=false;
      if(resp.msg===true) this.user_exist=false
      else {
        this.user_exist=true
        this.user_info=resp.msg
      }
    },
    (err:any)=>{
      this.loading_tema=false;
    });
    
  }
  resetbtn(){
      this.user_exist=false;
  }
  updateValue(){
    
    return{
      nombre_catalogo_solicitud:this.nombre?.value,
      tipo_catalogo_solicitud:this.dataTipo.find((el:any)=>el.name==this.tipo_catalogo?.value).uid,
      timatica:this.nombre?.value,
      pais_catalogo_solicitud:this.id_pais,
      tema_catalogo_solicitud:this.timatica?.value,
      valor_catalogo:''
    }
  }
  get nombre(){return this.form.get('nombre')}
  get pais(){return this.form.get('pais')}
  get tipo_catalogo(){return this.form.get('tipo_catalogo')}
  get timatica(){return this.form.get('timatica')}
  set timatica(value){
    this.form.controls['timatica'].setValue(value);
  }


}
