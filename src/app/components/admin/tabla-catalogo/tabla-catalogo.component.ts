import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-catalogo',
  templateUrl: './tabla-catalogo.component.html',
  styleUrls: ['./tabla-catalogo.component.scss'],

})

export class TablaCatalogoComponent implements  OnInit {


  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['admin/dashboard/catalogo-admin']);


  }

}