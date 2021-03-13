import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenInterceptorService } from '../services/token-interceptor.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedIn = false;
  constructor(
    private router: Router,
    private tokenInterceptorService:TokenInterceptorService
  ) { }

  canActivate(): boolean {
    if (this.tokenInterceptorService.getToken()) {
      return true;
  }
    this.router.navigate(['auth/login']);
    return false;
  
  }
}
