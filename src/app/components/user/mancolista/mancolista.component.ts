import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MacolistaListPublic } from 'src/app/models/mancolista.interface';
import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Clipboard } from '@angular/cdk/clipboard';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-mancolista',
  templateUrl: './mancolista.component.html',
  styleUrls: ['./mancolista.component.scss']
})
export class MancolistaComponent implements OnInit {
  dataMancoSelected:any=[]
  mancolista: any=[]
  dataMancoLista:any=[];
  usuario: any={};
  name: string='';
  createForm: boolean=false;
  status: string='';
  api = environment.conect_url;
  constructor(
    private clipboard: Clipboard,
    private restService: RestService,private sanitizer: DomSanitizer,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getMancoLista()
  }
  async getMancoLista() {
      this.restService.getMyAllMancolista().subscribe((resp:any)=>{
        this.addLista(resp.msg);
      });
  }
  selectedMancolLista(data:any){
    this.restService.getMancolistaSelected(data.uid).subscribe((resp:any)=>{
      this.mancolista=resp.data;
     
     
    });
  }
  openVerticallyCentered(content : any) {
    this.modalService.open(content, { centered: true, windowClass: "modal__admin"});

  }
  
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  addLista(data:any){
    this.dataMancoLista=data;
    this.selectedMancolLista(data[0])
    this.usuario=data[0].id_usuario;
  }
  addMancoLista(data:any){
    console.log(data)
    this.restService.addMancolista(data).subscribe((res:any) =>{
        this.getMancoLista();
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
          icon: 'success',
          title: res.estampilla_eliminada?'Eliminado': "Actualizado"
        }).then(
          result=>{
            if(result.dismiss === Swal.DismissReason.timer){
  
  
            }
            
          }
        );
      },
      (err)=>{
        
      }
    );
  }
  deleteMancolista(data:any){
    this.addMancoLista({id_estampilla:data.id_estampilla._id})
  }
  changeStatus(data:any){
    this.addMancoLista({id_estampilla:data.id_estampilla._id,estado_estampilla:data.estado_estampilla})
  }
  copyLink(id:any){

    var value=id;
    var {host,protocol}=window.location
    var domain=`${protocol}://${host}/mancolista/${value}`
    this.copyTextClipBoard(domain);
    this.message('success','Enlace copiado  ya puedes compartir')
  }
  copyTextClipBoard(text:any){
    this.clipboard.copy(text);
  }
  modalOpen(data:any){
    data.open=true;
    this.dataMancoSelected=data;
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
  createManco(){
    
    if(this.name.trim()=='') {
      this.message('error', "Agregue un nombre a tu colección")
      return;
    }
    this.restService.createMancoLista({name:this.name}).subscribe(
      (resp)=>{
        this.message('success', "Colección nueva creada")
        this.createForm=false;
        this.getMancoLista()
      },
      (err)=>{

      }
    );
  }
  
  deleteManco(id:string){
    
    if(id.trim()=='') {
      this.message('error', "Selecciona una colección para eliminar")
      return;
    }
    this.restService.deleteMancoLista({uid:id,isdelete:true}).subscribe(
      (resp)=>{
        this.message('success', "Colección eliminada")
        this.createForm=false;
        this.getMancoLista()
      },
      (err)=>{

      }
    );
  }
  updateManco(id:string, name: string){
    
    if(name.trim()=='') {
      this.message('error', "Agregue un nombre a tu colección")
      return;
    }
    this.restService.updateMancoLista({uid:id,name:name}).subscribe(
      (resp)=>{
        this.message('success', "Colección actualizada")
        this.createForm=false;
        this.getMancoLista()
      },
      (err)=>{

      }
    );
  }
  editColection(data:any){
    data.edit=true;
  }
  cancelColection(data:any){
    data.edit=false;
  }
}
