import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  owl_comenzar: OwlOptions = {
    loop: true,
    dots: false,
    margin:5,
    navText: ['', ''],
    responsive:{
      0:{
          items:1,
      }
    }
  }

  
  owl_vendido: OwlOptions = {
    loop: true,
    dots: false,
    margin:5,
    navText: ['', ''],
    responsive:{
      0:{
          items:1,
      },
      600:{
        items:3,
      }
    }
  }

  constructor() { }

  ngOnInit(): void {



  }

}
