import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.scss']
})
export class BlogAdminComponent implements OnInit {
  modalService: any;

  constructor() { }

  ngOnInit(): void {
  }

  openVerticallyCentered(content : any) {
    this.modalService.open(content, { centered: true, windowClass: "modal__admin"});

  }

}
