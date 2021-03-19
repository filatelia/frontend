import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RestService } from 'src/app/services/rest.service';
import {PaisesAll, SelectPais} from '../../../models/paises.interface'

@Component({
  selector: 'app-catalogo-interno',
  templateUrl: './catalogo-interno.component.html',
  styleUrls: ['./catalogo-interno.component.scss']
})
export class CatalogoInternoComponent implements OnInit {
  public pais: PaisesAll={};
  public  buscarPais ='';
  public dataCatalog=[
    {
      Anio:"1896",
      Inicio:1896,
      Final:1900,
      Descripcion_de_la_serie:"Coat of Arms",
      Descripcion:"La “Pacific Steam Navigation Co.” le dio estas estampillas al gobierno del Perú de manera que pudiera probar un pre-pago de servicio postal a través de estampillas",
      Cantidad:3,
      data:[
        {
          Numero_de_catalogo:"PE 108",
          Anio:1896,
          Descripcion:"Postage stamps of the Pacific Steam Navigation",
          Valor_Facial:"50 Peruvian centavo",
          Tipo:"Stamp",
          Foto_JPG_800x800_px:"/imagenes/predeterminadas/estampillas.jpg",
        },
        {
          Numero_de_catalogo:"PE 108",
          Anio:1896,
          Descripcion:"Postage stamps of the Pacific Steam Navigation",
          Valor_Facial:"50 Peruvian centavo",
          Tipo:"Stamp",
          Foto_JPG_800x800_px:"/imagenes/predeterminadas/estampillas.jpg",
        },
        {
          Numero_de_catalogo:"PE 108",
          Anio:1896,
          Descripcion:"Postage stamps of the Pacific Steam Navigation",
          Valor_Facial:"50 Peruvian centavo",
          Tipo:"Stamp",
          Foto_JPG_800x800_px:"/imagenes/predeterminadas/estampillas.jpg",
        },
      ],
    },
    {
      Anio:"1900",
      Inicio:1900,
      Final:1904,
      Descripcion_de_la_serie:"Revolution against General Caceres",
      Cantidad:3,
      Descripcion:"La “Pacific Steam Navigation Co.” le dio estas estampillas al gobierno del Perú de manera que pudiera probar un pre-pago de servicio postal a través de estampillas",
      data:[
        {
          Numero_de_catalogo:"PE 108",
          Anio:1897,
          Descripcion:"NOT ASSIGNED",
          Valor_Facial:"50 Peruvian centavo",
          Tipo:"Stamp",
          Foto_JPG_800x800_px:"/imagenes/predeterminadas/estampillas.jpg",
        },
        {
          Numero_de_catalogo:"PE 108",
          Anio:1897,
          Descripcion:"NOT ASSIGNED",
          Valor_Facial:"50 Peruvian centavo",
          Tipo:"Stamp",
          Foto_JPG_800x800_px:"/imagenes/predeterminadas/estampillas.jpg",
        },
        {
          Numero_de_catalogo:"PE 108",
          Anio:1897,
          Descripcion:"NOT ASSIGNED",
          Valor_Facial:"50 Peruvian centavo",
          Tipo:"Stamp",
          Foto_JPG_800x800_px:"/imagenes/predeterminadas/estampillas.jpg",
        },
      ],
    }
  ];
  constructor(
    private rest: RestService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}
  ngOnInit(): void {
    this.buscarPais = this.route.snapshot.paramMap.get('pais')||'/peru';
    this.buscarPorAnio()
  }
  buscarPorAnio(){
    this.rest.getSelectPais(this.buscarPais).subscribe(data =>{
      this.pais=data
    });
  }


}
