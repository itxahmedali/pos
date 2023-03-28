import { HelperService } from './../../services/helper.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { headerAnimation } from './../../../animations/headerAnimation';
import { UniversalService } from './../../services/universal.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { CartState } from 'src/app/store/reducers/cart.reducer';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [headerAnimation],
})
export class HeaderComponent implements OnInit {
  public heading: any;
  public href: string = 'null';
  public cartButton: boolean = false;
  public cartButtonShow: boolean = true;
  public headingShow: boolean = true;
  public waiter: any = false;
  public modalReference: any;
  public CartItemsLength: any;
  public sidebarEnable: boolean = true;
  constructor(
    private modalService: NgbModal,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private helper: HelperService,
    private location: Location,
    private router: Router,
    private store: Store<{ cart: CartState }>
  ) {
    router.events.subscribe((val) => {
      this.text = this.helper.addSpaces(
        Number(
          router?.url
            ?.split('/')
            ?.[router?.url?.split('/')?.length - 1]?.replace(/-/g, ' ')
        )
          ? router?.url
              ?.split('/')
              ?.[router?.url?.split('/')?.length - 2]?.replace(/-/g, ' ')
          : router?.url
              ?.split('/')
              ?.[router?.url?.split('/')?.length - 1]?.replace(/-/g, ' ')
      );
    });
    this.heading = Number(
      router?.url
        ?.split('/')
        ?.[router?.url?.split('/')?.length - 1]?.replace(/-/g, ' ')
    )
      ? router?.url
          ?.split('/')
          ?.[router?.url?.split('/')?.length - 2]?.replace(/-/g, ' ')
      : router?.url
          ?.split('/')
          ?.[router?.url?.split('/')?.length - 1]?.replace(/-/g, ' ');
    this.store
      .select((state) => state.cart.items)
      .subscribe((items) => {
        const qunatity = this.sumQunatityOfItems(items);
        this.CartItemsLength = qunatity;
      });
  }
  text: any;
  public expanded: boolean;
  ngOnInit(): void {
    if (window.innerWidth < 415) {
      this.expanded = false;
    } else {
      this.expanded = true;
    }

    this.checkUrl();
    this.observe();
    if (
      localStorage.getItem('role') == 'counter' ||
      localStorage.getItem('role') == 'kitchen' ||
      localStorage.getItem('role') == 'master'
    ) {
      this.cartButtonShow = false;
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
  }
  async observe() {
    // UniversalService.headerHeading.subscribe((res: string) => {
    //   this.changeText();
    //   this.heading = res;
    //   this.cd.detectChanges();
    // });
    UniversalService.cartShow.subscribe((res: boolean) => {
      if (res) {
        this.headingShow = false;
        this.cartButton = true;
        localStorage.setItem('cart', 'true');
      } else {
        this.headingShow = true;
        this.cartButton = false;
        localStorage.setItem('cart', 'false');
      }
      this.cd.detectChanges();
    });
    UniversalService.modules.subscribe((res: boolean) => {
      if (res) {
        this.checkUrl();
      }
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
  }

  currentState = 'hidden';

  changeText() {
    this.currentState = 'hidden';
  }
  animationFinished(event: AnimationEvent) {
    if (event.fromState === 'void' && event.toState === 'hidden') {
      this.text = this.heading;
      this.currentState = 'visible';
    } else if (event.fromState === 'visible' && event.toState === 'hidden') {
      this.text = this.heading;
      this.currentState = 'visible';
    }
  }
  cartShow() {
    this.cartButton = !this.cartButton;
    if (this.cartButton) {
      UniversalService.cartShow.next(true);
    } else {
      UniversalService.cartShow.next(false);
    }
  }
  logout() {
    this.authService.logout();
  }
  checkUrl() {
    this.href = this.location.path();
    this.waiter = this.helper.urlCheck(this.href, 'waiters', 'waiters');
  }
  myOrders() {
    UniversalService.cartShow.next(false);
    UniversalService.Orders.next(true);
    UniversalService.SideBar.next(false);
  }
  open(content: any, modal: any) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
      size: 'md',
    });
  }
  proceed() {
    this.modalReference.close();
  }
  sumQunatityOfItems(array: Array<any>) {
    let sum = 0;
    for (let i = 0; i < array.length; i += 1) {
      sum += array[i]?.quantity;
    }

    return sum;
  }
}
