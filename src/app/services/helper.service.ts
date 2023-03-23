import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from './http.service';
import { LoaderService } from './loader.service';
@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private http: HttpService) {}
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
    let combinedItems = arr.reduce((acc:any, item:any) => {
      let existingItem = acc.find((i:any) => i.name == item.name);
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
    LoaderService.loader.next(true);
    this.http.get('my-data', true).subscribe((res:any)=>{
      localStorage.setItem('my_data', JSON.stringify(res));
      LoaderService.loader.next(false);
    })
    // return this.http.get('my-data', true).pipe(
    //   map((res) => {
    //     localStorage.setItem('my_data', JSON.stringify(res));
    //     LoaderService.loader.next(false);
    //     return res;
    //   })
    // );
  }
  getData() {
    // let my_data;
    // if (!localStorage.getItem('my_data')) {
    //   this.myData().subscribe((res: any) => {
    //     my_data = res;
    //   });
    // } else {
    //   my_data = JSON.parse(localStorage.getItem('my_data'));
    // }
    // return my_data;
  }
  getCategory(id: string) {
    // LoaderService.loader.next(true);
    // this.http.post('get-category', { domain_id: id }, true).subscribe(res=>{
    //     LoaderService.loader.next(false);
    //   return res
    // })
    // return this.http.post('get-category', { domain_id: id }, true).pipe(
    //   map((res) => {
    //     LoaderService.loader.next(false);
    //     return res;
    //   })
    // );
  }
}
