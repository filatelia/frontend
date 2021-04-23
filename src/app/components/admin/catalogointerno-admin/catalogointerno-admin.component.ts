import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../../services/rest.service';
import { CatalogoCompleto } from '../../../models/catalogo.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectPais } from '../../../models/paises.interface';


import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { TokenInterceptorService } from 'src/app/services/token-interceptor.service';
@Component({
  selector: 'app-catalogointerno-admin',
  templateUrl: './catalogointerno-admin.component.html',
  styleUrls: ['./catalogointerno-admin.component.scss'],
})
export class CatalogointernoAdminComponent implements  OnInit  {
  @Input() id_catalogo='';
  public previsualizacion: string | any;
  public repetidasData: any=[];
  public archivos: any = [];
  public responseExcel: any={};
  dataEstampillas: any = [];
  intermedio: CatalogoCompleto[] = [];
  public loading: boolean | any;
  api = environment.conect_url;
  url = environment.conect_url_api;
  dataStamp:any={}
  pais:SelectPais[] = [];
  response:any={}

  data: any;
  images:any=[];
  images_files:any=null;
  user:any={};
  cantidad:any='';
  constructor(
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private rest: RestService,
    private router: Router,
    private location: Location,
    private activateRoute: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private tokenInterceptorService: TokenInterceptorService,
    
  ) {

  }
  openIMG(Imagengrande : any) {
    this.modalService.open(Imagengrande , { centered: true, windowClass: "modal__admin"});

  }

  ngOnInit(): void {
    // cargar todos los catalogos
    if(this.id_catalogo==''){
      this.id_catalogo = this.activateRoute.snapshot.paramMap.get('id_catalogo')||'/';
    }
 
    this.mostrarDatos();
    this.verLogeo();
  }
  verLogeo() {
    const user = this.tokenInterceptorService.getUser();
    if (user.ok) {
      this.user = user;

    } else {

    }
  }
  refresh() {
    this.cd.detectChanges();
  }
 

  mostrarDatos() {
    this.rest.getAllCatalogoAdmin({id_catalogo:this.id_catalogo}).subscribe(
      (resp:any) => {
      this.dataEstampillas = resp.estampillas;
      this.refresh()
        
    });
  }
  downloadExcel(){
    var id_catalogo=this.id_catalogo;
    this.rest.downloadExcel({id_catalogo:this.id_catalogo,cantidad:10}).subscribe(
      (resp:any) => {
      this.dataEstampillas = resp.estampillas;
      this.refresh()
        
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
  updateStamp(data:any,content:any){
    console.log(data)
    this.dataStamp=data
    this.openVerticallyCentered(content)
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

          Swal.fire({
            title: 'Procesando...',
            html: 'Eliminado....',
            timer: 500,
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
          console.log('eliminadoooo', resp);
         if (resp) {
          this.mostrarDatos();
          this.message('success', "Estampilla eliminada correctamente.")
         }

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
  message(type:any,message:any){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: type,
      title: message,
    }).then(
      result=>{
        if(result.dismiss === Swal.DismissReason.timer){


        }

      }
    );
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
              msg:res.ok?'Archivo guardado ':'Error',
            }

            this.responseExcel.msg_visible=true;
            // this.router.navigate(['/dashboard/atalogo-seleccionado/id']);
            if(this.repetidasData.length==0){
                setTimeout(()=>{
                },6000)
            }
            setTimeout(()=>{
              this.responseExcel.msg_visible=false;
            this.message('success', "Excel procesado y subido correctamente");

              this.closeVerticallyCentered();
            },1000)
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
      if(this.images.length==0){
          this.response.ok=false;
          this.response.msg="Agregue imagenes";
          return;
      }
      if(this.images.length==1){
        this.response.ok=false;
        this.response.msg="Debe enviar dos fotos o más, para agregar una foto seleccione la opción de agregar estampilla";
        return;
    }
      this.loading=true;

      const images=new FormData();
      this.images.forEach((element:any) => {
        images.append('sampleFile',element)
      });

      images.append('catalogo',this.id_catalogo)
      this.rest.uploadImagesCatalogo(images).subscribe(
        (res:any)=>{
          this.loading=false;
          this.response=res;
          this.response.msg="guardado";
          setTimeout(()=>{
            this.closeVerticallyCentered()
          },1000)

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
  changeAddImage(content:any){
    this.images=[]
    this.openVerticallyCentered(content);
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