import { Component, SimpleChanges, Input, OnChanges, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-mancolista',
  templateUrl: './modal-mancolista.component.html',
  styleUrls: ['./modal-mancolista.component.scss']
})
export class ModalMancolistaComponent implements   OnInit {

  constructor(private modalService: NgbModal,private cd: ChangeDetectorRef) { }
  isCreate: boolean=false;
  
  static modal: any={};
  ngOnInit(): void {
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
      var data=localStorage.getItem('data_manco');
      var parse=JSON.parse(data||'')
      console.log(parse)
      this.modalService.dismissAll()
  }
}
