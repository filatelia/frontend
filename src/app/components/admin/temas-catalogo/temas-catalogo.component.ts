import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
 
@Component({
  selector: 'app-temas-catalogo',
  templateUrl: './temas-catalogo.component.html',
  styleUrls: ['./temas-catalogo.component.scss']
})
export class TemasCatalogoComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }
  openVerticallyCentered(content : any) {
    this.modalService.open(content, { centered: true, windowClass: "modal__admin"});

  }

}
