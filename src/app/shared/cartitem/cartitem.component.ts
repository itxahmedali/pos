import { UniversalService } from 'src/app/services/universal.service';
import { Component, OnInit, Input, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { CartState } from 'src/app/store/reducers/cart.reducer';
import { Store } from '@ngrx/store';
import { removeItem } from 'src/app/store/actions/cart.action';

@Component({
  selector: 'app-cartitem',
  templateUrl: './cartitem.component.html',
  styleUrls: ['./cartitem.component.scss']
})
export class CartitemComponent implements OnInit {
  @Input() data: any;
  @Input() showActions: any;
  public duplicateItems: any;
  constructor(private cd: ChangeDetectorRef, private store: Store<{ cart: CartState }>) {}
  ngOnInit(): void {}
  editItem(item: any) {
    this.cartshow()
    UniversalService.itemDetail.next(item)
  }
  cartshow() {
    UniversalService.cartShow.next(false);
    UniversalService.itemDetailView.next(true)
    UniversalService.cartPreviousState.next(true)
  }
  deleteItem(item: any) {
    this.store.dispatch(removeItem({ itemName: item?.name }));
  }
}
