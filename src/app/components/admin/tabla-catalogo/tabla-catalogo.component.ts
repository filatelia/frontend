import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tabla-catalogo',
  templateUrl: './tabla-catalogo.component.html',
  styleUrls: ['./tabla-catalogo.component.scss'],

})

export class TablaCatalogoComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  data: any;
  dtTrigger = new Subject<any>();

  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json"
      }
    };

    this.http.get('https://jsonplaceholder.typicode.com/todos/').subscribe((resp: any) => {
      this.data = resp;
      this.dtTrigger.next();
    });

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}