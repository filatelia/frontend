import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MacolistaListPublic } from 'src/app/models/mancolista.interface';
import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mancolista',
  templateUrl: './mancolista.component.html',
  styleUrls: ['./mancolista.component.scss']
})
export class MancolistaComponent implements OnInit {
  dataMancoLista: any=[];
  usuario: any={};
  api = environment.conect_url;
  constructor(private restService: RestService,private sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
    this.getMancoLista()
  }
  async getMancoLista() {
      this.restService.getMyAllMancolista().subscribe((resp:any)=>{
        this.dataMancoLista.push(resp.msg.id_estampilla)
        this.usuario=resp.msg.id_usuario
      });
  }
  
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
 
  copyLink(){

    var value=this.usuario._id;
    var {host,protocol}=window.location
    var domain=`${protocol}://${host}/mancolista/${value}`
    this.copyTextClipBoard(domain);
    this.message('success','Enlace copiado  ya puedes compartir')
  }
  copyTextClipBoard(text:any){
      if(!navigator.clipboard){
          return;
      }
      navigator.clipboard.writeText(text)
      .then(()=>{
          
      })
      .catch(err=>{
          
      })
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
