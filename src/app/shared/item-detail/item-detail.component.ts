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
  public cartPreviouseState:boolean=false;
  constructor(
    private help: HelperService,
    private cd: ChangeDetectorRef,
    private store: Store<{ cart: CartState }>
  ) {}
  cartItem: boolean = false;
  addOnsArray: any = [];
  ngOnChanges(changes: SimpleChanges) {
    console.log('hello',this.data);
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
          });
        });
    }, 500);
  }
  back() {
    UniversalService.itemDetailView.next(false);
    if(this.cartPreviouseState){
      UniversalService.cartShow.next(true);
    }
  }
  async observe() {
    UniversalService.cartPreviousState.subscribe((res: boolean) => {
        this.cartPreviouseState = res;
      this.cd.detectChanges();
    });
  }
}
