import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
@Component({
  selector: 'app-peticioncatalogo-user',
  templateUrl: './peticioncatalogouser.component.html',
  styleUrls: ['./peticioncatalogouser.component.scss']
})
export class PeticioncatalogouserComponent implements OnInit {
  form: FormGroup;
  response: any={loading:false}
  dataCatalogo: any=[
    
  ]
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
      nombre:new FormControl('',[Validators.required,Validators.minLength(5)]),
      pais:new FormControl('',[Validators.required,Validators.minLength(3)]),
      valor:new FormControl('',[Validators.required,Validators.minLength(1)]),
    });
  }

  onResetForm(){
    this.router.navigate(['/user/dashboard/catalogo']);
    this.form.reset();
  }
  updateValue(){
    return{
      catalogo_nombre:this.nombre?.value,
      pais:this.pais?.value,
      valor_catalogo:this.valor?.value
    }
  }
  get nombre(){return this.form.get('nombre')}
  get pais(){return this.form.get('pais')}
  get valor(){return this.form.get('valor')}

}
