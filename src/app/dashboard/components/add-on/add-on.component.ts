import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-add-on',
  templateUrl: './add-on.component.html',
  styleUrls: ['./add-on.component.scss'],
})
export class AddOnComponent {
  public selectedMenu: any;
  public Menus: any;
  public duePage!: any;
  public total!: any;
  public searchInput!: any;
  public selectedSort!: any;
  public MenuSelected: any;
  public Categories: any = [];
  public addMenu: boolean = false;
  public modalReference: any;
  public image: any;
  public data!: any;
  public addOnForm: any = this.fb.group({
    name: [null],
    description: [null],
    image: [null],
    price: [null],
  });
  public sorts = [
    { id: 1, name: 'name' },
    { id: 2, name: 'date' },
  ];
  constructor(
    private modalService: NgbModal,
    private http: HttpService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private helper: HelperService
  ) {
    this.addOnForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      image: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getData();
  }
  backMenu() {
    this.addMenu = false;
  }
  exportToExcel(): void {
    this.helper.exportToExcel(this.MenuSelected)
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
  async stateItem(event: any, state: string, data: any) {
    this.selectedMenu = this.MenuSelected?.find((e: any) => e?.id == event.id);
    if (this.selectedMenu) {
      if (state == 'delete') {
        this.addOnForm.patchValue({
          name: this.selectedMenu?.name,
          description: this.selectedMenu?.description,
          price: this.selectedMenu?.price,
          image: this.selectedMenu?.image,
        });
        this.addOnForm.addControl('id', new FormControl(this.selectedMenu?.id));
        this.addOnForm.addControl('active_status', new FormControl(0));
      } else {
        this.addOnForm.patchValue({
          name: this.selectedMenu?.name,
          description: this.selectedMenu?.description,
          price: this.selectedMenu?.price,
          image: this.selectedMenu?.image,
        });
        this.addOnForm.addControl('id', new FormControl(this.selectedMenu?.id));
        this.addOnForm.addControl('out_of_stock', new FormControl(data.target.checked ? 1 : 0));
      }
      this.saveCategory();
    }
  }
  async getData() {
    let data = localStorage.getItem('domainId');
    if (data) {
      await this.getAddOns();
    } else return;
  }
  handleID(data: any) {
    this.addMenu = true;
    this.addOnForm.removeControl('id');
    this.addOnForm.removeControl('active_status');
    this.addOnForm.removeControl('out_of_stock');
    this.image = null;
    const selectedMenu = this.MenuSelected?.find((e: any) => e?.id == data.id);
    if (data.state == 'edit') {
      if (selectedMenu) {
        this.addOnForm.addControl('id', new FormControl(selectedMenu?.id));
        this.addOnForm.addControl(
          'active_status',
          new FormControl(selectedMenu?.active_status)
        );
        this.addOnForm.patchValue({
          name: selectedMenu?.name,
          description: selectedMenu?.description,
          price: selectedMenu?.price,
          image: selectedMenu?.image,
        });
        this.image = selectedMenu?.image;
      }
    }
  }
  async saveCategory() {
    await this.http
      .loaderPost('add-addon', this.addOnForm.value, true)
      .subscribe((res: any) => {
        if (res?.status != 400) {
          this.toaster.success(res?.message);
        } else {
          this.toaster.error(res?.message);
        }
        this.getData();
        this.addMenu = false;
      });
  }
  async getAddOns() {
    this.MenuSelected = await this.helper.getAddOns();
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
        this.addOnForm.patchValue({
          image: result.data.image_url,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
