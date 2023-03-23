import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http.service';
import { UniversalService } from 'src/app/services/universal.service';

@Component({
  selector: 'app-fooditems',
  templateUrl: './fooditems.component.html',
  styleUrls: ['./fooditems.component.scss']
})
export class FooditemsComponent {
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
    id:[null],
    name: [null],
    description: [null],
    image: [null],
    domain_id: [null],
    active_status: [null],
  });
  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private modalService: NgbModal,
    private http: HttpService,
    private fb: FormBuilder,
  ) {
    this.categoryForm = this.fb.group({
      id:[null, [Validators.required, Validators.email]],
      name: [null, [Validators.required, Validators.email]],
      description: [null, [Validators.required, Validators.email]],
      image: ['null'],
      domain_id: [null],
      active_status: [null],
    });
  }
  ngOnInit(): void {
      this.observe();
      this.getData();
    }
  backMenu() {
    UniversalService.headerHeading.next(localStorage.getItem('beforeAddMenu'));
  }
  async observe() {
    UniversalService.cartShow.subscribe((res) => {
      if (res) {
        const word = JSON.stringify(localStorage.getItem('heading')).replace(
          / /g,
          '_'
        );
        this.Menus.map((e: any) => {
          if (e.hasOwnProperty(word)) {
            this.MenuSelected = e[word];
          }
        });
      }
      this.cd.detectChanges();
    }),
      (err: any) => console.log(err);
    UniversalService.itemDetailView.subscribe((res) => {
      if (res) {
        this.itemDetailView = true;
      } else {
        this.itemDetailView = false;
      }
      this.cd.detectChanges();
    }),
      (err: any) => console.log(err);
    UniversalService.itemDetail.subscribe((res) => {
      if (res) {
        this.itemDetail = res;
      } else {
        this.itemDetail = res;
      }
      this.cd.detectChanges();
    }),
      (err: any) => console.log(err);
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
  handleID(id: number) {
    this.selectedId = id;
    this.MenuSelected?.map((e:any)=>{
      if(e?.id == id){
        this.categoryForm.patchValue({
          id:e.id,
          name: e?.name,
          description: e?.description,
          domain_id:e?.domain_id,
          active_status:e?.active_status
        });
      }
    })
  }
  async saveCategory(){
    await this.http.post('add-category',this.categoryForm.value, true).subscribe((res:any)=>{
      console.log(res);
      this.getData()
      this.addCategory = false
      this.categoryScreen = true
    })
  }
  async getCategory(id: number) {
    let foodItems:any = []
    await this.http
    .loaderPost('get-category', { domain_id: id }, true)
    .subscribe((res: any) => {
      res?.data?.map((e:any)=>{
        foodItems.push(e?.items)
      })
      this.MenuSelected = foodItems.flat();
      console.log(id, this.MenuSelected);
      });
  }
}
