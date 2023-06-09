import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { HelperService } from '../services/helper.service';
import { UniversalService } from '../services/universal.service';
import { Location } from '@angular/common';
import { LoaderService } from '../services/loader.service';
import { fadeIn } from 'src/animations/itemCardAnimation';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations:[fadeIn]
})
export class DashboardComponent {
  public login: boolean = false;
  public cart: boolean = false;
  public windowHeight: number = window.innerHeight;
  private role: any = localStorage.getItem('role');
  public sidebarEnable: boolean = false;
  public expanded!: boolean;
  public expandedBody!: boolean;
  public show: boolean = false;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private cd: ChangeDetectorRef,
    private router: Router,
    private location: Location,
    private helper: HelperService,
    private store: Store
  ) {
    if (localStorage.getItem('access_token') != 'skipped') {
      helper.myData();
    }
    else{
      setTimeout(() => {
        let route:any = localStorage.getItem('categories')
        route = JSON.parse(route)
        if(!localStorage.getItem('routed')){
          router.navigateByUrl(`/dashboard/${route?.[0]?.name?.toLowerCase()?.replace(/\s/g, '')}`);
          localStorage.setItem('routed', 'true')
        }
        else{
          return
        }
        LoaderService.loader.next(false);
      }, 1000);
    }
    router.events.subscribe((val: any) => {
      if(this.helper.checkUrl(window.location.href)){
        const url:any = this.helper.checkUrl(window.location.href);
        localStorage.setItem('url', url);
      }
    });
  }

  ngOnInit(): void {
    if (window.innerWidth < 415) {
      this.expanded = false;
      this.expandedBody = false;
    }
    // UniversalService.routePath.next(localStorage.getItem("heading"))
    if (localStorage.getItem('access_token') != null) {
      this.login = true;
    } else {
      this.login = false;
    }
    if (localStorage.getItem('theme') != null) {
      const color = localStorage.getItem('theme');
      this.colorTheme(color);
    } else {
      const color = JSON.stringify(['#37e3d9', '#f79888']);
      this.colorTheme(color);
    }
    if (localStorage.getItem('bannertheme') != null) {
      const color = localStorage.getItem('bannertheme');
      this.colorBanner(color);
    } else {
      const color = JSON.stringify(['#70347ade', '#005e72c7']);
      this.colorBanner(color);
    }
    if (localStorage.hasOwnProperty('orderview')) {
      if (
        localStorage.getItem('orderview') == 'true' ||
        localStorage.getItem('orderview') == null
      ) {
        this.sidebarEnable = false;
      } else {
        this.sidebarEnable = true;
      }
    } else this.sidebarEnable = true;
    this.observe();
  }
  async observe() {
    AuthService.signin.subscribe((res: boolean) => {
      this.login = res;
      this.cd.detectChanges();
    });
    UniversalService.cartShow.subscribe((res: boolean) => {
      this.cart = res;
      this.cd.detectChanges();
    });
    UniversalService.SideBar.subscribe(
      (res: boolean) => {
        if (res) {
          this.sidebarEnable = true;
        } else {
          this.sidebarEnable = false;
        }
        this.cd.detectChanges();
      },
      (err: any) => console.log(err)
    );
    UniversalService.expand.subscribe(
      (res: boolean) => {
        if (res) {
          this.expanded = true;
          setTimeout(() => {
            this.expandedBody = true;
          }, 500);
        } else {
          this.expanded = false;
          setTimeout(() => {
            this.expandedBody = false;
          }, 500);
        }
        this.cd.detectChanges();
      },
      (err: any) => console.log(err)
    );
  }
  colorTheme(color: any) {
    const colors = JSON.parse(color);
    localStorage.setItem('theme', JSON.stringify(colors));
    document.documentElement.style.setProperty(
      '--body-primary-prop',
      colors[0]
    );
    document.documentElement.style.setProperty(
      '--body-secondary-prop',
      colors[1]
    );
  }
  colorBanner(color: any) {
    const colors = JSON.parse(color);
    localStorage.setItem('bannertheme', JSON.stringify(colors));
    document.documentElement.style.setProperty(
      '--banner-primary-color',
      colors[0]
    );
    document.documentElement.style.setProperty(
      '--banner-secondary-color',
      colors[1]
    );
    document.documentElement.style.setProperty(
      '--bannerForm-primary-color',
      colors[0]
    );
    document.documentElement.style.setProperty(
      '--bannerForm-secondary-color',
      colors[1]
    );
  }
  expand() {
    this.expanded = !this.expanded;
    if (this.expanded) {
      document.body.classList.add('expand');
    } else {
      document.body.classList.remove('expand');
    }
    UniversalService.expand.next(this.expanded);
  }
}
