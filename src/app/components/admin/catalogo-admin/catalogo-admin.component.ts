import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from 'src/app/services/rest.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-catalogo-admin',
  templateUrl: './catalogo-admin.component.html',
  styleUrls: ['./catalogo-admin.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [animate(300, style({ opacity: 0 }))]),
    ]),
  ],
})

export class CatalogoAdminComponent implements OnInit {
  form: FormGroup;
  response: any={loading:false}
  dataCatalogo: any=[
    
  ]
  constructor(
    private restService:RestService,
    private modalService: NgbModal,
    private router:Router
  ) {
    this.form=this.createFormGroup()

  }
  createFormGroup(){
    return new FormGroup({
      nombre:new FormControl('',[Validators.required,Validators.minLength(5)]),
      pais:new FormControl('',[Validators.required,Validators.minLength(3)]),
      valor:new FormControl('',[]),
    });
  }
  ngOnInit(): void {
    this.listar()
  }
    // cargar todos los catalogos
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
  listar(){
    this.restService.getSolicitudCatalogo({}).subscribe(
      (res:any)=>{
        // var data=res.todas_solicitudes.map(()=> {index:if, value:})
        this.dataCatalogo=res.todas_solicitudes.sort()
      },
      (err:any)=>{
        console.log(err)
      }
    )
    
  }

  

  openVerticallyCentered(content: any) {
    this.modalService.open(content, {
      centered: true,
      windowClass: 'modal__admin',
    });
  }
  openEditCentered(contenido: any) {
    this.modalService.open(contenido, {
      centered: true,
      windowClass: 'modal__admin',
    });
  }
  openlistarCentered(conten: any) {
    this.modalService.open(conten, {
      centered: true,
      windowClass: 'modal__admin',
    });
  }
  validar(data:any,type:string){
    if(type=='accept'){
      this.restService.estadoSolicitudCatalogo({id_solicitud:data}).subscribe((resp)=>{
        this.message('success','solicitud aceptada')
        this.listar()
      },
      (er)=>{
        this.message('error','Ocurrio un error inesperado')
      });
    }
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
  updateValue(){
    return{
      nombre:this.nombre?.value,
      pais:this.pais?.value,
      valor:this.valor?.value
    }
  }
  onResetForm(){
    this.listar()
    this.form.reset();
  }
  redirect(id:any){
    this.router.navigate(['/admin/dashboard/catalogo-seleccionado/'+id]);
  }
  get nombre(){return this.form.get('nombre')}
  get pais(){return this.form.get('pais')}
  get valor(){return this.form.get('valor')}
}

