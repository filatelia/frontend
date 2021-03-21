import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router,RouterStateSnapshot } from '@angular/router';
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

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean {
    if (this.tokenInterceptorService.getToken()) return true;
    this.router.navigate(['auth/login']);
    return false;
  }
}
@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenInterceptorService:TokenInterceptorService
  ) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean{
    var user=this.tokenInterceptorService.getUser()||null;
    if(user){
        if(user.role=='admin'){
          return true;
        }
    }
    this.router.navigate(['user/dashboard'])
    return false;
  }
}
