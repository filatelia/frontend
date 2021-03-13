import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CatalogoCompleto} from '../models/catalogo.interface'
import {MacolistaListPublic} from '../models/mancolista.interface'
import { TokenInterceptorService } from '../services/token-interceptor.service';
import {PaisesAll, SelectPais} from '../models/paises.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  isLoggedIn = false;
  public usuario: any;
  //url:string = "https://filateliab.doubleflyindustries.com/";
  url:string = "http://localhost:3000/";

  constructor(private http: HttpClient, private tokenInterceptorService: TokenInterceptorService) { }

  public get(url:string){
    return this.http.get(url); // GET  
  }

  public postCatalogoAdmin(body: any){
    return this.http.post(this.url + "api/catalogo/uploads/excel",body); // POST  
  }

  getAllCatalogoAdmin(page:number):Observable<CatalogoCompleto[]>{
    this.isLoggedIn = !!this.tokenInterceptorService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenInterceptorService.getUser(); 
      this.usuario = user;
     
    }
    //let direccion = this.url + "api/catalogo/uploads/excel?"+ "token:"+this.usuario.token;
    //return this.http.get<Catalogo[]>(direccion);

    let direccion = this.url + "api/catalogo/uploads/excel?"+ "token:"+this.usuario.token;
    return this.http.get<CatalogoCompleto[]>(direccion).pipe(
      map(resp =>{
        var asd:any = [];

        for (const key in resp) {

        asd = resp[key];


        }

        return asd;

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

  getSelectPais(pais:string):Observable<PaisesAll[]>{
    this.isLoggedIn = !!this.tokenInterceptorService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenInterceptorService.getUser(); 
      this.usuario = user;
     
    }
    //let direccion = this.url + "api/catalogo/uploads/excel?"+ "token:"+this.usuario.token;
    //return this.http.get<Catalogo[]>(direccion);

    let direccion = this.url + "api/catalogo/paises/"+pais;
    return this.http.get<PaisesAll[]>(direccion).pipe(
      map(resp =>{
        var asd:any = [];

        for (const key in resp) {

        asd = resp[key];


        }

        return asd;

      })
    );
  }

  getAllMancolistaPublic(page:number):Observable<MacolistaListPublic[]>{
   
    let direccion = this.url + "api/catalogo/uploads/excel?"+ "token:"+this.usuario.token;
    return this.http.get<MacolistaListPublic[]>(direccion);
  }
}
