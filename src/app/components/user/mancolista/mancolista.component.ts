import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MacolistaListPublic } from 'src/app/models/mancolista.interface';
import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-mancolista',
  templateUrl: './mancolista.component.html',
  styleUrls: ['./mancolista.component.scss']
})
export class MancolistaComponent implements OnInit {
  dataMancoLista: any=[];
  usuario: any={};
  status: string='';
  api = environment.conect_url;
  constructor(
    private clipboard: Clipboard,
    private restService: RestService,private sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
    this.getMancoLista()
  }
  async getMancoLista() {
      this.restService.getMyAllMancolista().subscribe((resp:any)=>{
        this.addLista(resp.msg);
       
       
      });
  }
  
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  addLista(data:any){
    this.dataMancoLista=data;
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
  copyLink(){

    var value=this.usuario._id;
    var {host,protocol}=window.location
    var domain=`${protocol}://${host}/mancolista/${value}`
    this.copyTextClipBoard(domain);
    this.message('success','Enlace copiado  ya puedes compartir')
  }
  copyTextClipBoard(text:any){
    this.clipboard.copy(text);
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
}
