import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-estampilla',
  templateUrl: './modal-estampilla.component.html',
  styleUrls: ['./modal-estampilla.component.scss']
})
export class ModalEstampillaComponent implements OnInit {
  @Input() back: Boolean=false;
  @Output() activePage =new EventEmitter();

  response:any={}
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
  form: FormGroup;
  constructor() {
    this.form=this.createFormGroup()

  }
  ngOnInit(): void {
  }
  registrar(){

  }
  createFormGroup(){
    return new FormGroup({
      pais:new FormControl('',[Validators.required,Validators.minLength(1)]),
      codigo:new FormControl('',[Validators.required,Validators.minLength(4)]),
      anio:new FormControl('',[Validators.required,Validators.minLength(4)]),
      tema:new FormControl('',[Validators.required,Validators.minLength(1)]),
      numero_estampilla:new FormControl('',[Validators.required,Validators.minLength(4)]),
      descripcion_serie:new FormControl('',[Validators.required,Validators.minLength(4)]),
      descripcion:new FormControl('',[]),
      numero_catalogo:new FormControl('',[Validators.required,Validators.minLength(4)]),
      tipo:new FormControl('',[Validators.required,Validators.minLength(1)]),
      foto:new FormControl('',[Validators.required,Validators.minLength(1)]),

    });
  }

  next(index:number){
    switch(index){
      case 1:
        this.tabactive(index)
        break;
      case 2:
        // if(this.form.valid){
          this.tabactive(index)
        // }
        
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
  backPage(){
      this.activePage.emit('catalog')
  }
  get descripcion(){return this.form.get('descripcion')}
  get pais(){return this.form.get('pais')}
  get codigo(){return this.form.get('codigo')}
  get anio(){return this.form.get('anio')}
  get tema(){return this.form.get('tema')}
  get numero_estampilla(){return this.form.get('numero_estampilla')}
  get descripcion_serie(){return this.form.get('descripcion_serie')}
  get numero_catalogo(){return this.form.get('numero_catalogo')}
  get tipo(){return this.form.get('tipo')}
  get foto(){return this.form.get('foto')}

}
