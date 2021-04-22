import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-estampilla',
  templateUrl: './modal-estampilla.component.html',
  styleUrls: ['./modal-estampilla.component.scss']
})
export class ModalEstampillaComponent implements OnInit {
  @Input() catalogo: string='';
  @Input() data: any=null;
  
  @Input() back: Boolean=false;
  @Output() activePage =new EventEmitter();
  @Output() changeData =new EventEmitter();
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
    this.checkValue()
  }
  async checkValue(){
    await setTimeout(()=>{},1000)
    if(!this.data) return
    this.tipo=this.data.TIPO;
    this.anio=this.data.ANIO;
    this.categoria=this.data.CATEGORIA;
    this.grupo=this.data.GRUPO;

    this.numero_estampilla=this.data.NRO_ESTAMPILLAS;
    this.descripcion_estampilla=this.data.DESCRIPCION_ESTAMPILLA;
    this.titulo_serie=this.data.TITULO_DE_LA_SERIE;
    this.numero_catalogo=this.data.NUMERO_DE_CATALOGO;

    this.valor_facial=this.data.VALOR_FACIAL;
    this.tipo_moneda=this.data.TIPO_MONEDA_VALOR_FACIAL;
    this.valor_nuevo=this.data.VALOR_CATALOGO_NUEVO;
    this.valor_usado=this.data.VALOR_DEL_CATALOGO_USADO;
    this.moneda_valor=this.data.MONEDA_VALOR_CATALOGO_NUEVO_USADO;
    this.image=this.data.FOTO_ESTAMPILLAS.imagen_url
    this.id_estampilla=this.data.uid
  }
  closeVerticallyCentered() {
    this.modalService.dismissAll();
  }
  registrarError(): void{
    if(!this.form4.valid) return;
    this.response.loading=true;
    var data=this.updateValueError();
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
    
    if(this.id_estampilla!='') this.update(data)
    else this.store(data)
  }
  update(data:any){
    this.restservice.updateEstampilla(data).subscribe(
      ((resp:any)=>{
        this.response.loading=false;
        this.response=resp;
        if(resp.ok){
          this.id_estampilla=resp.msg.uid
          this.response.msg="Estampilla actualizada"
          this.message('success', this.response.msg)
          setTimeout(()=>{
            this.response.msg=""
            this.closeVerticallyCentered()
          },1000)
          this.changeData.emit(resp)
        }
      }),
      ((err:any)=>{
        this.response.loading=false;
  
      })
    )
  }
  store(data:any){
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
            this.changeData.emit(resp)
          },1000)
          
        }
      }),
      ((err:any)=>{
        this.response.loading=false;
  
      })
    )
  }
  message(type:any,message:any){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: type,
      title: message,
    }).then(
      result=>{
        if(result.dismiss === Swal.DismissReason.timer){


        }
        
      }
    );
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
    form.append('idEstampilla',this.id_estampilla)
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
  set tipo(value:any) {  this.form.get('tipo')?.setValue(value||'') };

  get categoria(){return this.form.get('categoria')}
  set categoria(value:any) {  this.form.get('categoria')?.setValue(value||'') };

  get grupo(){return this.form.get('grupo')}
  set grupo(value:any) {  this.form.get('grupo')?.setValue(value||'') };

  get anio(){return this.form.get('anio')}
  set anio(value:any) {  this.form.get('anio')?.setValue(value||'') };


  get numero_estampilla(){return this.form2.get('numero_estampilla')}
  set numero_estampilla(value:any) {  this.form2.get('numero_estampilla')?.setValue(value||'') };

  get descripcion_estampilla(){return this.form2.get('descripcion_estampilla')}
  set descripcion_estampilla(value:any) {  this.form2.get('descripcion_estampilla')?.setValue(value||'') };

  get numero_catalogo(){return this.form2.get('numero_catalogo')}
  set numero_catalogo(value:any) {  this.form2.get('numero_catalogo')?.setValue(value||'') };

  get titulo_serie(){return this.form2.get('titulo_serie')}
  set titulo_serie(value:any) {  this.form2.get('titulo_serie')?.setValue(value||'') };

  
  get valor_facial(){return this.form3.get('valor_facial')}
  set valor_facial(value:any) {  this.form3.get('valor_facial')?.setValue(value||'') };

  get valor_nuevo(){return this.form3.get('valor_nuevo')}
  set valor_nuevo(value:any) {  this.form3.get('valor_nuevo')?.setValue(value||'') };

  get tipo_moneda(){return this.form3.get('tipo_moneda')}
  set tipo_moneda(value:any) {  this.form3.get('tipo_moneda')?.setValue(value||'') };

  get valor_usado(){return this.form3.get('valor_usado')}
  set valor_usado(value:any) {  this.form3.get('valor_usado')?.setValue(value||'') };

  get moneda_valor(){return this.form3.get('moneda_valor')}
  set moneda_valor(value:any) {  this.form3.get('moneda_valor')?.setValue(value||'') };



  get descripcion_error(){return this.form4.get('descripcion_error')}
  set descripcion_error(value:any) {  this.form4.get('descripcion_error')?.setValue(value||'') };
  
}
