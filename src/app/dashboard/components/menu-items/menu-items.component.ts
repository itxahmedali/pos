import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';
import { UniversalService } from 'src/app/services/universal.service';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.scss'],
})
export class MenuItemsComponent {
  public Menus: any = [];
  public CartItems: any = [
    {
      img: 'assets/menu items/soup.webp',
      item: 'Chicken Soup',
      description:
        'Soup is a primarily liquid food, generally served …of meat or vegetables with stock, milk, or water.',
      price: 80,
    },
  ];
  public MenuSelected: any;
  public itemDetailView: boolean = false;
  public itemDetail: any;
  public categories: any;
  constructor(
    private cd: ChangeDetectorRef,
    private route: Router,
    private helper: HelperService
  ) {
    this.getCategories();


  }

  async getCategories() {
    await this.helper.getCategories()?.then((category: any) => {
      this.categories = category;
    });
    let categories: any = [];
    let foodItems: any = [];
    let subCategories: any = [];
    let menu:any = []
    await this.helper.getFoodItems(categories, foodItems, subCategories)
    foodItems?.map((e: any) => {
      if (e?.item?.length) {
        const items = e.item;
        menu?.push({
          name: e?.category,
          items,
        });
      }
    });

    this.Menus = menu;
  }
  ngOnInit(): void {
    this.observe()
  }
  async observe() {
    UniversalService.cartShow.subscribe((res) => {
      if (res) {
        this.Menus.map((e: any) => {
          const word = JSON.stringify(localStorage.getItem('heading')).replace(
            / /g,
            '_'
          );
          if (e.hasOwnProperty(word)) {
            this.MenuSelected = e[word];
          }
        });
      }
      this.cd.detectChanges();
    });
    UniversalService.itemDetailView.subscribe((res) => {
      if (res) {
        this.itemDetailView = true;
      } else {
        this.itemDetailView = false;
      }
      this.cd.detectChanges();
    });
    UniversalService.itemDetail.subscribe((res) => {
      if (res) {
        this.itemDetail = res;
      } else {
        this.itemDetail = res;
      }
      this.cd.detectChanges();
    });
  }
}
