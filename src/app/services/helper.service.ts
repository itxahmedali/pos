import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from './http.service';
import { Category, DiscountGst, Graph, Setting, Staff } from 'src/classes';
import { writeFile } from 'xlsx';
import * as XLSX from 'xlsx';
import { UniversalService } from './universal.service';
import {
  NgbCalendar,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
@Injectable({
  providedIn: 'root',
})
export class HelperService {
  public domainId: any;
  public settings: Setting;
  public staff: Staff;
  private settingsPromise: Promise<Setting>;
  private staffPromise: Promise<Staff[]>;
  private DiscountGstPromise: Promise<DiscountGst>;
  private GraphPromise: Promise<Graph>;
  private CategoryPromise: Promise<Category[]>;
  constructor(
    private http: HttpService,
    private toaster: ToastrService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    // this.getDomainId('wadayah');
    this.setSettings();
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken || accessToken === 'skipped') {
      return;
    }
    this.setStaff();
    this.setCategory();
    this.setGraph();
    this.setDiscountGst();
  }
  fileUploadHttp(event: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const base64String = canvas.toDataURL('image/webp', 0.8);

            if (base64String) {
              this.http
                .loaderPost('image-upload-64', { image: base64String }, true)
                .subscribe(
                  (response: any) => {
                    resolve(response);
                    this.toaster.success(response.message);
                  },
                  (error) => {
                    reject(error);
                  }
                );
            }
          }
        };
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }
  urlCheck(r: string, firstValue: string, secondValue: string) {
    let url = r.split('/')[1];
    if (url == firstValue || url == secondValue) {
      return secondValue;
    } else {
      return false;
    }
  }
  titleCheck(title: string, value: string) {
    if (title == value) {
      return true;
    } else {
      return false;
    }
  }
  urlSplit(r: string) {
    return r.split('/')[1];
  }
  sumArrayItem(sum: any, CartItems: any) {
    sum = CartItems?.reduce((accumulator: any, object: any) => {
      return accumulator + object.price;
    }, 0);
  }
  removeDuplicates(arr: any) {
    let combinedItems = arr.reduce((acc: any, item: any) => {
      let existingItem = acc.find((i: any) => i.name == item.name);
      if (existingItem) {
        existingItem.value += item.value;
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
    return combinedItems;
  }
  isValidEmail(email: string): boolean {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return !!email.match(emailRegex);
  }
  myData() {
    this.http.loaderGet('my-data', true).subscribe((res: any) => {
      localStorage.setItem('my_data', JSON.stringify(res));
    });
  }
  async getDomainId(name: any): Promise<any> {
    if (localStorage.getItem('domainId')) {
      this.settingsPromise = this.loadSettings();
      return localStorage.getItem('domainId');
    } else {
      const res: any = await this.http
        .loaderPost('get-domain-id', { name: name }, false)
        .toPromise();
      this.domainId = res?.data?.id;
      localStorage.setItem('domainId', JSON.stringify(res?.data?.id));
      this.settingsPromise = this.loadSettings();
      UniversalService.domainId.next(true);
      return res.data?.id;
    }
  }

  async getAddOns(): Promise<any> {
    if (localStorage.getItem('domainId')) {
      const res: any = await this.http
        .loaderPost(
          'get-addon',
          { domain_id: localStorage.getItem('domainId') },
          true
        )
        .toPromise();
      return res.data;
    }
  }
  async getGstDiscount(): Promise<any> {
    if (localStorage.getItem('domainId')) {
      const res: any = await this.http
        .loaderPost(
          'get-gst-charges',
          { domain_id: localStorage.getItem('domainId') },
          false
        )
        .toPromise();
      return res.data;
    }
  }
  async getOrders(): Promise<any> {
    const data = await {
      domain_id: localStorage.getItem('domainId'),
      customer_id: localStorage.getItem('customer_id'),
      customer_secret: localStorage.getItem('customer_secret'),
    };
    if (data) {
      const res: any = await this.http
        .loaderPost('get-order-customer', data, false)
        .toPromise();
      return res.data;
    }
  }
  addSpaces(str: string): string {
    let result = str.replace(/([a-z])([A-Z])/g, '$1 $2'); // add space between lowercase and uppercase letters
    result = result.replace(/&/, ' & '); // add spaces around "&" character
    result = result.replace(/(creatediscount|staffpayroll)/, '$1 '); // add space after specific words
    return result;
  }
  getRole(url: string) {
    const welcomePrefix = 'welcome-';
    const indexOfWelcome = url.indexOf(welcomePrefix);
    if (indexOfWelcome !== -1) {
      const wordAfterWelcome = url.substring(
        indexOfWelcome + welcomePrefix.length
      );
      return wordAfterWelcome;
    } else {
      console.log("URL does not contain 'welcome-' prefix.");
    }
  }
  checkUrl(url: string) {
    const welcomePrefix = 'welcome-';
    const indexOfWelcome = url.indexOf(welcomePrefix);
    if (indexOfWelcome !== -1) {
      return false;
    } else {
      const parts = url.split('/');
      const dashboardIndex = parts.indexOf('dashboard');
      if (dashboardIndex !== -1 && dashboardIndex < parts.length - 1) {
        return parts[dashboardIndex + 1];
      }
      return null;
    }
  }
  checkWelcome(url: string) {
    const welcomePrefix = 'welcome-';
    const indexOfWelcome = url.indexOf(welcomePrefix);
    if (indexOfWelcome !== -1) {
      return true;
    } else {
      return false;
    }
  }
  async getSubDomain() {
    localStorage.removeItem('subDomain');
    // const domain = window.location.hostname;
    // if (
    //   domain.indexOf('.') < 0 ||
    //   domain.split('.')[0] === 'example' ||
    //   domain.split('.')[0] === 'lvh' ||
    //   domain.split('.')[0] === 'www'
    // ) {
    //   localStorage.removeItem('subDomain');
    //   Swal.fire({
    //     title: 'No domain detected try again with proper url',
    //     icon: 'error',
    //     showCancelButton: true,
    //     confirmButtonText: 'Reload',
    //     cancelButtonText: 'Cancel',
    //   }).then((result) => {
    //     if (result.value) {
    //       window.location.reload();
    //     } else if (result.dismiss === Swal.DismissReason.cancel) {
    //       window.close();
    //     }
    //   });
    // } else {
    // localStorage.setItem('subDomain', domain.split('.')[0]);
    // return await this.getDomainId(domain.split('.')[0]);
    localStorage.setItem('subDomain', 'wadayah');
    // return await this.getDomainId('wadayah');
    // }
  }
  subItemRessurect(array: any, item: any) {
    item?.sub_category?.map((subItem: any) => {
      array.push({ item: subItem.items, category: subItem?.name });
      if (subItem?.sub_category?.length) {
        this.subItemRessurect(array, subItem?.sub_category);
      }
    });
  }
  async getFoodItems(categories: any, foodItems: any, subCategories: any) {
    let menu: any;
    await this.getCategories()?.then((category: any) => {
      menu = category;
    });
    // const menu = await this.getCategory();
    menu?.map((item: any, index: number) => {
      categories.push({ name: item?.name, id: menu?.[index]?.id });
      foodItems.push({ item: item?.items, category: item?.name });
      subCategories.push({ name: item.name, id: menu?.[index].id });
      item?.sub_category?.map((subItem: any, i: number) => {
        foodItems.push({ item: subItem?.items, category: subItem?.name });
        if (subItem?.sub_category?.length) {
          this.subItemRessurect(foodItems, subItem?.sub_category);
        }
        subCategories.push({
          name: subItem?.name,
          id: item?.sub_category?.[i].id,
        });
      });
    });
  }
  async setSettings() {
    await this.getDomainId('wadayah');
  }
  public async loadSettings(): Promise<Setting> {
    let id = localStorage.getItem('domainId');
    const res: any = await this.http
      .loaderPost(
        'get-setting',
        {
          domain_id: id,
        },
        true
      )
      .toPromise();
    this.settings = new Setting(
      res.data.address,
      res.data.banner,
      res.data.banner_shade,
      res.data.city,
      res.data.description,
      res.data.slogan,
      res.data.domain_id,
      res.data.email,
      res.data.id,
      res.data.logo,
      res.data.phone,
      res.data.profile,
      res.data.restaurant_name,
      res.data.theme
    );
    UniversalService.settingLoad.next(true);
    return this.settings;
  }

  public getSettings(): Promise<Setting> {
    if (!this.settingsPromise && localStorage.getItem('domainId')) {
      this.settingsPromise = this.loadSettings();
    }
    return this.settingsPromise;
  }
  async setStaff() {
    this.staffPromise = this.loadStaff();
  }

  async loadStaff(): Promise<Staff[]> {
    const id = localStorage.getItem('domainId');
    const res: any = await this.http
      .loaderPost('get-employee', { domain_id: id }, true)
      .toPromise();
    const staffList = res.data.map((data: Staff) => {
      return new Staff(
        data.id,
        data.address,
        data.domain_id,
        data.father_name,
        data.joining_date,
        data.manager,
        data.national_identity,
        data.position,
        data.salary,
        data.shift,
        data.user,
        data.zipcode
      );
    });
    return staffList;
  }

  getStaff(): Promise<Staff[]> {
    if (!this.staffPromise) {
      this.staffPromise = this.loadStaff();
    }
    return this.staffPromise;
  }
  async setGraph() {
    this.GraphPromise = this.loadGraph();
  }

  async loadGraph(): Promise<Graph> {
    const id = localStorage.getItem('domainId');
    const toDate = this.calendar.getToday();
    const fromDate = this.calendar.getPrev(toDate, 'd', 7);
    const data = {
      domain_id: id,
      to: this.formatter.format(toDate),
      from: this.formatter.format(fromDate),
    };
    const res: any = await this.http
      .loaderPost('sales-graph', data, true)
      .toPromise();
    const GraphList = {
      dates: res.data.dates,
      expense_array: res.data.expense_array,
      revenue_array: res.data.revenue_array,
      sales_array: res.data.sales_array,
    };
    return GraphList;
  }

  getGraph(): Promise<Graph> {
    if (!this.GraphPromise) {
      this.GraphPromise = this.loadGraph();
    }
    return this.GraphPromise;
  }
  async setDiscountGst() {
    this.DiscountGstPromise = this.loadDiscountGst();
  }

  async loadDiscountGst(): Promise<DiscountGst> {
    const id = localStorage.getItem('domainId');
    const res: any = await this.http
      .loaderPost('get-gst-charges', { domain_id: id }, true)
      .toPromise();
    const DiscountGstList = {
      GST: res.data.GST,
      discount: res.data.discount,
      all_menu_discount: res.data.all_menu_discount,
      domain_id: res.data.domain_id,
    };
    return DiscountGstList;
  }

  getDiscountGst(): Promise<DiscountGst> {
    if (!this.DiscountGstPromise) {
      this.DiscountGstPromise = this.loadDiscountGst();
    }
    return this.DiscountGstPromise;
  }
  async setCategory() {
    // await this.getDomainId('wadayah');
    this.CategoryPromise = this.loadCategory();
  }
  public async loadCategory(): Promise<any> {
    let id = localStorage.getItem('domainId');
    if(!id){
      return
    }
    const res: any = await this.http
      .loaderPost(
        'get-category',
        {
          domain_id: id,
          type: 'main',
        },
        true
      )
      .toPromise();
    localStorage.setItem('categories', JSON.stringify(res?.data));
    const CategoryList = res.data.map((data: any) => {
      return new Category(
        data.id,
        data.domain_id,
        data.description,
        data.image,
        data.name,
        data.out_of_stock,
        data.parent_id,
        data.sub_category,
        data.items
      );
    });
    return CategoryList;
  }

  public getCategories(): Promise<Category[]> {
    if (!this.CategoryPromise) {
      this.CategoryPromise = this.loadCategory();
    }
    return this.CategoryPromise;
  }
  public async getCategory(): Promise<Category[]> {
    return await this.getCategories();
  }
  async exportToExcel(table: any[]) {
    console.log(table);

    const array = [];
    for (const { item, ...rest } of table) {
      if (item !== undefined) {
        array.push(item);
      } else {
        array.push(rest);
      }
    }
    const worksheet = XLSX.utils.json_to_sheet(array);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const date = new Date().toISOString().slice(0, 10);
    const fileName = `table_${date}.xlsx`;
    writeFile(workbook, fileName);
  }
}
