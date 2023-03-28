import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { fadeIn } from 'src/animations/itemCardAnimation';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
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
      transition('active => inActive', [animate('.2s')]),
      transition('inActive => active', [animate('.2s')]),
    ]),
  ],
})
export class EditComponent {
  public id!: any;
  public url!: string;
  public pageCondition!: string;
  public MenuSelected: any;
  public selectedMenu: any;
  public addOns: any;
  public Categories: any;
  public image: any;
  public itemForm: any = this.fb.group({
    name: [null],
    description: [null],
    image: [null],
    price: [null],
    category_id: [null],
  });
  public categoryForm: any = this.fb.group({
    name: [null],
    description: [null],
    image: [null],
  });
  public addOnForm: any = this.fb.group({
    name: [null],
    description: [null],
    image: [null],
    price: [null],
  });
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
    private router: Router,
    private fb: FormBuilder,
    private helper: HelperService,
    private http: HttpService,
    private toastr: ToastrService,
    private activatedRouter: ActivatedRoute
  ) {
    this.id = this.activatedRouter.snapshot.paramMap.get('id');
    this.url = router.url.split('/')[2];
    this.pageCondition = router.url.split('/')[3];
    this.itemForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      image: [null, [Validators.required]],
      price: [null, [Validators.required]],
      category_id: [null, [Validators.required]],
    });
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      image: ['null'],
    });
    this.addOnForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      image: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
    this.getData();
  }
  async getData() {
    let data = localStorage.getItem('my_data');
    if (data) {
      await this.getCategory(JSON.parse(data)?.id);
    } else return;
  }
  async saveCategory(event: string) {
    if (event == 'item') {
      let addOn = this.returnIds(this.addOns);
      let item = this.returnIds(this.MenuSelected);
      if (addOn) {
        this.itemForm.addControl('addons_id', new FormControl(addOn));
      }
      if (item) {
        this.itemForm.addControl('suggested', new FormControl(item));
      }
      this.itemForm.addControl(
        'active_status',
        new FormControl(1)
      );
      this.itemForm.addControl(
        'out_of_stock',
        new FormControl(0)
      );
      await this.http
        .loaderPost('add-item', this.itemForm.value, true)
        .subscribe((res: any) => {
          if (res?.status != 400) {
            this.toastr.success(res?.message);
            this.router.navigate(['/dashboard/foodItems']);
          } else {
            this.toastr.error(res?.message);
          }
          this.itemForm.removeControl('id');
          this.itemForm.removeControl('active_status');
          this.itemForm.removeControl('out_of_stock');
        });
    }
    if (event == 'addOn') {
      let domainId: any = localStorage.getItem('my_data');
      this.addOnForm.addControl(
        'domain_id',
        new FormControl(JSON.parse(domainId)?.domain_id)
      );
      this.addOnForm.addControl(
        'active_status',
        new FormControl(1)
      );
      this.addOnForm.addControl(
        'out_of_stock',
        new FormControl(0)
      );
      await this.http
        .loaderPost('add-addon', this.addOnForm.value, true)
        .subscribe((res: any) => {
          if (res?.status != 400) {
            this.toastr.success(res?.message);
            this.router.navigate(['/dashboard/add-ons']);
          } else {
            this.toastr.error(res?.message);
          }
          this.addOnForm.removeControl('id');
          this.addOnForm.removeControl('active_status');
          this.addOnForm.removeControl('out_of_stock');
        });
    } else {
      let domainId: any = localStorage.getItem('my_data');
      this.categoryForm.addControl(
        'domain_id',
        new FormControl(JSON.parse(domainId)?.domain_id)
      );
      this.categoryForm.addControl(
        'active_status',
        new FormControl(1)
      );
      this.categoryForm.addControl(
        'out_of_stock',
        new FormControl(0)
      );
      await this.http
        .loaderPost('add-category', this.categoryForm.value, true)
        .subscribe((res: any) => {
          if (res?.status != 400) {
            this.toastr.success(res?.message);
            this.router.navigate(['/dashboard/category']);
          } else {
            this.toastr.error(res?.message);
          }
          this.categoryForm.removeControl('id');
          this.categoryForm.removeControl('domain_id');
          this.categoryForm.removeControl('active_status');
          this.categoryForm.removeControl('out_of_stock');
        });
    }
  }
  async add(item: any, val: boolean) {
    item['selected'] = val;
  }
  async getCategory(id: number) {
    let foodItems: any = [];
    let categories: any = [];
    if (this.url != 'add-ons') {
      await this.http
        .loaderPost('get-category', { domain_id: id }, true)
        .subscribe((res: any) => {
          res?.data?.map((item: any, index: any) => {
            categories.push({ name: item?.name, id: res?.data?.[index]?.id });
            foodItems.push({ item: item.items, category: item?.name });
          });
          foodItems = this.combineArray(foodItems);
          this.Categories = categories;
          if (this.pageCondition == 'edit') {
            if (this.url == 'foodItems') {
              this.MenuSelected = foodItems;
              this.handleID(this.id, 'foodItem');
            } else {
              this.MenuSelected = res?.data;
              this.handleID(this.id, 'category');
            }
          }
        });
    } else {
      await this.http
        .loaderPost('get-addon', { domain_id: id }, true)
        .subscribe((res: any) => {
          if (this.pageCondition == 'edit') {
            if (this.url == 'add-ons') {
              this.addOns = res?.data;
              this.handleID(this.id, 'add-ons');
            }
          }
        });
    }
  }
  handleID(id: any, event: string) {
    if (event == 'foodItem') {
      this.image = null;
      this.selectedMenu = this.MenuSelected?.find(
        (e: any) => e?.item?.id == id
      );
      if (this.selectedMenu) {
        this.itemForm.addControl(
          'id',
          new FormControl(this.selectedMenu?.item?.id)
        );
        this.itemForm.addControl(
          'active_status',
          new FormControl(this.selectedMenu?.item?.active_status)
        );
        this.itemForm.patchValue({
          name: this.selectedMenu?.item?.name,
          description: this.selectedMenu?.item?.description,
          price: this.selectedMenu?.item?.price,
          category_id: null,
          image: this.selectedMenu?.item?.image,
        });
        this.image = this.selectedMenu?.item?.image;
      }
    }
    if (event == 'add-ons') {
      this.selectedMenu = this.addOns?.find((e: any) => e?.id == id);
      this.addOnForm.addControl('id', new FormControl(this.selectedMenu?.id));
      this.addOnForm.addControl(
        'active_status',
        new FormControl(this.selectedMenu?.active_status)
      );
      this.addOnForm.patchValue({
        name: this.selectedMenu?.name,
        description: this.selectedMenu?.description,
        price: this.selectedMenu?.price,
        image: this.selectedMenu?.image,
      });
      this.image = this.selectedMenu?.image;
    } else {
      let domainId: any = localStorage.getItem('my_data');
      this.selectedMenu = this.MenuSelected?.find((e: any) => e?.id == id);
      this.categoryForm.addControl('id', new FormControl(this.selectedMenu.id));
      this.categoryForm.addControl(
        'domain_id',
        new FormControl(JSON.parse(domainId)?.domain_id)
      );
      this.categoryForm.addControl(
        'active_status',
        new FormControl(this.selectedMenu.active_status)
      );
      this.categoryForm.patchValue({
        name: this.selectedMenu.name,
        description: this.selectedMenu.description,
      });
    }
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
        if (this.url == 'add-ons') {
          this.addOnForm.patchValue({
            image: result.data.image_url,
          });
        } else if (this.url == 'foodItems') {
          this.itemForm.patchValue({
            image: result.data.image_url,
          });
        } else return;
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
