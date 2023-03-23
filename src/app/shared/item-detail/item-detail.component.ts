import { UniversalService } from './../../services/universal.service';
import { fadeIn } from './../../../animations/itemCartAnimation';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as $ from 'jquery';
import { HelperService } from 'src/app/services/helper.service';
import { addAddOn } from 'src/app/store/actions/cart.action';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/models/state.model';
import { CartState } from 'src/app/store/reducers/cart.reducer';
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  animations: [fadeIn],
})
export class ItemDetailComponent implements OnInit {
  @Input() data: any;
  public alternateData: any;
  public firstName: string;
  public lastName: string;
  public cartItemAddOns: Array<any>;
  public cartPreviouseState:boolean=false;
  constructor(
    private help: HelperService,
    private cd: ChangeDetectorRef,
    private store: Store<{ cart: CartState }>
  ) {}
  public addOns: any = [
    { name: 'Extra Beef Patty', value: 0 },
    { name: 'Extra Chicken Patty', value: 0 }
  ];
  countersAdd = Array(this.addOns.length).fill(0);
  countersDrinks = Array(this.addOns.length).fill(0);
  public drinks: any = [
    { name: '7Up', value: 0 },
    { name: 'Pepsi', value: 0 },
    { name: 'Coca Cola', value: 0 },
    { name: 'Mirinda', value: 0 },
    { name: 'Sprite', value: 0 },
  ];
  public suggestedItems:any = [{
    img: 'assets/menu items/baconring.webp',
    item: 'Bacon Rings',
    description: 'Wrap 2 slices of bacon through the middle of each onion ring and fully around to cover, leaving the center of the ring open',
    price: 50,
  },
  {
    img: 'assets/menu items/soup.webp',
    item: 'Chicken Soup',
    description: 'Soup is a primarily liquid food, generally served warm or hot (but may be cool or cold), that is made by combining ingredients of meat or vegetables with stock, milk, or water.',
    price: 80,
  },
  {
    img: 'assets/menu items/salad.webp',
    item: 'Mixed Salad',
    description: 'A salad is a dish consisting of mixed, mostly natural ingredients with at least one raw ingredient.',
    price: 150,
  },
  {
    img: 'assets/menu items/wonton.webp',
    item: 'Chicken Wonton',
    description: 'Wonton are Chinese dumpling filled with meat, typically served in a flavorful clear broth or dressed in sauce.',
    price: 250,
  }]
  cartItem: boolean = false;
  addOnsArray: any = [];
  ngOnChanges(changes: SimpleChanges) {
    this.firstName = this.data?.item?.split(' ')[0];
    this.lastName = this.data?.item?.split(' ')[1];
  }
  increment(
    index: number,
    counterArray:any,
    item: any,
    parentItem: any,
    category: string
  ) {
    counterArray[index]++;
    if (category == 'addOn') {
      var number = 0;
      this.addOns[index].value = number++;
    } else {
      var number = 0;
      this.drinks[index].value = number++;
    }
    const itemName = parentItem;
    const addOn = {
      item: item,
      parentItem: parentItem,
      index: index,
      category: category,
    };
    this.store.dispatch(addAddOn({ itemName, addOn }));
  }

  decrement(
    index: number,
    counterArray:any,
    item: any,
    parentItem: any,
    category: string
  ) {
    if (counterArray[index] > 0) {
      counterArray[index]--;
      const itemName = parentItem;
      const addOn = {
        item: item,
        parentItem: parentItem,
        index: index,
        category: category,
      };
      this.store.dispatch(addAddOn({ itemName, addOn }));
    }
  }
  ngOnInit(): void {
    this.observe()
    setTimeout(() => {
      this.store
        .select((state) => state.cart.items)
        .subscribe((items) => {
          UniversalService.itemDetail.subscribe((res: any) => {
            this.data = items?.filter((item) => item == res);
          });
          items?.map((e: any) => {
            if (this.data?.item == e?.name) {
              this.cartItem = true;
            }
            this.cartItemAddOns = e?.addOns;
          });
          this.cartItemAddOns?.map((add: any) => {
            if (
              add?.category == 'addOn' &&
              add?.parentItem == this.data?.item
            ) {
              this.countersAdd[add?.index] = add?.quantity;
            }
            if (
              add?.category == 'drinks' &&
              add?.parentItem == this.data?.item
            ) {
              this.countersDrinks[add?.index] = add?.quantity;
            }
          });
        });
    }, 500);
  }
  back() {
    UniversalService.itemDetailView.next(false);
    if(this.cartPreviouseState){
      UniversalService.cartShow.next(true);
    }
    console.log(this.cartPreviouseState,"please");

  }
  async observe() {
    UniversalService.cartPreviousState.subscribe((res: boolean) => {
        this.cartPreviouseState = res;
    console.log(this.cartPreviouseState,"please");
      this.cd.detectChanges();
    });
  }
}
