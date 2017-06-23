import { FakeAuthService } from './fakeauth.service';
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
            private fakeAuthService : FakeAuthService,
            private router: Router) {}
        
        canActivate(
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot
            ): Observable<boolean> | Promise<boolean> | boolean {

            return this.fakeAuthService.isAuthenticated()
            .then(
            (authenticated: boolean) => {
                if (authenticated) {
                    return true;
                }else {
                    this.router.navigate(['/']);
                }

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