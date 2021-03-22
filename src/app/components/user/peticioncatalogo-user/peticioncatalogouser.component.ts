import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
@Component({
  selector: 'app-peticioncatalogo-user',
  templateUrl: './peticioncatalogouser.component.html',
  styleUrls: ['./peticioncatalogouser.component.scss']
})
export class PeticioncatalogouserComponent implements OnInit {
  form: FormGroup;
  
  constructor(private restService:RestService) {
    this.form=this.createFormGroup()
  }

  ngOnInit(): void {
  }
  registrar(){
    if(!this.form.valid) return;
    var data=this.updateValue()
    this.restService.createSolicitud(data).subscribe(
      (res:any)=>{
        console.log(res)
      },
      (err:any)=>{
        console.log(err)
      }
    )
  }
  createFormGroup(){
    return new FormGroup({
      nombre:new FormControl('',[Validators.required,Validators.minLength(5)]),
      pais:new FormControl('',[Validators.required,Validators.minLength(3)]),
      valor:new FormControl('',[Validators.required,Validators.minLength(1)]),
    });
  }

  updateValue(){
    return{
      nombre:this.nombre?.value,
      pais:this.pais?.value,
      valor:this.valor?.value
    }
  }
  get nombre(){return this.form.get('nombre')}
  get pais(){return this.form.get('pais')}
  get valor(){return this.form.get('valor')}

}
