import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-catalogo-admin',
  templateUrl: './catalogo-admin.component.html',
  styleUrls: ['./catalogo-admin.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [animate(300, style({ opacity: 0 }))]),
    ]),
  ],
})

export class CatalogoAdminComponent implements OnInit {
  

 

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {}
    // cargar todos los catalogos

  

  openVerticallyCentered(content: any) {
    this.modalService.open(content, {
      centered: true,
      windowClass: 'modal__admin',
    });
  }
  openEditCentered(contenido: any) {
    this.modalService.open(contenido, {
      centered: true,
      windowClass: 'modal__admin',
    });
  }
  openlistarCentered(conten: any) {
    this.modalService.open(conten, {
      centered: true,
      windowClass: 'modal__admin',
    });
  }
}

