import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
  public addMenu: boolean = false;
  public modalReference: any;
  public image: any;
  public data!: any;
  public itemForm: any = this.fb.group({
    name: [null],
    description: [null],
    image: [null],
    price: [null],
    category: [null],
  });
  constructor(
    private modalService: NgbModal,
    private http: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.itemForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      image: [null, [Validators.required]],
      price: [null, [Validators.required]],
      category: [null, [Validators.required]],
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
    let domainId: any = localStorage.getItem('my_data');
    this.addMenu = true;
    this.itemForm.removeControl('id');
    this.itemForm.removeControl('domain_id');
    this.itemForm.removeControl('active_status');
    this.itemForm.removeControl('out_of_stock');
    const selectedMenu = this.MenuSelected?.find((e: any) => e?.item?.id == data.id)
    if (data.state == 'edit') {
      if (selectedMenu) {
        this.itemForm.addControl('id', new FormControl(selectedMenu?.item?.id));
        this.itemForm.addControl(
          'domain_id',
          new FormControl(JSON.parse(domainId)?.domain_id)
        );
        this.itemForm.addControl(
          'active_status',
          new FormControl(selectedMenu?.item?.active_status)
        );
        this.itemForm.patchValue({
          name: selectedMenu?.item?.name,
          description: selectedMenu?.item?.description,
          price: selectedMenu?.item?.price,
          category: selectedMenu?.item?.category,
        });
      }
    } else if (data.state == 'add') {
      this.itemForm = this.fb.group({
        name: [null, [Validators.required]],
        description: [null, [Validators.required]],
        image: ['null'],
      });
      this.itemForm.addControl(
        'domain_id',
        new FormControl(JSON.parse(domainId)?.domain_id)
      );
    } else if (data.state == 'change') {
      this.addMenu = false;
      if (selectedMenu) {
        this.itemForm.patchValue({
          name: selectedMenu?.item?.name,
          description: selectedMenu?.item?.description,
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
        });
        this.itemForm.addControl('id', new FormControl(selectedMenu?.item?.id));
        this.itemForm.addControl('active_status', new FormControl(0));
        this.saveCategory();
      }
    }
  }
  async saveCategory() {
    await this.http
      .loaderPost('add-category', this.itemForm.value, true)
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
    await this.http
      .loaderPost('get-category', { domain_id: id }, true)
      .subscribe((res: any) => {
        res?.data?.map((item: any) => {
          foodItems.push({ item: item.items, category: item?.name });
        });
        foodItems = this.reduceArray(foodItems);
        this.MenuSelected = foodItems
      });
  }
  reduceArray(originalArray: any) {
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
}
