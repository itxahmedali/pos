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
  public menuItems: any;
  public sidebarEnable: boolean = false;
  public serviceheading: any;
  public href!: string;
  public role: any;
  public menuItem = [
    {
      path: 'starters',
      title: 'Starters',
      icon: 'assets/sidebarIcons/starter.webp',
      type: 'link',
    },
    {
      title: 'Main Course',
      type: 'sub',
      icon: 'assets/sidebarIcons/maincourse.webp',
      active: false,
      children: [
        { path: 'fastFood', title: 'Fast Food', type: 'link' },
        { path: 'bbq', title: 'BBQ', type: 'link' },
      ],
    },
    {
      path: 'beverages',
      title: 'Beverages',
      icon: 'assets/sidebarIcons/beverages.webp',
      type: 'link',
    },
    {
      path: 'desserts',
      title: 'Desserts',
      icon: 'assets/sidebarIcons/dessert.webp',
      type: 'link',
    },
  ];
  public kitchenItem = [
    {
      path: 'orders',
      title: 'Orders',
      icon: 'assets/sidebarIcons/starter.webp',
      type: 'link',
    },
    {
      path: 'menu',
      title: 'Menu',
      icon: 'assets/sidebarIcons/starter.webp',
      type: 'link',
    },
  ];
  public counterItem = [
    {
      path: 'orders',
      title: 'Orders',
      icon: 'assets/sidebarIcons/starter.webp',
      type: 'link',
    },
    {
      title: 'Menu',
      type: 'sub',
      icon: 'assets/sidebarIcons/maincourse.webp',
      active: false,
      children: [
        {
          path: 'fastFood',
          title: 'Fast Food',
          type: 'link',
          icon: 'fa-minus',
        },
        { path: 'bbq', title: 'BBQ', type: 'link', icon: 'fa-minus' },
        { path: 'addItem', title: 'Add Item', type: 'link', icon: 'fa-plus' },
        {
          path: 'addCategory',
          title: 'Category',
          type: 'link',
          icon: 'fa-plus',
        },
      ],
    },
    {
      path: 'staff',
      title: 'Staff',
      icon: 'assets/sidebarIcons/starter.webp',
      type: 'link',
    },
    {
      path: 'sale&expenses',
      title: 'Sale & Expenses',
      icon: 'assets/sidebarIcons/starter.webp',
      type: 'link',
    },
    {
      path: 'reportings',
      title: 'Reportings',
      icon: 'assets/sidebarIcons/starter.webp',
      type: 'link',
    },
    {
      path: 'bookings',
      title: 'Bookings',
      icon: 'assets/sidebarIcons/starter.webp',
      type: 'link',
    },
    {
      path: 'support',
      title: 'Support',
      icon: 'assets/sidebarIcons/starter.webp',
      type: 'link',
    },
  ];
  public masterItem = [
    {
      path: 'overview',
      title: 'Overview',
      icon: 'assets/sidebarIcons/starter.webp',
      type: 'link',
    },
    {
      title: 'items',
      type: 'sub',
      icon: 'assets/sidebarIcons/maincourse.webp',
      active: false,
      children: [
        { path: 'foodItems', title: 'Food Items', type: 'link' },
        { path: 'category', title: 'Category', type: 'link' },
      ],
    },
    {
      path: 'staff',
      title: 'Staff',
      icon: 'assets/sidebarIcons/dessert.webp',
      type: 'link',
    },
    {
      path: 'sale&expenses',
      title: 'Sale & Expenses',
      icon: 'assets/sidebarIcons/starter.webp',
      type: 'link',
    },
    {
      path: 'setting',
      title: 'Setting',
      icon: 'assets/sidebarIcons/dessert.webp',
      type: 'link',
    },
    {
      path: 'orderStatus',
      title: 'Order Status',
      icon: 'assets/sidebarIcons/dessert.webp',
      type: 'link',
    },
    {
      path: 'customerData',
      title: 'Customer Data',
      icon: 'assets/sidebarIcons/dessert.webp',
      type: 'link',
    },
    {
      path: 'createDiscount',
      title: 'Create Discount',
      icon: 'assets/sidebarIcons/dessert.webp',
      type: 'link',
    },

    {
      path: 'staffPayroll',
      title: 'Staff Payroll',
      icon: 'assets/sidebarIcons/dessert.webp',
      type: 'link',
    },
    {
      path: 'inventory',
      title: 'Inventory',
      icon: 'assets/sidebarIcons/dessert.webp',
      type: 'link',
    },
    {
      path: 'support',
      title: 'Support',
      icon: 'assets/sidebarIcons/dessert.webp',
      type: 'link',
    },
    {
      path: 'reporting',
      title: 'Reporting',
      icon: 'assets/sidebarIcons/dessert.webp',
      type: 'link',
    },
  ];
  constructor(
    private location: Location,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.href = this.location.path();
    if (
      this.href == '/welcome-counter' ||
      this.href.split('/')[1] == 'counter'
    ) {
      UniversalService.headerHeading.next('Orders');
      this.role = localStorage.getItem('role');
    }
    if (this.href == '/welcome-customers' || this.href == '/customers') {
      UniversalService.headerHeading.next('Starters');
      this.role = localStorage.getItem('role');
    }
    if (this.href == '/welcome-waiters' || this.href == '/waiters') {
      UniversalService.headerHeading.next('Starters');
      this.role = localStorage.getItem('role');
    }
    if (
      this.href == '/welcome-kitchen' ||
      this.href.split('/')[1] == 'kitchen'
    ) {
      UniversalService.headerHeading.next('Orders');
      this.role = localStorage.getItem('role');
    }
    if (this.href == '/welcome-master' || this.href.split('/')[1] == 'master') {
      this.role = localStorage.getItem('role');
    }
    this.role = localStorage.getItem('role');
    if (this.role == 'customers') this.menuItems = this.menuItem;
    if (this.role == 'waiters') {
      this.menuItems = this.menuItem;
      if (!localStorage.hasOwnProperty('orderview')) {
        localStorage.setItem('orderview', 'true');
      }
    }
    if (this.role != 'waiters') {
      if (!localStorage.hasOwnProperty('orderview')) {
        localStorage.setItem('orderview', 'false');
      }
    }
    if (this.role == 'kitchen') {
      this.menuItems = this.kitchenItem;
    }
    if (this.role == 'counter') {
      this.menuItems = this.counterItem;
    }
    if (this.role == 'master') {
      this.menuItems = this.masterItem;
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

  // Click Toggle menu
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
  routerHead(event: any, heading: any) {
    UniversalService.headerHeading.next(heading);
    let path = heading.replace(/[\s,]/g, '');
    this.menuItems?.map((e: any) => {
      if (e?.type == 'sub') {
        e?.children?.map((v: any) => {
          if (v.title == heading) {
            UniversalService.routePath.next('menu');
            localStorage.setItem('specialMenu', 'menu');
          } else {
            // localStorage.removeItem('specialMenu')
            return;
          }
        });
      }
      if (e?.type != 'sub' && e.title == heading) {
        UniversalService.routePath.next(path?.toLowerCase());
        localStorage.removeItem('specialMenu');
      }
    });
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
  async observe() {
    UniversalService.headerHeading.subscribe(
      (res: string) => {
        this.menuItems?.map((e: any) => {
          if (e.title == res) {
            e['active'] = true;
          } else {
            e['active'] = false;
          }
        });
        this.serviceheading = res;
        this.cd.detectChanges();
      },
      (err: any) => console.log(err)
    );
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
