import { Component, Input, OnInit, ViewEncapsulation  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-configuracion-catalogo',
  templateUrl: './configuracion-catalogo.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./configuracion-catalogo.component.scss']
})


export class ConfiguracionCatalogoComponent{

  constructor(
    private modalService: NgbModal
    ) {}

    closeResult?: string;
     
    openVerticallyCentered(content : any) {
      this.modalService.open(content, { centered: true, windowClass: "modal__admin"});

    }

}
 
