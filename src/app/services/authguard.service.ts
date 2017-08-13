import { CheckauthService } from './checkauth.service';//checks whether the route is accessible according to situation: not-connected, temoin, beneficiaire
import { 
    Router,
    CanActivate, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot }
    from '@angular/router'
import { Observable } from "rxjs/Observable";
import { Injectable } from '@angular/core';
    
@Injectable()
export class authGuardService implements CanActivate {
    constructor(
        private checkauthservice : CheckauthService,
        private router: Router
    ) {}
    
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<boolean> | Promise<boolean> | boolean {

        return this.checkauthservice.isAuthenticated(route.routeConfig.path)
        .then(
        (authenticated: boolean) => {
            return authenticated;
        }
        )
    }
    
    canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
        return this.canActivate(route, state);
    }
}