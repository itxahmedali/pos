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
import { addItem, resetCart } from 'src/app/store/actions/cart.action';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DiscountGst } from 'src/classes';
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
  previouseOrdersId: any = null;
  gst: string;
  discount: string;
  constructor(
    private modalService: NgbModal,
    private cd: ChangeDetectorRef,
    private help: HelperService,
    private http: HttpService,
    private authService: AuthService,
    private store: Store<{ cart: CartState }>,
    private toaster:ToastrService,
    private helper:HelperService
  ) {}
  async ngOnInit() {
    await this.getGstAndDiscount()
    await this.store
      .select((state) => state.cart.items)
      .subscribe(async(items: any) => {
        await items?.map(async(item:any,index:number)=>{
          let prices:any = []
          if(item?.addOns?.length){
            prices.push({itemPrce:item?.details?.price})
            item?.addOns?.map((addOnItem:any)=>{
              prices.push({addOnPrice:addOnItem?.item?.price,addOnQuantity:addOnItem?.quantity})
            })
            const price = this.getTotalPrice(prices)
            item = { ...item, details: { ...item.details, price: price } };
          }
          await this.CartItems.push(item)
        })
        const prevousItem = this.CartItems[0];
        if (prevousItem?.orderId) {
          this.previouseOrdersId = prevousItem?.orderId;
        }
        this.sum = await this.calculateTotalPrice(this.CartItems);
        this.grandTotal = await this.sum + this.sum * (Number(this.gst) / 100);
        if (Number(this.discount) > 0) {
          this.grandTotal =
            this.grandTotal - this.grandTotal * (Number(this.discount) / 100);
        }
      });
    this.role = await localStorage.getItem('role');
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
  async getGstAndDiscount(){
    await this.helper.getDiscountGst()?.then(async(gstDiscount: DiscountGst) => {
      this.gst = gstDiscount?.GST;
      if(gstDiscount?.all_menu_discount == '1'){
        this.discount = await gstDiscount?.discount;
      }
      else{
        this.discount = '0';
      }
    })
  }
  cartshow() {
    UniversalService.cartShow.next(false);
  }
  checkout(reason: string) {
    UniversalService.checkoutModal.next(reason);
  }
  async getOrders() {
    this.previouseOrders = await this.help.getOrders();
  }
  save() {
    const items = this.CartItems.reduce((acc: any, item: any) => {
      const newItem = { ...item.details, quantity: item.quantity };
      if (item.addOns && item.addOns.length > 0) {
        newItem.addOns = item.addOns.map((addOn: any) => ({
          ...addOn.item,
          quantity: addOn.quantity,
        }));
      }
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
    if (this.previouseOrdersId) {
      data['id'] = this.previouseOrdersId;
    }
    this.http.loaderPost('add-order', data, false).subscribe((res: any) => {
      this.store.dispatch(resetCart());
      this.proceed()
      this.modalClose()
      this.cartshow()
      this.toaster.success(res?.message)
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
  async editOrder(id: any) {
    this.store.dispatch(resetCart());
    this.previouseOrders = await this.help.getOrders();
    const previousItems = this.previouseOrders.find(
      (item: any) => id == item.id
    );
    if (previousItems) {
      await previousItems?.items?.map((item: any) => {
        const previousItem = item;
        this.store.dispatch(
          addItem({
            item: {
              name: previousItem.name,
              quantity: previousItem.quantity,
              addOns: previousItem.addons_id_list,
              details: previousItem,
              orderId: previousItems.id,
            },
          })
        );
      });
    }
  }
  getTotalPrice(items: any) {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.itemPrce) {
        total += parseFloat(item.itemPrce);
      }
      if (item.addOnPrice) {
        total += parseFloat(item.addOnPrice) * item.addOnQuantity;
      }
    }
    return total;
  }
}
