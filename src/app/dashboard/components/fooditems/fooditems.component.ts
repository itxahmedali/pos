import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';
import { UniversalService } from 'src/app/services/universal.service';

@Component({
  selector: 'app-fooditems',
  templateUrl: './fooditems.component.html',
  styleUrls: ['./fooditems.component.scss'],
})
export class FooditemsComponent {
  public Menus: any;
  public MenuSelected: any;
  public Categories: any=[];
  public addMenu: boolean = false;
  public modalReference: any;
  public image: any;
  public data!: any;
  public itemForm: any = this.fb.group({
    name: [null],
    description: [null],
    image: [null],
    price: [null],
    category_id: [null],
  });
  constructor(
    private modalService: NgbModal,
    private http: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private helper: HelperService
  ) {
    this.itemForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      image: [null, [Validators.required]],
      price: [null, [Validators.required]],
      category_id: [null, [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.getData();
  }
  backMenu() {
    this.addMenu = false;
  }
  open(content: any, modal: string) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
    });
  }
  proceed() {
    this.modalReference.close();
  }
  async getData() {
    let data = localStorage.getItem('my_data');
    if (data) {
      await this.getCategory(JSON.parse(data)?.id);
    } else return;
  }
  handleID(data: any) {
    this.addMenu = true;
    this.itemForm.removeControl('id');
    this.itemForm.removeControl('active_status');
    this.itemForm.removeControl('out_of_stock');
    this.image = null
    const selectedMenu = this.MenuSelected?.find(
      (e: any) => e?.item?.id == data.id
    );
    if (data.state == 'edit') {
      if (selectedMenu) {
        this.itemForm.addControl('id', new FormControl(selectedMenu?.item?.id));
        this.itemForm.addControl(
          'active_status',
          new FormControl(selectedMenu?.item?.active_status)
        );
        this.itemForm.patchValue({
          name: selectedMenu?.item?.name,
          description: selectedMenu?.item?.description,
          price: selectedMenu?.item?.price,
          category_id: null,
          image: selectedMenu?.item?.image
        });
        this.image = selectedMenu?.item?.image
      }
    } else if (data.state == 'add') {
      this.itemForm = this.fb.group({
        name: [null, [Validators.required]],
        description: [null, [Validators.required]],
        image: [null, [Validators.required]],
        price: [null, [Validators.required]],
        category_id: [null, [Validators.required]]
      });
    } else if (data.state == 'change') {
      this.addMenu = false;
      if (selectedMenu) {
        this.itemForm.patchValue({
          name: selectedMenu?.item?.name,
          description: selectedMenu?.item?.description,
          price: selectedMenu?.item?.price,
          category_id: selectedMenu?.item?.category_id,
          image: selectedMenu?.item?.image
        });
        this.itemForm.addControl('id', new FormControl(selectedMenu?.item?.id));
        this.itemForm.addControl('out_of_stock', new FormControl(data.value));
      }
      this.saveCategory();
    } else if (data.state == 'delete') {
      this.addMenu = false;
      if (selectedMenu) {
        this.itemForm.patchValue({
          name: selectedMenu?.item?.name,
          description: selectedMenu?.item?.description,
          price: selectedMenu?.item?.price,
          category_id: selectedMenu?.item?.category_id,
          image: selectedMenu?.item?.image
        });
        this.itemForm.addControl('id', new FormControl(selectedMenu?.item?.id));
        this.itemForm.addControl('active_status', new FormControl(0));
        this.saveCategory();
      }
    }
  }
  async saveCategory() {
    await this.http
      .loaderPost('add-item', this.itemForm.value, true)
      .subscribe((res: any) => {
        if (res?.status != 400) {
          this.toastr.success(res?.message);
        } else {
          this.toastr.error(res?.message);
        }
        this.getData();
        this.addMenu = false;
      });
  }
  async getCategory(id: number) {
    let foodItems: any = [];
    let categories: any = [];
    await this.http
      .loaderPost('get-category', { domain_id: id }, true)
      .subscribe((res: any) => {
        res?.data?.map((item: any, index:any) => {
          categories.push({name:item?.name, id:res?.data?.[index]?.id});
          foodItems.push({ item: item.items, category: item?.name });
        });
        foodItems = this.combineArray(foodItems);
        this.Categories = categories;
        console.log('====================================');
        console.log(this.itemForm.value);
        console.log('====================================');
        this.MenuSelected = foodItems;
      });
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
          image: result.data.image_url
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
