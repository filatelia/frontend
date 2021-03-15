import { Injectable } from '@angular/core';
import {User} from '../models/user.interface.ts';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService{
  
  constructor() { 
  }
  public logeado:boolean = false;
  signOut(): void {
    window.sessionStorage.clear();
  }

  //valida datos de acceso
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    //console.log(TOKEN_KEY);
  }
  
  //recopila el token
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  //guarda token
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    /*console.log(JSON.stringify("token: "+user.token));
    console.log(JSON.stringify("nombre: "+user.name));
    console.log(JSON.stringify("email: "+user.email));
    console.log(JSON.stringify("rol: "+user.role));*/

    const data:User = {
      
      token: user.token,
      name: user.name,
      email: user.email,
      role: user.role
    }
    console.log(data);
  }
  
   //toma datos del usuario
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      //console.log(JSON.parse(user));
      return JSON.parse(user);
    }
    return {};
  }
}
