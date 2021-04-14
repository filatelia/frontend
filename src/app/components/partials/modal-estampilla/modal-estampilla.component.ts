import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-estampilla',
  templateUrl: './modal-estampilla.component.html',
  styleUrls: ['./modal-estampilla.component.scss']
})
export class ModalEstampillaComponent implements OnInit {
  @Input() catalogo: string='';
  @Input() back: Boolean=false;
  @Output() activePage =new EventEmitter();
  image:any=null;
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
  form2: FormGroup;
  form3: FormGroup;
  constructor() {
    this.form=this.createFormGroup1()
    this.form2=this.createFormGroup2()
    this.form3=this.createFormGroup3()

  }
  ngOnInit(): void {
  }
  registrar(){
    
    console.log(this.updateValue())
  }
  createFormGroup1(){
    return new FormGroup({
      anio:new FormControl('',[Validators.required,Validators.minLength(1)]),
      tipo:new FormControl('',[Validators.required,Validators.minLength(1)]),
      grupo:new FormControl('',[]),
      categoria:new FormControl('',[Validators.required,Validators.minLength(1)]),

    });
  }
  createFormGroup2(){
    return new FormGroup({
      numero_estampilla:new FormControl('',[]),
      descripcion_estampilla:new FormControl('',[]),
      numero_catalogo:new FormControl('',[]),
      titulo_serie:new FormControl('',[Validators.required,Validators.minLength(1)]),
    });
  }
  createFormGroup3(){
    return new FormGroup({
      valor_facial:new FormControl('',[Validators.required,Validators.minLength(1)]),
      valor_nuevo:new FormControl('',[]),
      tipo_moneda:new FormControl('',[Validators.required,Validators.minLength(1)]),
      valor_usado:new FormControl('',[]),
      moneda_valor:new FormControl('',[]),
    });
  }
  addImages(event:any){
    this.image=event.target.files[0]
  }
  updateValue(){
    var form=new FormData();
    form.append('catalofo',this.catalogo)
    form.append('tipo',this.tipo?.value)
    form.append('categoria',this.categoria?.value)
    form.append('grupo',this.grupo?.value)
    form.append('anio',this.anio?.value)
    form.append('numero_estampilla',this.numero_estampilla?.value)
    form.append('descripcion_estampilla',this.descripcion_estampilla?.value)
    form.append('numero_catalogo',this.numero_catalogo?.value)
    form.append('titulo_serie',this.titulo_serie?.value)
    form.append('valor_facial',this.valor_facial?.value)
    form.append('valor_nuevo',this.valor_nuevo?.value)
    form.append('tipo_moneda',this.tipo_moneda?.value)
    form.append('valor_usado',this.valor_usado?.value)
    form.append('moneda_valor',this.moneda_valor?.value)
    form.append('estampillaFile',this.image)
    return form;
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

  get tipo(){return this.form.get('tipo')}
  get categoria(){return this.form.get('categoria')}
  get grupo(){return this.form.get('grupo')}
  get anio(){return this.form.get('anio')}

  get numero_estampilla(){return this.form2.get('numero_estampilla')}
  get descripcion_estampilla(){return this.form2.get('descripcion_estampilla')}
  get numero_catalogo(){return this.form2.get('numero_catalogo')}
  get titulo_serie(){return this.form2.get('titulo_serie')}
  
  get valor_facial(){return this.form3.get('valor_facial')}
  get valor_nuevo(){return this.form3.get('valor_nuevo')}
  get tipo_moneda(){return this.form3.get('tipo_moneda')}
  get valor_usado(){return this.form3.get('valor_usado')}
  get moneda_valor(){return this.form3.get('moneda_valor')}

}
