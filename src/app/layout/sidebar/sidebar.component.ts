import { HelperService } from './../../services/helper.service';
import { NavigationEnd, Router } from '@angular/router';
import { UniversalService } from './../../services/universal.service';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import * as $ from 'jquery';
import { Location } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';
import { Setting } from 'src/classes';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  public sidebarEnable: boolean = false;
  public serviceheading: any;
  public href!: string;
  public role: any;
  public logo: any;
  public id: any;
  public routes:any = localStorage.getItem('routes')
  public menuItems:any = JSON.parse(this.routes)
  constructor(private location: Location, private cd: ChangeDetectorRef, private http:HttpService,private helper:HelperService) {
    this.href = this.location.path();
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
  }
  async ngOnInit() {
    await this.observe();
    await this.getData();
    await this.getSettings();
  }
  async getData() {
    let data = localStorage.getItem('domainId');
    if (data) {
      this.id = await JSON.parse(data);
    } else return;
  }
  async getSettings() {
    if(localStorage.getItem('domainId')){
    await this.helper.getSettings()?.then((settings: Setting) => {
      this.logo = settings?.logo
    })
  }
  }
  // Click Toggle menu
  routerHead(event: any, heading: any) {
    UniversalService.headerHeading.next(heading);
    let path = heading.replace(/[\s,]/g, '');
    UniversalService.itemDetailView.next(false);
    localStorage.setItem('heading', heading);
    if (
      $(event?.target?.parentNode?.parentNode?.parentNode).hasClass(
        'activeSide'
      ) &&
      heading == this.serviceheading
    ) {
      $('li').removeClass('activeSideMenulink');
      $(event?.target?.parentNode?.parentNode?.parentNode).addClass(
        'activeSideMenulink'
      );
    }
    if (event != null) {
      UniversalService.cartShow.next(false);
    }
  }
  toggletNavActive(item: any) {
    if (!item.active) {
      this.menuItems.forEach((a: any) => {
        if (this.menuItems.includes(item)) {
          a.active = false;
        }
        if (!a.children) {
          return false;
        }
        a.children.forEach((b: any) => {
          if (a.children.includes(item)) {
            b.active = false;
          }
        });
      });
    }
    item.active = !item.active;
  }
  async observe() {
    UniversalService.settingLoad.subscribe((res: boolean) => {
      this.getSettings();
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
    UniversalService.logoUpdated.subscribe(
      (res:any) => {
        this.logo = res
        this.cd.detectChanges();
      }
    );
  }
}
