import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
@Component({
  selector: 'app-peticioncatalogo-user',
  templateUrl: './peticioncatalogouser.component.html',
  styleUrls: ['./peticioncatalogouser.component.scss']
})
export class PeticioncatalogouserComponent implements OnInit {
  @Input() back: Boolean=false;
  @Output() activePage =new EventEmitter();
  constructor(private restService:RestService, private router: Router) {
  }

  ngOnInit(): void {
  }
  backPage(value:string){
      this.activePage.emit(value)
  }

}
