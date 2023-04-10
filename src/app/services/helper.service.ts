import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { HttpService } from './http.service';
import { LoaderService } from './loader.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class HelperService {
  public domainId: number;
  constructor(private http: HttpService, private toastr: ToastrService) {}
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
                    this.toastr.success(response.message);
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
      return localStorage.getItem('domainId');
    } else {
      const res: any = await this.http
        .post('get-domain-id', { name: name }, false)
        .toPromise();
      this.domainId = res?.data?.id;
      localStorage.setItem('domainId', JSON.stringify(res?.data?.id));
      return res.data?.id;
    }
  }
  async getCategory(): Promise<any> {
    const res: any = await this.http
      .loaderPost(
        'get-category',
        { domain_id: this.domainId ? this.domainId : localStorage.getItem('domainId'), type:'main' },
        false
      )
      .toPromise();
    localStorage.setItem('categories', JSON.stringify(res?.data));
    return res.data;
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
    if(data){
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
    const domain = window.location.hostname;
    if (
      domain.indexOf('.') < 0 ||
      domain.split('.')[0] === 'example' ||
      domain.split('.')[0] === 'lvh' ||
      domain.split('.')[0] === 'www'
    ) {
      localStorage.removeItem('subDomain');
      Swal.fire({
        title: 'No domain detected try again with proper url',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Reload',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.value) {
          window.location.reload();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          window.close();
        }
      });
    } else {
      localStorage.setItem('subDomain', domain.split('.')[0]);
      return await this.getDomainId(domain.split('.')[0]);
    }
  }
  subItemRessurect(array:any,item:any){
    item?.sub_category?.map((subItem:any)=>{
      array.push({ item: subItem.items, category: subItem?.name });
      if(subItem?.sub_category?.length){
        this.subItemRessurect(array,subItem?.sub_category)
      }
    })
  }
  async getFoodItems(categories:any, foodItems:any, subCategories:any){
    const menu = await this.getCategory();
    menu?.map((item: any, index: number) => {
      categories.push({ name: item?.name, id: menu?.[index]?.id });
      foodItems.push({ item: item?.items, category: item?.name });
      subCategories.push({ name: item.name, id: menu?.[index].id });
      item?.sub_category?.map((subItem:any,i:number)=>{
        foodItems.push({ item: subItem?.items, category: subItem?.name });
        if(subItem?.sub_category?.length){
          this.subItemRessurect(foodItems,subItem?.sub_category)
        }
        subCategories.push({
          name: subItem?.name,
          id: item?.sub_category?.[i].id,
        });
      })
    });
  }
}
