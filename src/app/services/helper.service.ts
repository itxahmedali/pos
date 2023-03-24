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
    this.http.loaderGet('my-data', true).subscribe((res:any)=>{
      localStorage.setItem('my_data', JSON.stringify(res));
    })
  }
  addSpaces(str: string): string {
    let result = str.replace(/([a-z])([A-Z])/g, '$1 $2'); // add space between lowercase and uppercase letters
    result = result.replace(/&/, ' & '); // add spaces around "&" character
    result = result.replace(/(creatediscount|staffpayroll)/, '$1 '); // add space after specific words
    return result;
  }
}
