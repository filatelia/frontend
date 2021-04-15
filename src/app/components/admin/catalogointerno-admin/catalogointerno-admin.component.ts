import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../../services/rest.service';
import { CatalogoCompleto } from '../../../models/catalogo.interface';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Location } from '@angular/common';
@Component({
  selector: 'app-catalogointerno-admin',
  templateUrl: './catalogointerno-admin.component.html',
  styleUrls: ['./catalogointerno-admin.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 100 })),
      transition('* => void', [animate(300, style({ opacity: 0 }))]),
    ]),
  ],
})
export class CatalogointernoAdminComponent implements OnDestroy, OnInit  {
  @Input() id_catalogo='';
  public previsualizacion: string | any;
  public repetidasData: any=[];
  public archivos: any = [];
  public responseExcel: any={};
  datos: CatalogoCompleto[] = [];
  intermedio: CatalogoCompleto[] = [];
  public loading: boolean | any;
  api = environment.conect_url;

  pais:SelectPais[] = [];
  response:any={}

  dtOptions: DataTables.Settings = {};
  data: any;
  dtTrigger = new Subject<any>();
  images:any=[];
  images_files:any=null;
  constructor(
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private rest: RestService,
    private router: Router,
    private location: Location,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // cargar todos los catalogos
    if(this.id_catalogo==''){
      this.id_catalogo = this.activateRoute.snapshot.paramMap.get('id_catalogo')||'/';  
    }
    console.log(this.id_catalogo);
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
    this.rest.getAllCatalogoAdmin({id_catalogo:this.id_catalogo}).subscribe((catalogocompleto) => {
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
              this.router.navigate(['/dashboard/atalogo-seleccionado/id']);

              
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
  closeVerticallyCentered() {
    this.modalService.dismissAll();
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

  capturarFile(event: any): any {
    const archivoCapturado = event.target.files[0];
    /*this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);

    })*/
    this.archivos.push(archivoCapturado);
    //
  }

  addImages(event: any){
    this.images_files=event.target.files;
    var files=event.target.files

    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.addimage(element)
    }
  }
  addimage(image:any){
    console.log(image)
      this.images.push(image);
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
      formularioDeDatos.append('id_catalogo', this.id_catalogo);
      this.rest.postCatalogoAdmin(formularioDeDatos).subscribe(
        (res: any) => {
          this.loading = false;
          this.mostrarDatos();
          if (res.ok == true) {
            if(res.estampillas_repetidas){
              this.repetidasData=res.estampillas_repetidas;
            }
            this.responseExcel={
              archivos_subidos:res.archivos_subidos,
              numero_estampillas_repetidas:res.numero_estampillas_repetidas,
              msg:res.archivos_subidos>0?'Archivo guardado '+res.msg:res.msg,
            }
            
            this.responseExcel.msg_visible=true;
            // this.router.navigate(['/dashboard/atalogo-seleccionado/id']);
            if(this.repetidasData.length==0){
                setTimeout(()=>{
                },6000)
            }
            setTimeout(()=>{
              this.responseExcel.msg_visible=false;
              this.closeVerticallyCentered();
            },5000)
            //this.router.navigate(['admin/dashboard/']);
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
  saveImages():void{
    try{
      this.loading=true;

      const images=new FormData();
      this.images.forEach((element:any) => {
        images.append('sampleFile',element)
      }); 
      
      images.append('catalogo',this.id_catalogo)
      images.append('files',this.images_files)
      console.log(this.images_files)
      this.rest.uploadImagesCatalogo(images).subscribe(
        (res:any)=>{
          this.loading=false;
          this.response=res;
          this.response.msg="guardado";
          setTimeout(()=>{
            this.closeVerticallyCentered()
          },2000)

        },
        (err:any)=>{
          this.loading=false;
          this.response.ok=false;
          this.response.msg="error";

        }
      );
    }
    catch($e){
      this.loading=false;
      console.error($e)
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
            numero_estampillas_repetidas:this.repetidasData.length+1,
            msg:res.msg||"Datos actualizados"
          }
          this.responseExcel.msg_visible=true;
          this.router.navigate(['admin/dashboard/atalogo-seleccionado/id']);
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
  backPage(){
    this.location.back();
  }
  selectall: boolean=false;
  selectedAll(){
      console.log(this.selectall)
      this.repetidasData.forEach((element:any) => {
        element.active=this.selectall;
      });
  }
}
