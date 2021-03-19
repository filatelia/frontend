import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tienda-admin',
  templateUrl: './tienda-admin.component.html',
  styleUrls: ['./tienda-admin.component.scss']
})
export class TiendaAdminComponent implements OnInit {
  modalService: any;

  constructor() { }

  ngOnInit(): void {
  }
  openVerticallyCentered(content : any) {
    this.modalService.open(content, { centered: true, windowClass: "modal__admin"});

  }

}
