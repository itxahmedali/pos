import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { UniversalService } from './../../services/universal.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';
import { HelperService } from 'src/app/services/helper.service';
import { CartState } from 'src/app/store/reducers/cart.reducer';
import { Store } from '@ngrx/store';
import { resetCart } from 'src/app/store/actions/cart.action';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  modalReference: any;
  CartItems: any = [];
  sum: number = 0;
  role: any;
  grandTotal: any = 0;
  previouseOrders: any;
  gst: string;
  discount: string;
  constructor(
    private modalService: NgbModal,
    private cd: ChangeDetectorRef,
    private help: HelperService,
    private http: HttpService,
    private authService: AuthService,
    private store: Store<{ cart: CartState }>
  ) {
    this.store
      .select((state) => state.cart.items)
      .subscribe((items) => {
        this.CartItems = items;
        this.sum = this.calculateTotalPrice(items);
        this.grandTotal = this.sum - this.sum * 0.13;
      });
    console.log(this.CartItems);
  }
  async ngOnInit() {
    const gstAndDiscount = await this.help.getGstDiscount();
    this.gst = gstAndDiscount.GST;
    this.discount = gstAndDiscount.discount;

    this.role = localStorage.getItem('role');
    if (localStorage.getItem('modal')) {
      if (localStorage.getItem('modal') == 'checkout') {
        $('#checkoutBtn').trigger('click');
      }
      if (localStorage.getItem('modal') == 'thanks') {
        $('#proceedModal').trigger('click');
      }
      if (localStorage.getItem('modal') == 'viewOrder') {
        $('#viewOrder').trigger('click');
      }
      if (localStorage.getItem('modal') == 'completed') {
        $('#completed').trigger('click');
      }
    }
    await this.getOrders();
  }
  cartshow() {
    UniversalService.cartShow.next(false);
  }
  checkout(reason: string) {
    UniversalService.checkoutModal.next(reason);
  }
  getOrders() {
    const data = {
      domain_id: localStorage.getItem('domainId'),
      customer_id: localStorage.getItem('customer_id'),
      customer_secret: localStorage.getItem('customer_secret'),
    };
    this.http
      .loaderPost('get-order-customer', data, false)
      .subscribe((res: any) => {
        if (res?.data) {
          this.previouseOrders = res?.data;
        }
        console.log(this.previouseOrders, 'this.previouseOrders');
      });
  }
  save() {
    const items = this.CartItems.reduce((acc: any, item: any) => {
      const newItem = { ...item.details, quantity: item.quantity };
      acc.push(newItem);
      return acc;
    }, []);
    const data: any = {
      domain_id: localStorage.getItem('domainId'),
      items: JSON.stringify(items),
      total: this.grandTotal,
      gst: this.gst,
      discount: this.discount,
      customer_id: localStorage.getItem('customer_id'),
      customer_secret: localStorage.getItem('customer_secret'),
      table_id: 1,
    };
    this.http.loaderPost('add-order', data, false).subscribe((res: any) => {
      // this.getOrders()
      // this.store.dispatch(addItem({ item: { name: item?.name, quantity: 1, addOns:[], details:item }}))
      this.store.dispatch(resetCart());
    });
  }
  open(content: any, modal: string) {
    localStorage.setItem('modal', modal);
    if (modal == 'checkout') {
      this.modalReference = this.modalService.open(content, {
        centered: true,
        backdrop: 'static',
        windowClass: 'checkoutModal',
      });
    }
    if (modal == 'thanks') {
      this.modalReference = this.modalService.open(content, {
        centered: true,
        backdrop: 'static',
        windowClass: 'checkoutModal',
        size: 'lg',
      });
    }
    if (modal == 'viewOrder') {
      this.modalReference = this.modalService.open(content, {
        centered: true,
        backdrop: 'static',
        windowClass: 'checkoutModal',
        size: 'md',
      });
    }
    if (modal == 'completed') {
      this.modalReference = this.modalService.open(content, {
        centered: true,
        backdrop: 'static',
        windowClass: 'checkoutModal',
      });
    }
  }
  modalClose() {
    localStorage.removeItem('modal');
  }
  proceed() {
    this.modalReference.close();
  }
  complete() {
    UniversalService.cartShow.next(false);
    this.authService.logout();
  }
  calculateTotalPrice(items: any) {
    let totalPrice = 0;
    items.forEach((item: any) => {
      if (item.quantity > 1) {
        totalPrice += Number(item?.details?.price) * item.quantity;
      } else {
        totalPrice += Number(item?.details?.price);
      }
    });
    return totalPrice;
  }
}
