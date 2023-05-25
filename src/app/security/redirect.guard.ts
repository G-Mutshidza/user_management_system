import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanDeactivate<unknown> {
  constructor(private user: UsersService, private router: Router) {}
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.user.isLoggedIn()){
        return true;
      }else {
        this.router.navigate(['sign-in']);
        return false; 
      }
  }
  
}
