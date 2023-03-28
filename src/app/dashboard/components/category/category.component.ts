import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';
import { UniversalService } from 'src/app/services/universal.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  public Menus: any;
  public duePage: any;
  public searchInput: any;
  public selectedSort: any;
  public MenuSelected: any;
  public selectedMenu: any;
  public addCategory: boolean = false;
  public addMenu: boolean = false;
  public itemDetailView: boolean = false;
  public itemDetail: any;
  public modalReference: any;
  public image: any;
  public categoryScreen: boolean = false;
  public selectedId: number;
  public category!: any;
  public data!: any;
  public total!: any;
  public sorts = [
    { id: 1, name: 'Sort By Name' },
    { id: 2, name: 'Sort By Date' },
  ];
  public categoryForm: any = this.fb.group({
    name: [null],
    description: [null],
    image: ['null'],
  });
  constructor(
    private modalService: NgbModal,
    private http: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
  }
  ngOnInit(): void {
    this.getData();
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
  async stateItem(event: any, state: string, data: any) {
    this.selectedMenu = this.MenuSelected?.find(
      (e: any) => e?.id == event.id
    );
    if (this.selectedMenu) {
      if (state == 'delete') {
        this.categoryForm.patchValue({
          name: this.selectedMenu.name,
          description: this.selectedMenu.description,
        });
        this.categoryForm.addControl('id', new FormControl(this.selectedMenu.id));
        this.categoryForm.addControl('active_status', new FormControl(0));
      } else {
        this.categoryForm.patchValue({
          name: this.selectedMenu.name,
          description: this.selectedMenu.description,
        });
        this.categoryForm.addControl('id', new FormControl(this.selectedMenu.id));
        this.categoryForm.addControl(
          'out_of_stock',
          new FormControl(data.target.checked ? 1 : 0)
        );
      }
      this.saveCategory();
    }
  }
  async saveCategory() {
    await this.http
      .loaderPost('add-category', this.categoryForm.value, true)
      .subscribe((res: any) => {
        if (res?.status != 400) {
          this.toastr.success(res?.message);
          this.getData()
        } else {
          this.toastr.error(res?.message);
        }
        this.categoryForm.removeControl('id');
        this.categoryForm.removeControl('domain_id');
        this.categoryForm.removeControl('active_status');
        this.categoryForm.removeControl('out_of_stock');
      });
  }
  async getCategory(id: number) {
    await this.http
      .loaderPost('get-category', { domain_id: id }, true)
      .subscribe((res: any) => {
        this.MenuSelected = res?.data;
      });
  }
}
