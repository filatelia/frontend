import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-pais-catalogo',
  templateUrl: './pais-catalogo.component.html',
  styleUrls: ['./pais-catalogo.component.scss']
})
export class PaisCatalogoComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  openVerticallyCentered(content : any) {
    this.modalService.open(content, { centered: true, windowClass: "modal__admin"});

  }
 
}
