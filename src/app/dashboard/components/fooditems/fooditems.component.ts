import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { fadeIn } from 'src/animations/itemCardAnimation';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';
import { UniversalService } from 'src/app/services/universal.service';

@Component({
  selector: 'app-fooditems',
  templateUrl: './fooditems.component.html',
  styleUrls: ['./fooditems.component.scss'],
  animations: [
    fadeIn,
    trigger('activeSlide', [
      state(
        'active',
        style({
          transform: 'scale(1)',
          opacity: 1,
        })
      ),
      state(
        'inActive',
        style({
          transform: 'scale(0.7)',
          opacity: 0.8,
        })
      ),
      transition('active => inActive', [animate('0.5s')]),
      transition('inActive => active', [animate('0.5s')]),
    ]),
  ],
})
export class FooditemsComponent {
  public Menus: any;
  public MenuSelected: any;
  public Categories: any = [];
  public addMenu: boolean = false;
  public modalReference: any;
  public image: any;
  public data!: any;
  public addOns!: any;
  public duePage!: any;
  public total!: any;
  public searchInput!: any;
  public selectedSort!: any;
  public sorts = [
    { id: 1, name: 'name' },
    { id: 2, name: 'date' },
  ];
  public itemForm: any = this.fb.group({
    name: [null],
    description: [null],
    image: [null],
    price: [null],
    category_id: [null],
  });
  public selectedMenu: any;
  customOptions: OwlOptions = {
    loop: true,
    autoWidth: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    slideTransition: 'fade',
    autoplay: true,
    center: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };
  constructor(
    private modalService: NgbModal,
    private http: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private helper: HelperService
  ) {}
  ngOnInit(): void {
    this.getFoodItems();
  }
  open(content: any, modal: string) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
    });
  }
  exportToExcel(): void {
    this.helper.exportToExcel(this.MenuSelected)
  }
  proceed() {
    this.modalReference.close();
  }
  async getFoodItems() {
    let foodItems: any = [];
    let categories: any = [];
    let subCategories: any = [];
    await this.helper.getFoodItems(categories, foodItems, subCategories)
    foodItems = this.combineArray(foodItems);
    this.Categories = categories;
    this.MenuSelected = foodItems;
    this.addOns = await this.helper.getAddOns()
  }
  async stateItem(event: any, state: string, data: any) {
    this.selectedMenu = this.MenuSelected?.find(
      (e: any) => e?.item?.id == event.id
    );
    if (this.selectedMenu) {
      if (state == 'delete') {
        this.itemForm.patchValue({
          name: this.selectedMenu?.item?.name,
          description: this.selectedMenu?.item?.description,
          price: this.selectedMenu?.item?.price,
          category_id: this.selectedMenu?.item?.category_id,
          image: this.selectedMenu?.item?.image,
        });
        this.itemForm.addControl(
          'id',
          new FormControl(this.selectedMenu?.item?.id)
        );
        this.itemForm.addControl('active_status', new FormControl(0));
      } else {
        this.itemForm.patchValue({
          name: this.selectedMenu?.item?.name,
          description: this.selectedMenu?.item?.description,
          price: this.selectedMenu?.item?.price,
          category_id: this.selectedMenu?.item?.category_id,
          image: this.selectedMenu?.item?.image,
        });
        this.itemForm.addControl(
          'id',
          new FormControl(this.selectedMenu?.item?.id)
        );
        this.itemForm.addControl(
          'out_of_stock',
          new FormControl(data.target.checked ? 1 : 0)
        );
      }
      this.saveCategory();
    }
  }
  async saveCategory() {
    let addOn = this.returnIds(this.addOns);
    let item = this.returnIds(this.MenuSelected);
    if (addOn) {
      this.itemForm.addControl('addons_id', new FormControl(addOn));
    }
    if (item) {
      this.itemForm.addControl('suggested', new FormControl(item));
    }
    await this.http
      .loaderPost('add-item', this.itemForm.value, true)
      .subscribe((res: any) => {
        if (res?.status != 400) {
          this.toastr.success(res?.message);
          this.getFoodItems();
        } else {
          this.toastr.error(res?.message);
        }
        this.itemForm.removeControl('id');
        this.itemForm.removeControl('active_status');
        this.itemForm.removeControl('out_of_stock');
        this.addMenu = false;
      });
  }
  async add(item: any, val: boolean) {
    item['selected'] = val;
  }
  combineArray(originalArray: any) {
    const newArray = originalArray.reduce(
      (accumulator: any, currentValue: any) => {
        return [
          ...accumulator,
          ...currentValue.item.map((item: any) => ({
            category: currentValue.category,
            item,
          })),
        ];
      },
      []
    );
    newArray.forEach((obj: any) => {
      obj.item.category = obj.category;
      delete obj.category;
    });
    return newArray;
  }
  upload(event: any) {
    this.helper
      .fileUploadHttp(event)
      .then((result: any) => {
        this.image = result.data.image_url;
        this.itemForm.patchValue({
          image: result.data.image_url,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  returnIds(array: []) {
    this.itemForm.removeControl('suggested');
    this.itemForm.removeControl('addons_id');
    let ids: any = [];
    array?.map((e: any) => {
      if (!e?.hasOwnProperty('item')) {
        if (e?.hasOwnProperty('selected')) {
          if (e?.selected) {
            ids.push(e?.id);
          }
        }
      } else {
        if (e?.item?.hasOwnProperty('selected')) {
          if (e?.item?.selected) {
            ids.push(e?.item?.id);
          }
        }
      }
    });
    return ids;
  }
}
