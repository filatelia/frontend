import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMancolistaComponent } from '../modal-mancolista/modal-mancolista.component';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(private modalService: NgbModal) { }
  @Input() modal: any={};
  ngOnInit(): void {
  }
  
  openModal() {
    localStorage.setItem('data_manco',JSON.stringify(this.modal))
    var context=ModalMancolistaComponent;
    this.modalService.open(
      context,
      { centered: true, windowClass: "modal__admin"});
  }
  
  closeModal() {
      this.modalService.dismissAll();
  }

}
