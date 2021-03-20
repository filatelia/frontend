import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajustes-admin',
  templateUrl: './ajustes-admin.component.html',
  styleUrls: ['./ajustes-admin.component.scss']
})
export class AjustesAdminComponent implements OnInit {
  modalService: any;

  constructor() { }

  ngOnInit(): void {
  }
  openVerticallyCentered(content : any) {
    this.modalService.open(content, { centered: true, windowClass: "modal__admin"});

  }
}
