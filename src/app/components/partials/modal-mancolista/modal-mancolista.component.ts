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
  deleteActive: boolean=false;
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
        if(parse.all){
          for (let index = 0; index < parse.data.length; index++) {
            const element = parse.data[index];
            this.addMancoListaAll({id_estampilla:element.uid||parse._id,id_manco_list:this.listradio})
            
          }
          this.message('success', "Agregado a mi mancolista")
        }
        else{
          this.addMancoLista({id_estampilla:parse.uid||parse._id,id_manco_list:this.listradio})
        }
        this.modalService.dismissAll()
      }
      catch($e){
          console.error($e)
      }
  }
  updateValue(){
    var data=localStorage.getItem('data_manco');
    var parse=JSON.parse(data||'')
    return parse;
    // if(parse.all){
    //   for (let index = 0; index < parse.data.length; index++) {
        
        
    //   }
    // }
  }
  async checkedMancoList(id:any){
    var data_stamp=await this.updateValue();

    
    if(data_stamp.all){
      return;
    }
    var id_estampilla=data_stamp.uid
    this.restservice.checkedMancoListCat({id_categoria_estampilla:id_estampilla,id_estampilla:id}).subscribe(
      (resp)=>{
        if(resp.ok) this.deleteActive=true;
        else  this.deleteActive=false;
      },
      (err)=>{
        console.log(err);
        this.deleteActive=false;

      }
    )
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
  addMancoListaAll(data:any){
    this.restservice.addMancolista(data).subscribe((res:any) =>{
      },
      (err)=>{
        
      }
    );
  }
  addMancoLista(data:any){
    this.restservice.addMancolista(data).subscribe((res:any) =>{
       this.message('success',res.estampilla_eliminada?'Eliminado': "Agregado a mi mancolista")
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
