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
  public routes:any = localStorage.getItem('routes')
  public menuItems:any = JSON.parse(this.routes)
  constructor(private location: Location, private cd: ChangeDetectorRef) {
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
  ngOnInit(): void {
    this.observe();
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
  // parentActive(event:any){
  //   // $(event.target.parentNode)
  //   // console.log((event.target.parentNode.parentNode.parentNode.parentNode.parentNode).find('.sidebar-title'));
  //   $($(event.target.parentNode.parentNode.parentNode.parentNode.parentNode)).find('.sidebar-title').addClass('linkActive')

  // }
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
  }
}
