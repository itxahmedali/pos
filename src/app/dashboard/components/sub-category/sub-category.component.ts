import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
})
export class SubCategoryComponent {
  public duePage: any;
  public searchInput: any;
  public selectedSort: any;
  public MenuSelected: any = [];
  public selectedMenu: any;
  public modalReference: any;
  public image: any;
  public selectedId: number;
  public total!: any;
  public sorts = [
    { id: 1, name: 'name' },
    { id: 2, name: 'date' },
  ];
  public subCategoryForm: any = this.fb.group({
    name: [null],
    description: [null],
    image: [null],
  });
  constructor(
    private modalService: NgbModal,
    private http: HttpService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private helper: HelperService
  ) {}
  ngOnInit(): void {
    this.getCategory();
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
  exportToExcel(): void {
    this.helper.exportToExcel(this.MenuSelected)
  }
  async stateItem(event: any, state: string, data: any) {
    this.selectedMenu = this.MenuSelected?.find((e: any) => e?.id == event.id);
    if (this.selectedMenu) {
      if (state == 'delete') {
        this.subCategoryForm.patchValue({
          name: this.selectedMenu.name,
          image: this.selectedMenu.image,
          description: this.selectedMenu.description,
        });
        this.subCategoryForm.addControl(
          'id',
          new FormControl(this.selectedMenu.id)
        );
        this.subCategoryForm.addControl('active_status', new FormControl(0));
      } else {
        this.subCategoryForm.patchValue({
          name: this.selectedMenu.name,
          image: this.selectedMenu.image,
          description: this.selectedMenu.description,
        });
        this.subCategoryForm.addControl(
          'id',
          new FormControl(this.selectedMenu.id)
        );
        this.subCategoryForm.addControl(
          'out_of_stock',
          new FormControl(data.target.checked ? 1 : 0)
        );
      }
      this.saveCategory();
    }
  }
  async saveCategory() {
    await this.http
      .loaderPost('add-category', this.subCategoryForm.value, true)
      .subscribe(async(res: any) => {
        if (res?.status != 400) {
          await this.toaster.success(res?.message);
          // await this.helper.setCategory();
          await this.getCategory()
        } else {
          this.toaster.error(res?.message);
        }
        this.subCategoryForm.removeControl('id');
        this.subCategoryForm.removeControl('domain_id');
        this.subCategoryForm.removeControl('active_status');
        this.subCategoryForm.removeControl('out_of_stock');
      });
  }
  async getCategory() {
    let subCategories:any;
    await this.helper.getCategories()?.then((category: any) => {
      subCategories = category;
    });
    // const subCategories = await this.helper.getCategory();
    // returning subcaegoris of categories by using flatmap
    this.MenuSelected = subCategories?.flatMap(
      (item: any) => item?.sub_category ?? []
    );
  }
}
