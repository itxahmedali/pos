import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UniversalService } from './universal.service';
import { LoaderService } from './loader.service';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}
  public static signin: Subject<any> = new Subject<any>();
  logout() {
    LoaderService.loader.next(true);
    const color: any = localStorage.getItem('bannertheme');
    const themcolor: any = localStorage.getItem('theme');
    const previousRole: any = localStorage.getItem('role');
    localStorage.clear();
    localStorage.setItem('previousRole', previousRole);
    localStorage.setItem('bannertheme', color);
    localStorage.setItem('theme', themcolor);
    AuthService.signin.next(false);
    UniversalService.cartShow.next(false);
    if(!this.checkWelcome(window.location.href)){
      this.router.navigate([`/welcome-${previousRole}`]);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }
  checkWelcome(url: string) {
    const welcomePrefix = 'welcome-';
    const indexOfWelcome = url.indexOf(welcomePrefix);
    if (indexOfWelcome !== -1) {
      return true;
    } else {
      return false;
    }
  }
}
