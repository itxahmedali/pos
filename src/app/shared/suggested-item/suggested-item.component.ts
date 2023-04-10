import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OwlOptions } from 'ngx-owl-carousel-o/public_api';
import { fadeIn } from 'src/animations/itemCardAnimation';
import { addAddOn, addItem } from 'src/app/store/actions/cart.action';
import { CartState } from 'src/app/store/state';
@Component({
  selector: 'app-suggested-item',
  templateUrl: './suggested-item.component.html',
  styleUrls: ['./suggested-item.component.scss'],
  animations:[fadeIn,
    trigger('activeSlide', [
      state('active', style({
        transform: 'scale(1)',
        opacity: 1,
      })),
      state('inActive', style({
        transform: 'scale(0.7)',
        opacity: 0.8,
      })),
      transition('active => inActive', [
        animate('0.5s')
      ]),
      transition('inActive => active', [
        animate('0.5s')
      ])
    ])]
})

export class SuggestedItemComponent implements OnInit {
  @Input() data: any;
  @Input() title: any;
  @Input() parentItem: any;
  public index:number = 0;
  public MenuItems: any[] = [];
  constructor(private store: Store<{ cart: CartState }>) { }
  customOptions: OwlOptions = {
    loop: true,
    autoWidth: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    slideTransition:'fade',
    autoplay:true,
    center: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  ngOnInit(): void {
    this.MenuItems = this.data
  }
  addItem(item:any){
    this.store.dispatch(addItem({ item: { name: item?.name, quantity: 1, addOns:[], details:item, orderId:null }}))
  }
  addOn(item:any){
    this.index++
    const itemName = this.parentItem;
    const addOn = {
      item: item,
      parentItem: this.parentItem,
      index: this.index,
      category: 'addOn',
    };
    console.log(addOn)
    this.store.dispatch(addAddOn({ itemName, addOn }));
  }
}
