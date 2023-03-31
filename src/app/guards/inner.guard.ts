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
    let url = localStorage.getItem('url');
    if(role){
      setTimeout(() => {
        if(url && !url.includes("welcome")){
        if(this.router.url !== `dashboard${url}`){
          this.router.navigateByUrl(`dashboard${url}`);
          return false;
        }
        else {
          return true
        }
      }
      });
    }
    return true;
  }
}
