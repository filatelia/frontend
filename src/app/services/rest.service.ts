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

  getAllCatalogoAdmin(page: number): Observable<CatalogoCompleto[]> {
    this.isLoggedIn = !!this.tokenInterceptorService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenInterceptorService.getUser();
      this.usuario = user;
    }
    //let direccion = this.url + "api/catalogo/uploads/excel?"+ "token:"+this.usuario.token;
    //return this.http.get<Catalogo[]>(direccion);

    let direccion =
      this.url + '/catalogo/uploads/excel?' + 'token:' + this.usuario.token;
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
  /* getAllPaises(page:number):Observable<PaisesAll[]>{
    this.isLoggedIn = !!this.tokenInterceptorService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenInterceptorService.getUser(); 
      this.usuario = user;
     
    }
    //let direccion = this.url + "api/catalogo/uploads/excel?"+ "token:"+this.usuario.token;
    //return this.http.get<Catalogo[]>(direccion);

    let direccion = this.url + "api/catalogo/paises/all";
    return this.http.get<PaisesAll[]>(direccion).pipe(
      map(resp =>{
        var asd:any = [];

        for (const key in resp) {

        asd = resp[key];


        }

        return asd;

      })
    );
  }*/
  
  getSelectCatalogPais(pais: string) {
    //let direccion = this.url + "api/catalogo/uploads/excel?"+ "token:"+this.usuario.token;
    //return this.http.get<Catalogo[]>(direccion);
    let direccion = this.url + '/catalogo/uploads/excel';
    //let direccion = this.url + 'api/catalogo/uploads/excel?tipo_busqueda=pais&pais='+pais;
    return this.http.get<CatalogoAll>(direccion).pipe(
      map((resp) => {
        return resp.catalogoCompleto;
      }),
     
    );
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

  getAllMancolistaPublic(page: number): Observable<MacolistaListPublic[]> {
    let direccion =
      this.url + 'api/catalogo/uploads/excel?' + 'token:' + this.usuario.token;
    return this.http.get<MacolistaListPublic[]>(direccion);
  }
}
