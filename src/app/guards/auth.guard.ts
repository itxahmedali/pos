import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private AuthGuardService: AuthGuardService, private router: Router) { }

  canActivate(): boolean {
    let role = this.AuthGuardService.getRole();
    if (this.AuthGuardService.isLoggedIn()) {
      this.router.navigate([`dashboard/${role}`]);
      return false;
    }
    return true;
  }
}
