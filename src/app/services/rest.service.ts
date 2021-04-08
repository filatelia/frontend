import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogoAll, CatalogoCompleto } from '../models/catalogo.interface';
import { MacolistaListPublic } from '../models/mancolista.interface';
import { TokenInterceptorService } from '../services/token-interceptor.service';
import { PaisesAll, SelectPais } from '../models/paises.interface';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { newArray } from '@angular/compiler/src/util';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  isLoggedIn = false;
  public usuario: any;
  //url:string = "https://filateliab.doubleflyindustries.com/";
  url: string = environment.conect_url_api;

  constructor(
    private http: HttpClient,
    private tokenInterceptorService: TokenInterceptorService
  ) {}

  public get(url: string) {
    return this.http.get(url); // GET
  }

  public postCatalogoAdmin(body: any) {
    return this.http.post(this.url + '/catalogo/uploads/excel', body); // POST
  }
  
  public putCatalogoAdminOmitidas(body: any){
    return this.http.put(this.url + '/catalogo/uploads/excel/actualizar-cat-excel', body); // POST
  }

  //Eliminando elemento de catalogo
  public deleteCatalogoAdmin(params: any) {
    return this.http.delete(this.url + '/catalogo/uploads/excel/' + params); // DELETE
  }

  getAllCatalogo() {
    //let direccion = this.url + "api/catalogo/uploads/excel?"+ "token:"+this.usuario.token;
    //return this.http.get<Catalogo[]>(direccion);

    let direccion = this.url + '/catalogo/uploads/excel';

    return this.http.get<CatalogoAll>(direccion).pipe(
      map((resp) => {

        return resp.catalogoCompleto;
      }),
     
    );
  }
  getMyCatalog(body:any):Observable<any>{
      return  this.http.get(this.url+'/catalogo/uploads/excel/mis-catalogos');
  }

  getAllCatalogoAdmin(body:any): Observable<CatalogoCompleto[]> {
    this.isLoggedIn = !!this.tokenInterceptorService.getToken();

    let direccion =this.url + '/catalogo/uploads/excel/mis-estampillas?id_catalogo='+body.id_catalogo;
    return this.http.get<CatalogoCompleto[]>(direccion).pipe(
      map((resp) => {
        console.log('Respuesta del enpoint', resp);

        var arrayObjetoCatalogo: any = [];

        for (const key in resp) {
          console.log('for in key: ', resp[key]);

          arrayObjetoCatalogo = resp[key];
        }

        return arrayObjetoCatalogo;
      })
    );
  }

  getAllPaises(page:number):Observable<PaisesAll[]>{

    let direccion = this.url + "/catalogo/paises/all";
    return this.http.get<PaisesAll[]>(direccion).pipe(
      map(resp =>{
        return resp;
      })
    );
  }
  getAllTemas(page:number):Observable<any>{
    let direccion = this.url + "/catalogo/temas";
    return this.http.get(direccion);
  }
  
  getSelectCatalogPais(pais: string,tema: string,page:number,perpage:number) {
    let direccion = `${this.url}/catalogo/uploads/excel/estampillas?page=${page}&perpage=${perpage}&pais=${pais}&tema=${tema}`;
    return this.http.get(direccion);
  }
  getSelectCatalogAnio(start:number,end:number){
    let direccion = this.url + '/catalogo/uploads/excel/cat-anio/'+start+'&'+end;
    return this.http.get<CatalogoAll>(direccion);
  }

  getSelectPais(pais: string): Observable<PaisesAll> {
    this.isLoggedIn = !!this.tokenInterceptorService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenInterceptorService.getUser();
      this.usuario = user;
    }
    //let direccion = this.url + "api/catalogo/uploads/excel?"+ "token:"+this.usuario.token;
    //return this.http.get<Catalogo[]>(direccion);

    let direccion = this.url + '/catalogo/paises/' + pais;

    var paisSeleccionado: PaisesAll;

    return this.http.get<PaisesAll>(direccion);
  }
  createMancoLista(body:any){
    return this.http.post(this.url + '/catalogo/manco_list/create-cat', body); // POST
  }
  updateMancoLista(body:any){
    return this.http.put(this.url + '/catalogo/manco_list/update-cat', body); // POST
  }
  deleteMancoLista(body:any){
    return this.http.put(this.url + '/catalogo/manco_list/update-cat', body); // POST
  }
  
  addMancolista(body: any){
    return this.http.post(this.url + '/catalogo/manco_list', body); // POST
  }
  getMancoListCat(): Observable<any> {
    let direccion =this.url + '/catalogo/manco_list/manco-list-cat';
    return this.http.get(direccion);
  }
  
  getAllMancolistaPublic(page: number): Observable<MacolistaListPublic[]> {
    let direccion =
      this.url + 'api/catalogo/uploads/excel?' + 'token:' + this.usuario.token;
    return this.http.get<MacolistaListPublic[]>(direccion);
  }

  getMancolistaPublic(id:string):Observable<any>{
    var direccion=this.url+'/catalogo/manco_list/listar/'+id
    return this.http.get(direccion);
  }
  
  getMyAllMancolista() {
    let direccion = this.url + '/catalogo/manco_list/listar';
    return this.http.post(direccion,{});
  }
  getMancolistaSelected(id:any):Observable<any>{
    return  this.http.get(this.url+'/catalogo/manco_list/listar-id-cat?id='+id);
  }
  estadoSolicitudCatalogo(body:any):Observable<any>{
  
    return  this.http.post(this.url+'/solicitudes/aprobacion', body);
  }
  
  getTipoCatalogo():Observable<any>{
    return  this.http.post(this.url+'/catalogo/tipo-catalogo', {});
  }
  createSolicitud(body:any):Observable<any>{
    return  this.http.post(this.url+'/solicitudes', body);
  }
  getSolicitudCatalogo(body:any):Observable<any>{
    return  this.http.get(this.url+'/solicitudes');
  }
  getIdCatalogo(body:any):Observable<any>{
    return  this.http.get(this.url+'/catalogo/uploads/excel/catalogos/'+body);
  }
  getSolicitudMyCatalogo(body:any):Observable<any>{
    return  this.http.get(this.url+'/solicitudes/mis-solicitudes');
  }
  
  editarCatalogo(body:any):Observable<any>{
    return  this.http.put(this.url+'/catalogo/uploads/excel/actualizar-cat-excel', body);
  }

 
}
