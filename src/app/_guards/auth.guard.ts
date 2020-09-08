import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(
        private router: Router
    ) 
    { }

    public canActivate(
        _route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (localStorage.getItem('token')) {
            if (localStorage.token !== 'undefined')
                return true;
            else {
                this.router.navigateByUrl('/');
                return false;
            }
        }
        this.router.navigateByUrl('/');
        return false;
    }
}
