import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UniversalService } from './universal.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}
  public static signin: Subject<any> = new Subject<any>();
  logout() {
    const color: any = localStorage.getItem('bannertheme');
    const themcolor: any = localStorage.getItem('theme');
    const previousRole: any = localStorage.getItem('role');
    localStorage.clear();
    localStorage.setItem('previousRole', previousRole);
    localStorage.setItem('bannertheme', color);
    localStorage.setItem('theme', themcolor);
    AuthService.signin.next(false);
    UniversalService.cartShow.next(false);
    window.location.reload();
    this.router.navigate([`welcome-${localStorage.getItem('previousRole')}`]);
  }
}
