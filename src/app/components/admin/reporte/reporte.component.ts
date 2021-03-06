import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {
  dataReportes:any=[]
  response: any={};
  reporte:any={}
  status:any=''
  chat:any={}
  checkedMessage: boolean=false;
  user: any={};
  reporte_id:any='';
  descripcion_reporte_cliente:any='';
  estadosReporte:any=[
  ]
  constructor(private restService:RestService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.list()
    this.listStatus()
  }
  openVerticallyCentered(content: any,data:any) {
    this.reporte=this.estadosReporte.find((el:any)=>el.uid==data)

    console.log(this.reporte)
    this.reporte.id_reporte=this.reporte_id
    this.openModal(content)
  }
  openDetailUser(user:any,content:any){
    this.user=user;
    console.log(user)
    this.openModal(content)
  }
  openModal(content: any) {
    this.modalService.open(content, {
      centered: true,
      windowClass: 'modal__admin',
    });
  }
  closeVerticallyCentered() {
    this.modalService.dismissAll();
  }
  selectedMessage(data:any){
    data.active=!data.active
    var check=this.chat.messages.find((el:any)=>el.active)
    if(check){
      this.checkedMessage=true;
    }
    else{
      this.checkedMessage=false;

    }
  }
  reporteStatus(){
    var chats=this.chat.messages.filter((el:any)=>el.active==true)
    if(chats.length==0&&this.reporte.abreviacion!='P.INA'){
        this.response.msg="Seleccione mensajes"
        this.response.loading=false;
        return;
    }
    var array:any=[]
    chats.forEach((element:any) => {
        array.push(element._id)
    });
    var data={
      "idReporte": this.reporte.id_reporte,
      "id_tipo_estado_reporte":  this.reporte.uid,
      "mensajes":array
    }
    
    this.response.loading=true;
    this.restService.reporteStatus(data).subscribe(
      (resp:any)=>{
        this.response=resp
        if(resp.ok) this.response.msg="Guardado"
        this.response.loading=false;
        this.list()
        setTimeout(()=>{
          this.closeVerticallyCentered()
        },2000)
      },
      (err:any)=>{
        this.response.loading=false;
        console.log(err)

      }
    )
  }
  listStatus(){
    this.restService.listStatusReport().subscribe(
      (resp:any)=>{
          this.estadosReporte=resp.msg
      },
      (err:any)=>{

      }
    )
  }
  list(){
    this.restService.allReporteUsers().subscribe(
      (resp:any)=>{
          this.dataReportes=resp.msg
      },
      (err:any)=>{

      }
    )
  }
  chatView(){
     this.closeVerticallyCentered()
  }
  openReport(text:any,content:any){
    this.descripcion_reporte_cliente=text;
    this.openModal(content)
  }
  viewMessage(data:any,content:any,reporte:any){
    this.chat=data;
    console.log(reporte)

    this.reporte_id=reporte.uid
    this.restService.viewReportChat(data._id).subscribe(
      (resp:any)=>{
        if(resp.ok) {
          this.chat.messages=resp.msg
           this.openModal(content);
        }
      },
      (err:any)=>{

      }
    )
  }

}
