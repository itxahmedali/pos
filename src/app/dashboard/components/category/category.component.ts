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
  public MenuSelected: any;
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
  public categoryForm: any = this.fb.group({
    name: [null],
    description: [null],
    image: [null],
  });
  constructor(
    private modalService: NgbModal,
    private http: HttpService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.categoryForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      image: ['null'],
    });
  }
  ngOnInit(): void {
    this.getData();
  }
  backMenu() {
    UniversalService.headerHeading.next(localStorage.getItem('beforeAddMenu'));
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
    this.addCategory = true;
    this.categoryForm.removeControl('id');
    this.categoryForm.removeControl('domain_id');
    this.categoryForm.removeControl('active_status');
    this.categoryForm.removeControl('out_of_stock');
    const selectedMenu = this.MenuSelected?.find((e: any) => e?.id == data.id);
    if (data.state == 'edit') {
      if (selectedMenu) {
        this.categoryForm.addControl('id', new FormControl(selectedMenu.id));
        this.categoryForm.addControl(
          'domain_id',
          new FormControl(JSON.parse(domainId)?.domain_id)
        );
        this.categoryForm.addControl(
          'active_status',
          new FormControl(selectedMenu.active_status)
        );
        this.categoryForm.patchValue({
          name: selectedMenu.name,
          description: selectedMenu.description,
        });
      }
    } else if (data.state == 'add') {
      this.categoryForm = this.fb.group({
        name: [null, [Validators.required]],
        description: [null, [Validators.required]],
        image: ['null'],
      });
      this.categoryForm.addControl(
        'domain_id',
        new FormControl(JSON.parse(domainId)?.domain_id)
      );
    } else if (data.state == 'change') {
    this.addCategory = false;
      if (selectedMenu) {
        this.categoryForm.patchValue({
          name: selectedMenu.name,
          description: selectedMenu.description,
        });
        this.categoryForm.addControl('id', new FormControl(selectedMenu.id));
        this.categoryForm.addControl(
          'out_of_stock',
          new FormControl(data.value)
        );
      }
      this.saveCategory();
    } else if (data.state == 'delete') {
    this.addCategory = false;
      if (selectedMenu) {
        this.categoryForm.patchValue({
          name: selectedMenu.name,
          description: selectedMenu.description,
        });
        this.categoryForm.addControl('id', new FormControl(selectedMenu.id));
        this.categoryForm.addControl(
          'active_status',
          new FormControl(0)
        );
        this.saveCategory();
      }
    }
  }
  async saveCategory() {
    await this.http
      .loaderPost('add-category', this.categoryForm.value, true)
      .subscribe((res: any) => {
        if (res?.status != 400) {
          this.toastr.success(res?.message);
        } else {
          this.toastr.error(res?.message);
        }
        this.getData();
        this.addCategory = false;
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
