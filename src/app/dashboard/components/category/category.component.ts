import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';
import { Category } from 'src/classes';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  public duePage: any;
  public searchInput: any;
  public selectedSort: any;
  public MenuSelected: any;
  public selectedMenu: any;
  public modalReference: any;
  public image: any;
  public selectedId: number;
  public total!: any;
  public sorts = [
    { id: 1, name: 'name' },
    { id: 2, name: 'date' },
  ];
  public categoryForm: any = this.fb.group({
    name: [null],
    description: [null],
    image: [null],
  });
  constructor(
    private modalService: NgbModal,
    private http: HttpService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private helper:HelperService
  ) {
  }
  ngOnInit(): void {
    this.getCategories();
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
    this.selectedMenu = this.MenuSelected?.find(
      (e: any) => e?.id == event.id
    );
    if (this.selectedMenu) {
      if (state == 'delete') {
        this.categoryForm.patchValue({
          name: this.selectedMenu.name,
          image: this.selectedMenu.image,
          description: this.selectedMenu.description,
        });
        this.categoryForm.addControl('id', new FormControl(this.selectedMenu.id));
        this.categoryForm.addControl('active_status', new FormControl(0));
      } else {
        this.categoryForm.patchValue({
          name: this.selectedMenu.name,
          image: this.selectedMenu.image,
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
      .subscribe(async(res: any) => {
        if (res?.status != 400) {
          await this.toaster.success(res?.message);
          await this.helper.setCategory();
          await this.getCategories()
        } else {
          this.toaster.error(res?.message);
        }
        this.categoryForm.removeControl('id');
        this.categoryForm.removeControl('domain_id');
        this.categoryForm.removeControl('active_status');
        this.categoryForm.removeControl('out_of_stock');
      });
  }
  async getCategories() {
    await this.helper.getCategories()?.then((category: any) => {
      this.MenuSelected = category;
      console.log(category);
    });
  }
}
