import {  Component, OnInit  } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
})
export class SaleComponent implements OnInit {
  active = 1;
  Sales:any;
  constructor(
    private http: HttpService
  ) {}
  async ngOnInit() {
    await this.getSales();
  }
  async getSales() {
    await this.http
      .loaderPost(
        'get-sales',
        { domain_id: localStorage.getItem('domainId') },
        true
      )
      .subscribe((res: any) => {
        console.log('====================================');
        console.log(res?.data);
        console.log('====================================');
        this.Sales = res?.data;
      });
  }
}
