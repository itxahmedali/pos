import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o/public_api';
import { fadeIn } from 'src/animations/itemCardAnimation';
export interface Menu {
  img: string;
  item: string;
  description: string;
  price: number;
}
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
  public MenuItems: Menu[] = [];
  constructor() { }
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
    console.log(this.data,"heloda");
    this.MenuItems = this.data
    this.MenuItems.map(e=>{
      console.log(e,"heloda");
    })
  }

}
