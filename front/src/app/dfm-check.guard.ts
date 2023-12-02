import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject, catchError, of, takeUntil, tap } from 'rxjs';
import { AuthService } from './services/auth.service';
import { AuthStatusService } from './services/auth-status.service';

@Injectable({
  providedIn: 'root'
})
export class DfmCheckGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private authStatusService: AuthStatusService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.isAuthenticated().pipe(
      tap((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          this.router.navigate(['login']);
        } else {
          this.authStatusService.setAuthenticated(true);
        }
      }),
      catchError((err) => {
        console.log(err);
        this.authService.logout();
        return of(false); // Return false when an error occurs
      })
    );
  }


}
