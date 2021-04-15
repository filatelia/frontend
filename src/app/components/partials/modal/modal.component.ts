import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMancolistaComponent } from '../modal-mancolista/modal-mancolista.component';
import { ModalReporteComponent } from '../modal-reporte/modal-reporte.component';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(private modalService: NgbModal) { }
  @Input() modal: any=null;
  ngOnInit(): void {
  }
  
  openModal(type='') {
    var context;
    console.log("modal ")
    console.log(this.modal)
    switch(type){
      case 'manco':
        localStorage.setItem('data_manco',JSON.stringify(this.modal))
        context=ModalMancolistaComponent;
        break;
      case 'reporte':
        localStorage.setItem('data_reporte',JSON.stringify(this.modal))
        context=ModalReporteComponent;
        break;
      default:
        localStorage.setItem('data_manco',JSON.stringify(this.modal))
        context=ModalMancolistaComponent;
        break;
    }


    this.modalService.open(
      context,
      { centered: true, windowClass: "modal__admin"});
  }
  
  closeModal() {
      this.modalService.dismissAll();
  }

}
