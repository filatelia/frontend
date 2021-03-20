import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../../services/rest.service';
import { CatalogoCompleto } from '../../../models/catalogo.interface';
import { Router } from '@angular/router';
import { SelectPais } from '../../../models/paises.interface';

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

export class CatalogoAdminComponent implements OnDestroy, OnInit {

  public previsualizacion: string | any;
  public repetidasData: any=[];
  public archivos: any = [];
  public responseExcel: any={};
  datos: CatalogoCompleto[] = [];
  intermedio: CatalogoCompleto[] = [];
  public loading: boolean | any;
  api = environment.conect_url;

  pais:SelectPais[] = [];


  dtOptions: DataTables.Settings = {};
  data: any;
  dtTrigger = new Subject<any>();

  constructor(
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private rest: RestService,
    private router: Router
  ) { }

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
  reiniciarTabla(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.10.24/i18n/Spanish.json"
      }
    };

  }

  mostrarDatos() {
    this.rest.getAllCatalogoAdmin(1).subscribe((catalogocompleto) => {
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
 
          Swal.fire({
            title: 'Procesando...',
            html: 'Eliminado....',
            timer: 1000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
          this.router.navigate(['admin/dashboard/tabla']);

              
            },
            willClose: () => {
             
            }
          }).then((result) => {

            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
            }
          })

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
  openEditCentered(contenido: any) {
    this.modalService.open(contenido, {
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
      this.rest.postCatalogoAdmin(formularioDeDatos).subscribe(
        (res: any) => {
          this.loading = false;

          if (res.ok == true) {
            if(res.estampillas_repetidas){
              this.repetidasData=res.estampillas_repetidas;
            }
            this.responseExcel={
              archivos_subidos:res.archivos_subidos,
              total_estampillas_omitidas:res.total_estampillas_omitidas,
              msg:res.msg,
            }
            
            this.responseExcel.msg_visible=true;
            this.router.navigate(['admin/dashboard/tabla']);
            if(this.repetidasData.length==0){
                setTimeout(()=>{
                },6000)
            }
            setTimeout(()=>{
              this.responseExcel.msg_visible=false;
            },5000)
            //this.router.navigate(['admin/dashboard/tabla']);
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
  guardarOmitidas(){
    this.loading = true;
    var dataFind=this.repetidasData.filter((e:any)=>e.active);
    if(this.repetidasData){
      this.rest.putCatalogoAdminOmitidas(dataFind).subscribe(
        (res:any)=>{
         
          this.loading = false;
          this.repetidasData=this.repetidasData.filter((e:any)=>!e.active);
          this.responseExcel={
            archivos_subidos:this.responseExcel.archivos_subidos+(dataFind.length+1),
            total_estampillas_omitidas:this.repetidasData.length+1,
            msg:res.msg||"Datos actualizados"
          }
          this.responseExcel.msg_visible=true;
          this.router.navigate(['admin/dashboard/tabla']);
          if(this.repetidasData.length==0){
             
          }
          setTimeout(()=>{
            this.responseExcel.msg_visible=false;
          },5000)
        },
        () => {
          this.loading = false;
          alert('Error');
        }
      )
    } 
  }
  selectall: boolean=false;
  selectedAll(){
      console.log(this.selectall)
      this.repetidasData.forEach((element:any) => {
        element.active=this.selectall;
      });
  }
}
