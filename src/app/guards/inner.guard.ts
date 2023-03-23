import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class InnerGuard implements CanActivate {
  constructor(private router: Router, private AuthGuardService: AuthGuardService) {}

  canActivate(): boolean {
    if (!this.AuthGuardService.isLoggedIn()) {
      if(this.router.url !== `welcome-${localStorage.getItem('previousRole') == 'null' || !localStorage.getItem('previousRole') ? 'customers' : localStorage.getItem('previousRole')}`)
      this.router.navigateByUrl(`welcome-${localStorage.getItem('previousRole') == 'null' || !localStorage.getItem('previousRole') ? 'customers' : localStorage.getItem('previousRole')}`);
      return false;
    }
    let role = this.AuthGuardService.getRole();
    if(role){
      setTimeout(() => {
        if(this.router.url !== `dashboard/${role?.toLowerCase()}`){
          this.router.navigateByUrl(`dashboard/${role?.toLowerCase()}`);
          return false;
        }
        else {
          return true
        }
      });
    }
    return true;
  }
}