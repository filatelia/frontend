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
  estadosReporte:any=[
  ]
  constructor(private restService:RestService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.list()
    this.listStatus()
  }
  openVerticallyCentered(content: any,data:any,id_reporte:string) {
    this.reporte=this.estadosReporte.find((el:any)=>el.uid==data)
    this.reporte.id_reporte=id_reporte
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
  reporteStatus(){
    var data={
      "idReporte": this.reporte.id_reporte,
      "id_tipo_estado_reporte":  this.reporte.uid,
    }
    this.response.loading=true;
    this.restService.reporteStatus(data).subscribe(
      (resp:any)=>{
        this.response=resp
        this.response.msg="Guardado"
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
  viewMessage(data:any,content:any){
    this.chat=data;
    console.log(data)
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
