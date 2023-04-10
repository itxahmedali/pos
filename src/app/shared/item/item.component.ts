import { UniversalService } from './../../services/universal.service';
import { Component, OnInit, Input, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { fadeIn } from 'src/animations/itemCardAnimation';
import { Store } from '@ngrx/store';
import { addItem } from 'src/app/store/actions/cart.action';
import { CartState } from 'src/app/store/reducers/cart.reducer';
import { Router } from '@angular/router';

export interface Menu {
  img: string;
  item: string;
  description: string;
  price: number;
}
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn],
})
export class ItemComponent implements OnInit {
  @Input() data: any;
  public MenuItems: any[] = [];
  public ItemNames: any[] = [];
  public MenuItemsAnimate: Menu[] = [];
  public ItemNamesAnimate: any[] = [];
  public CartItems:any = [];
  public PreviousCartItems:any = [];
  public previousItems:any;
  cartItems: any[];
  public url!:string;
  constructor(private cd:ChangeDetectorRef, private store: Store<{ cart: CartState }>,private route:Router) {
  }
  ngOnChanges(changes: any) {
    const url = window.location.pathname.split('/')[2];
    changes.data.currentValue?.map((e:any)=>{
      if (e?.name?.toLowerCase()?.replace(/ /g, '') == url) {
        this.MenuItems = e.items;
      }
    })
  }

  ngOnInit(): void {
  }
  viewDetail(item:any){
    UniversalService.itemDetailView.next(true)
    UniversalService.itemDetail.next(item)
    UniversalService.cartPreviousState.next(false);
  }
  addItem(item:any){
    this.store.dispatch(addItem({ item: { name: item?.name, quantity: 1, addOns:[], details:item, orderId:null }}))
  }
}
