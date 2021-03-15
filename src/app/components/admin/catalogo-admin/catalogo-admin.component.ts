
import { Component, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../../services/rest.service'
import {CatalogoCompleto} from '../../../models/catalogo.interface'

import { Router } from '@angular/router';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catalogo-admin',
  templateUrl: './catalogo-admin.component.html',
  styleUrls: ['./catalogo-admin.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CatalogoAdminComponent implements OnInit {
  
 
  public previsualizacion: string | any;
  public archivos: any = []
   datos: CatalogoCompleto[] = [];
   intermedio: any = [];
  public loading: boolean | any
  api = environment.conect_url;
  constructor(
    private modalService: NgbModal, private sanitizer: DomSanitizer, private rest: RestService, private router:Router
  ) { }

  ngOnInit(): void {
    // cargar todos los catalogos

this.mostrarDatos();
  }

  mostrarDatos(){
        
    this.rest.getAllCatalogoAdmin(1).subscribe(catalogocompleto =>{

      console.log("catalogo recibido: ", catalogocompleto);

    

      this.datos = catalogocompleto;

   })
  }
  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}
   // editar catalogo
  editarCatalogo(id : any){
    this.router.navigate(['editar', id]);
  }
  // nuevo catalogo
  nuevoCatalogo(){
    this.router.navigate(['nuevo']);
  }

  openVerticallyCentered(content : any) {
    this.modalService.open(content, { centered: true, windowClass: "modal__admin"});
  }

  capturarFile(event: any): any {
    const archivoCapturado = event.target.files[0]
    /*this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);

    })*/
    this.archivos.push(archivoCapturado);
    // 
    console.log("Archivo capturado: "+event.target.files[0]);

  }


 /* extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
    return;
  })
*/

  /**
   * Limpiar imagen
   */

  clearImage(): any {
    this.previsualizacion = '';
    this.archivos = [];
  }



  /**
   * Subir archivo
   */

  subirArchivo(): any {
    try {
      this.loading = true;
      const formularioDeDatos = new FormData();
      this.archivos.forEach((archivo: string) => {
        formularioDeDatos.append('sampleFile', archivo)
      })
      console.log("archivo previsualizado"+formularioDeDatos)
      // formularioDeDatos.append('_id', 'MY_ID_123')
      this.rest.postCatalogoAdmin(formularioDeDatos)
        .subscribe((res: any) => {
          this.loading = false;
          console.log('Respuesta del servidor', res);

          if(res.ok == true){
            alert(res.msg);
            this.mostrarDatos();
          }
          else{
            alert(res.msg);
          }
          

        }, () => {
          this.loading = false;
          alert('Error');
        })
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e);

    }
  }
}
