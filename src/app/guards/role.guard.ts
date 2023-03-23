import { AuthGuardService } from '../services/auth-guard.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private _auth: AuthGuardService,
    private _router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const expectedRole = route.data.roles
    if (this._auth.isLoggedIn() && expectedRole == this._auth.getRole()) {
      return true;
    } else {
      this._router.navigate(['/customers']);
      return false;
    }
  }
}