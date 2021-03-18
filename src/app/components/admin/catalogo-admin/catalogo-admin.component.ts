import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../../services/rest.service';
import { CatalogoCompleto } from '../../../models/catalogo.interface';
import { Router } from '@angular/router';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

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

export class CatalogoAdminComponent implements OnDestroy, OnInit  {

  public previsualizacion: string | any;
  public archivos: any = [];
  datos: CatalogoCompleto[] = [];
  intermedio: any = [];
  public loading: boolean | any;
  api = environment.conect_url;

  
  dtOptions: DataTables.Settings = {};
  data: any;
  dtTrigger = new Subject<any>();

  constructor(
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private rest: RestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // cargar todos los catalogos

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json"
      }
    };



    this.mostrarDatos();
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  mostrarDatos() {
    this.rest.getAllCatalogoAdmin(1).subscribe((catalogocompleto) => {
      console.log('catalogo recibido: ', catalogocompleto);

      this.datos = catalogocompleto;
      this.dtTrigger.next();
    });
  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  // editar catalogo
  editarElemento() {

    Swal.fire(
      'En desarrollo...',
      'Funcionalidad aún en desarrollo',
      'info'
    )
  

  }
  eliminarElemento(id: any, codigo: any) {
    Swal.fire({
      title: '¿Seguro que desea eliminar?',
      text: 'Eliminarás el elemento ' + codigo,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rest.deleteCatalogoAdmin(id).subscribe((resp) => {
          console.log('eliminadoooo', resp);

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: 'success',
            title: 'Elemento elimiado ' + codigo,
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              this.mostrarDatos();
            }
          });
        });
      }
    });

    console.log('Eliminado elemento: ', id);
  }
  // nuevo catalogo
  nuevoCatalogo() {
    this.router.navigate(['nuevo']);
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, {
      centered: true,
      windowClass: 'modal__admin',
    });
  }

  capturarFile(event: any): any {
    const archivoCapturado = event.target.files[0];
    /*this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);

    })*/
    this.archivos.push(archivoCapturado);
    //
    console.log('Archivo capturado: ' + event.target.files[0]);
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
        formularioDeDatos.append('sampleFile', archivo);
      });
      console.log('archivo previsualizado' + formularioDeDatos);
      // formularioDeDatos.append('_id', 'MY_ID_123')
      this.rest.postCatalogoAdmin(formularioDeDatos).subscribe(
        (res: any) => {
          this.loading = false;
          console.log('Respuesta del servidor', res);

          if (res.ok == true) {
            alert(res.msg);
            this.mostrarDatos();
          } else {
            alert(res.msg);
          }
        },
        () => {
          this.loading = false;
          alert('Error');
        }
      );
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e);
    }
  }
}
