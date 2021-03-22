import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const AUTH_API = environment.conect_url_api;
const login = AUTH_API + environment.login;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(login, {
      email,
      password
    }, httpOptions);

  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/usuarios', {
      name,
      email,
      password
    }, httpOptions);
  }
}