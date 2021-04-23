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
  userUpdate(){
    var data=localStorage.getItem('auth-user');
    var parse=JSON.parse(data||'')
    return parse;
  }
  close(){
    this.modalService.dismissAll()
  }
  async saved(){
      try{
        var user=await this.userUpdate();
        var parse=await this.updateValue();
        if(parse.all){
          var data_is:any=[]
          if(this.deleteActive){
            for (let index = 0; index < parse.data.length; index++) {
              const element = parse.data[index];
              this.addMancoLista({id_estampilla:element.uid||parse._id,id_manco_list:this.listradio,id_usuario:user.uid})    
            }
          }
          else{
            for (let index = 0; index < parse.data.length; index++) {
              const element = parse.data[index];
              data_is.push(element.uid)
            }
            this.addMancoListaAll({ids_estampillas:data_is,id_mancolist_cat:this.listradio,id_usuario:user.uid})
          }
        }
        else if(parse.catalog){
          this.addMancoListaCatalog({id_catalogo:parse.data.id_catalogo||parse._id,id_mancolist_cat:this.listradio,ids_estampillas:[]})
        }
        else{
          this.addMancoLista({id_estampilla:parse.uid||parse._id,id_manco_list:this.listradio,id_usuario:user.uid})
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

    var id_estampilla=null
    if(data_stamp.all){
      var data_id:any=[];
      data_stamp.data.forEach((el:any)=>{
        data_id.push(el.uid)
      })
      id_estampilla=data_id
    }
    else{
      var id_estampilla=data_stamp.uid
    }
    
    this.restservice.checkedMancoListCat({id_categoria_estampilla:id,id_estampilla:id_estampilla}).subscribe(
      (resp)=>{
        if(resp.existe) this.deleteActive=true;
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
    this.restservice.addMancolistaSerie(data).subscribe((res:any) =>{
      this.message('success',res.msg.length==0?'Eliminado': "Agregado a mi mancolista")
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
  addMancoListaCatalog(data:any){
    this.restservice.addMancolistaCatalog(data).subscribe((res:any) =>{
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
