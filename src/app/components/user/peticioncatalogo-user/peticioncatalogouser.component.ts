import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
@Component({
  selector: 'app-peticioncatalogo-user',
  templateUrl: './peticioncatalogouser.component.html',
  styleUrls: ['./peticioncatalogouser.component.scss']
})
export class PeticioncatalogouserComponent implements OnInit {
  @Input() back: Boolean=false;
  @Output() activePage =new EventEmitter();
  form: FormGroup;
  response: any={loading:false}
  dataCatalogo: any=[
    
  ]
  paisValue= new FormControl('');
  para_buscar:string='';

  constructor(private restService:RestService, private router: Router) {
    this.form=this.createFormGroup()
  }

  ngOnInit(): void {
  }
  registrar(){
    if(!this.form.valid) return;
    this.response.loading=true
    var data=this.updateValue()
    this.restService.createSolicitud(data).subscribe(
      (res:any)=>{
        this.response=res
        this.response.loading=false
        console.log(res)
        this.onResetForm()
        
      },
      (err:any)=>{
        this.response=err
        this.response.loading=false
        console.log(err)
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
      pais:new FormControl('',[Validators.required,Validators.minLength(1)]),
      valor:new FormControl('',[]),
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
    this.paisValue.setValue(data.name);
    this.para_buscar=data.para_buscar
  }
  updateValue(){
    return{
      catalogo_nombre:this.nombre?.value,
      pais:this.para_buscar,
      valor_catalogo:this.valor?.value
    }
  }
  get nombre(){return this.form.get('nombre')}
  get pais(){return this.form.get('pais')}
  get valor(){return this.form.get('valor')}

}
