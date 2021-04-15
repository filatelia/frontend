import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-reporte',
  templateUrl: './modal-reporte.component.html',
  styleUrls: ['./modal-reporte.component.scss']
})
export class ModalReporteComponent implements OnInit {

  
  constructor(private modalService: NgbModal,private cd: ChangeDetectorRef,private restservice:RestService) { }
  isCreate: boolean=false;
  descripcion: string='';
  user:any={};
  static modal: any={};
  ngOnInit(): void {
    this.user=this.recuvaStorage()
  }
  refresh() {
    this.cd.detectChanges();
  }
  static dataUpdate(data:any){
    console.log(data)
  }
  close(){
    this.modalService.dismissAll()
  }
  recuvaStorage(){
    var data=localStorage.getItem('data_reporte');
    var parse=JSON.parse(data||'')
    return parse;
  }
  saved(){
      try{
        var data=localStorage.getItem('data_reporte');
        var parse=JSON.parse(data||'')
        this.saveReporte(parse);
        this.modalService.dismissAll()
      }
      catch($e){

      }
  }
  saveReporte(data:any){
    
    var body={
      apodo_us_reportado:data.nickname,
      razones_reporte:this.descripcion
    };
    this.restservice.saveReporte(body).subscribe((res:any) =>{
       if(res.ok){
        this.message('success', "Reportado")
       }
      },
      (err)=>{
        
      }
    );
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
