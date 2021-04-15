import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  id_estampilla: any=''
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
      },
      {
        'title':"4",
        'active':false,
      }
  ];
  form: FormGroup;
  form2: FormGroup;
  form3: FormGroup;
  form4: FormGroup;
  constructor(private modalService: NgbModal,private restservice:RestService) {
    
    this.form=this.createFormGroup1()
    this.form2=this.createFormGroup2()
    this.form3=this.createFormGroup3()
    this.form4=this.createFormGroup4()

  }
  ngOnInit(): void {
  }
  closeVerticallyCentered() {
    this.modalService.dismissAll();
  }
  registrarError(): void{
    if(!this.form4.valid) return;
    this.response.loading=true;
    var data=this.updateValueError();
    console.log(data)
    this.restservice.agregarErrorEstampilla(data).subscribe(
      ((resp:any)=>{
        this.response=resp
        if(resp.ok){
          this.response.msg="Varrientes errores creada"
          this.response.loading=false;
          setTimeout(()=>{
            this.closeVerticallyCentered()
          },2000)
        }
      }),
      ((err:any)=>{
        this.response.loading=false;
  
      })
    )
  }
  registrar(){
    if(!this.form3.valid) return;
    this.response.loading=true;
    var data=this.updateValue();
    console.log(data)
    this.restservice.agregarEstampilla(data).subscribe(
      ((resp:any)=>{
        this.response.loading=false;
        this.response=resp;
        if(resp.ok){
          this.id_estampilla=resp.msg.uid
          this.response.msg="Estampilla creada"
          setTimeout(()=>{
            this.response.msg=""
            this.next(3)
          },1000)
        }
      }),
      ((err:any)=>{
        this.response.loading=false;
  
      })
    )
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
  createFormGroup4(){
    return new FormGroup({
      descripcion_error:new FormControl('',[Validators.required,Validators.minLength(1)]),
      foto:new FormControl('',[]),
    });
  }
  addImages(event:any){
    this.image=event.target.files[0]
  }
  updateValue(){
    var form=new FormData();
    form.append('CATALOGO',this.catalogo)
    form.append('TIPO',this.tipo?.value)
    form.append('CATEGORIA',this.categoria?.value)
    form.append('GRUPO',this.grupo?.value)
    form.append('ANIO',this.anio?.value)
    form.append('NRO_ESTAMPILLAS',this.numero_estampilla?.value)
    form.append('DESCRIPCION_ESTAMPILLA',this.descripcion_estampilla?.value)
    form.append('NUMERO_DE_CATALOGO',this.numero_catalogo?.value)
    form.append('TITULO_DE_LA_SERIE',this.titulo_serie?.value)
    form.append('VALOR_FACIAL',this.valor_facial?.value)
    form.append('VALOR_CATALOGO_NUEVO',this.valor_nuevo?.value)
    form.append('TIPO_MONEDA_VALOR_FACIAL',this.tipo_moneda?.value)
    form.append('VALOR_DEL_CATALOGO_USADO',this.valor_usado?.value)
    form.append('MONEDA_VALOR_CATALOGO_NUEVO_USADO',this.moneda_valor?.value)
    form.append('estampillaFile',this.image)
    return form;
  }
  updateValueError(){
    var form=new FormData();
    form.append('id_estampilla',this.id_estampilla)
    form.append('Descripcion',this.descripcion_error?.value)
    form.append('variantesFile',this.image)
    return form;
  }
  next(index:number){
    switch(index){
      case 1:
        if(this.form.valid){
          this.tabactive(index)
        }
        break;
      case 2:
        if(this.form2.valid){
          this.tabactive(index)
        }
        break;
      case 3:
        this.tabactive(index)
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

  get descripcion_error(){return this.form4.get('descripcion_error')}

  
}
