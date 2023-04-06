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
import Swal from 'sweetalert2';
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
  private role: any;
  public categories: any = localStorage.getItem('categories');
  public sidebarEnable: boolean = false;
  public expanded!: boolean;
  public expandedBody!: boolean;
  public show: boolean = true;
  public menuItems: any;
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
        { path: 'sub-category', title: 'Sub Category', type: 'link' },
        { path: 'add-ons', title: 'Add Ons', type: 'link' },
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
    @Inject(DOCUMENT) private document: Document,
    private cd: ChangeDetectorRef,
    private router: Router,
    private helper: HelperService
  ) {
    this.init();
  }
  private async init() {
    await this.helper.getSubDomain();

    if (this.helper.getRole(window.location.href)) {
      this.role = this.helper.getRole(window.location.href);
    } else {
      this.role = localStorage.getItem('role');
    }

    if (this.role == 'customers') {
      await this.getCategories();
    }
    else{
      LoaderService.loader.next(false)
    }
    this.router.events.subscribe(() => {
      if (localStorage.getItem('loginstate')) {
        this.setMenu();
      }
    });
  }
  ngOnInit(): void {
    if (window.innerWidth < 415) {
      this.expanded = false;
      this.expandedBody = false;
    }
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
  setMenu() {
    if (this.role == 'customers') {
      this.categories = localStorage.getItem('categories');
      this.categories = JSON.parse(this.categories);
      let menu: any = [];
      if (this.categories) {
        this.categories?.map((e: any) => {
          if (e?.sub_category?.length) {
            const children = e.sub_category.map((subCat: any) => ({
              path: subCat.name?.toLowerCase()?.replace(/\s/g, ''),
              title: subCat.name,
              type: 'link',
            }));

            menu?.push({
              title: e?.name,
              type: 'sub',
              icon: e?.image,
              active: false,
              children,
            });
          } else {
            menu?.push({
              title: e?.name,
              path: e?.name?.toLowerCase()?.replace(/\s/g, ''),
              type: 'link',
              icon: e?.image,
              active: false,
            });
          }
        });
      }
      this.menuItems = menu;
    }
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
    localStorage.setItem('routes', JSON.stringify(this.menuItems));
  }
  async getCategories() {
    this.categories = await this.helper.getCategory();
  }
}
