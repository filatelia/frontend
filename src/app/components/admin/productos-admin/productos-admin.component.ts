import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-productos-admin',
  templateUrl: './productos-admin.component.html',
  styleUrls: ['./productos-admin.component.scss']
})
export class ProductosAdminComponent implements OnInit {


  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  openVerticallyCentered(content : any) {
    this.modalService.open(content, { centered: true, windowClass: "modal__admin"});

  }

}
