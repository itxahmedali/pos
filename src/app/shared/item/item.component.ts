import { UniversalService } from './../../services/universal.service';
import { Component, OnInit, Input, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { fadeIn } from 'src/animations/itemCardAnimation';
import { Store } from '@ngrx/store';
import { addItem } from 'src/app/store/actions/cart.action';
import { CartState } from 'src/app/store/reducers/cart.reducer';

export interface Menu {
  img: string;
  item: string;
  description: string;
  price: number;
}
export interface Name {
  firstName: string;
  lastName: string;
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
  public MenuItems: Menu[] = [];
  public ItemNames: Name[] = [];
  public MenuItemsAnimate: Menu[] = [];
  public ItemNamesAnimate: Name[] = [];
  public CartItems:any = [];
  public PreviousCartItems:any = [];
  public previousItems:any;
  cartItems: any[];
  constructor(private cd:ChangeDetectorRef, private store: Store<{ cart: CartState }>) {}
  ngOnChanges(changes: SimpleChanges) {
    this.MenuItems = this.data;
    this.data?.map((e: Menu) => {
      this.ItemNames.push({
        firstName: e.item.split(' ')[0],
        lastName: e.item.split(' ')[1],
      });
    });
  }

  ngOnInit(): void {
  }
  viewDetail(item:any){
    UniversalService.itemDetailView.next(true)
    UniversalService.itemDetail.next(item)
    UniversalService.cartPreviousState.next(false);
  }
  addItem(item:any){
    this.store.dispatch(addItem({ item: { name: item?.item, quantity: 1, addOns:[], details:item }}))
  }
}
