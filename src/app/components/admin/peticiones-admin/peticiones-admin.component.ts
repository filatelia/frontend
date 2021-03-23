import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-peticiones-admin',
  templateUrl: './peticiones-admin.component.html',
  styleUrls: ['./peticiones-admin.component.scss']
})
export class PeticionesAdminComponent implements OnInit {
  form: FormGroup;
  id_solicitud: string='';
  response: any={loading:false}
  dataCatalogo: any=[
    
  ]
    constructor(private router:Router,private modalService: NgbModal,private restService:RestService) {
      this.form=this.createFormGroup()
    }

  ngOnInit(): void {
    this.listar()
  }
  openVerticallyCentered(content : any) {
    this.modalService.open(content, { centered: true, windowClass: "modal__admin"});

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
  validar(data:any,type:string){
    if(type=='accept'){
      this.restService.estadoSolicitudCatalogo({id_solicitud:data}).subscribe((resp)=>{
        this.message_alert('success','solicitud aceptada')
        this.listar()
      },
      (er)=>{
        this.message_alert('error','Ocurrio un error inesperado')
      });
    }
    else if(type==''){
        this.id_solicitud=data
    }
    else if(type=='dennied'){
      var {message}=this.updateValue()
      this.restService.estadoSolicitudCatalogo({id_solicitud:this.id_solicitud,mensaje_rechazo:message}).subscribe((resp)=>{
        if(resp.ok){
          this.message_alert('success','solicitud rechazada')
          this.listar()
              
        }
        else{
          this.message_alert('error',resp.msg)
        }
      },
      (er)=>{
        this.message_alert('error','Ocurrio un error inesperado')
      });
    }
  }
  message_alert(type:any,message:any){
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
  redirect(id:any){
    this.router.navigate(['/admin/dashboard/catalogo-seleccionado/'+id]);
  }

  createFormGroup(){
    return new FormGroup({
      message:new FormControl('',[Validators.required,Validators.minLength(1)]),
    });
  }
  updateValue(){
    return{
      message:this.message?.value,
    }
  }
  get message(){return this.form.get('message')}

}
