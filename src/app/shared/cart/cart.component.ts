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
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  modalReference: any;
  CartItems: any = [];
  duplicateItem: any = [];
  sum: number = 0;
  role: any;
  grandTotal: any = 0;
  currentOrderNo = 1; // initialize to 1 as the first order
  constructor(
    private modalService: NgbModal,
    private cd: ChangeDetectorRef,
    private help: HelperService,
    private http: HttpService,
    private store: Store<{ cart: CartState }>
  ) {
    this.store
      .select((state) => state.cart.items)
      .subscribe((items) => {
        this.CartItems = items;
        this.sum = this.calculateTotalPrice(items);
        this.grandTotal = this.sum - this.sum * 0.13;
      });
  }
  reorder() {
    this.currentOrderNo++;
    // this.CartItems.push(`Order ${this.currentOrderNo}`);
  }
  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.duplicateItem = [];
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
  }
  cartshow() {
    UniversalService.cartShow.next(false);
  }
  checkout(reason: string) {
    UniversalService.checkoutModal.next(reason);
  }
  save() {
    console.log(this.CartItems);
    const items = this.CartItems.reduce((acc: any, item: any) => {
      acc[item.details.id] = item.details;
      return acc;
    }, {});
    const data: any = {
      domain_id: localStorage.getItem('domainId'),
      items: JSON.stringify(items),
      total: this.grandTotal,
      gst: 13,
      discount: 5,
      customer_id: localStorage.getItem('customer_id'),
      customer_secret: localStorage.getItem('customer_secret'),
      table_id: 1,
    };
    this.http.loaderPost('add-order', data, false).subscribe((res: any) => {
      console.log(res);
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
    this.store.dispatch(resetCart());
  }
  calculateTotalPrice(items: any) {
    let totalPrice = 0;
    console.log(items, 'hellonumberItem');

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
