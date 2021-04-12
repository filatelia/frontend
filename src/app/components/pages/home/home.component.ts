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

  owl_banner_slider: OwlOptions = {
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    loop: true,
    dots: false,
    margin:10,
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
  
  slidesStore = [
    {
      id:1,
      src:'../../../../assets/img/BANNER ESTAMPILLAS.JPG',
      alt:'Image_1',
      title:'Estampillas',
      descripción: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      title_precio: 'Colecciones desde',
      precio: 'S/456'
    },
    {
      id:2,
      src:'../../../../assets/img/BANNER 2.JPG',
      alt:'Image_2',
      title:'Accesorios',
      descripción: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      title_precio: 'Encuentra mas de',
      precio: '1200 '
    }
  ]

  constructor() { }

  ngOnInit(): void {



  }

}
