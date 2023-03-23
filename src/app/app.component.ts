import { UniversalService } from './services/universal.service';
import { AuthService } from './services/auth.service';
import { Component, ChangeDetectorRef, ViewChild, Inject } from '@angular/core';
import { fadeAnimation } from 'src/animations/animation';
import { fadeIn } from 'src/animations/itemCartAnimation';
import { Router } from '@angular/router';
import { DOCUMENT, Location } from '@angular/common';
import { HelperService } from './services/helper.service';
import { Store } from '@ngrx/store';
import { LoaderService } from './services/loader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation, fadeIn],
})
export class AppComponent {
  title = 'restaurant-management';
  public login: boolean = false;
  public cart: boolean = false;
  public windowHeight: number = window.innerHeight;
  private role: any = localStorage.getItem('role');
  public sidebarEnable: boolean = false;
  public expanded!: boolean;
  public expandedBody!: boolean;
  public show: boolean = false;
  constructor(@Inject(DOCUMENT) private document: Document, private cd: ChangeDetectorRef, private router: Router, private location:Location, private helper:HelperService,
    private store:Store) {}

  ngOnInit(): void {
    localStorage.setItem('url',this.location.path().split('-')[1])
    this.getSubDomain()
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
      LoaderService.loader.subscribe((res: any) => {
        this.show = res;
        if (this.show == true) {
          this.document.body.classList.add('bodyLoader');
        } else {
          this.document.body.classList.remove('bodyLoader');
        }
        this.cd.detectChanges();
      });
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
  getSubDomain(){
    localStorage.removeItem('subDomain')
    const domain = window.location.hostname;
    if (
      domain.indexOf('.') < 0 ||
      domain.split('.')[0] === 'example' ||
      domain.split('.')[0] === 'lvh' ||
      domain.split('.')[0] === 'www'
    ) {
      localStorage.removeItem('subDomain')
    } else {
      localStorage.setItem('subDomain', domain.split('.')[0]);

    }
  }
}
