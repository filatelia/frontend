import { Component, SimpleChanges, Input, OnChanges, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from 'src/app/services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-mancolista',
  templateUrl: './modal-mancolista.component.html',
  styleUrls: ['./modal-mancolista.component.scss']
})
export class ModalMancolistaComponent implements   OnInit {

  constructor(private modalService: NgbModal,private cd: ChangeDetectorRef,private restservice:RestService) { }
  isCreate: boolean=false;
  name: string='';
  listradio: string='';
  dataMancoList:any=[];
  static modal: any={};
  ngOnInit(): void {
    this.list()
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
  saved(){
      try{
        var data=localStorage.getItem('data_manco');
        var parse=JSON.parse(data||'')
        this.addMancoLista({id_estampilla:parse.uid||parse._id,id_manco_list:this.listradio})
        this.modalService.dismissAll()
      }
      catch($e){

      }
  }
  list(){
    this.restservice.getMancoListCat().subscribe(
      (resp)=>{
        this.dataMancoList=resp.data
      },
      (err)=>{
        console.log(err);
      }
    )
  }
  createManco(){

    this.restservice.createMancoLista({name:this.name}).subscribe(
      (resp)=>{
        this.isCreate=false;
        this.list()
      },
      (err)=>{

      }
    );
  }
  addMancoLista(data:any){
    this.restservice.addMancolista(data).subscribe((res:any) =>{
        console.log(res)
        this.message('success', res.msg=='eliminado'?res.msg: "Agregado a mi mancolista")
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
