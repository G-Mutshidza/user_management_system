import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    results: Boolean 

    if (sessionStorage.getItem('accessrole') === 'admin') {
      return true
    }else {
      return false
    }
  }

}


@Injectable({
    providedIn: 'root'
})
export class UserRoleGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    results: Boolean 

    if (sessionStorage.getItem('accessrole') === 'user') {
      return true
    }else {
      return false
    }
  }


}
