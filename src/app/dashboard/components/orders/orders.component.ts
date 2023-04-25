import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversalService } from 'src/app/services/universal.service';
import * as $ from 'jquery'
import { HttpService } from 'src/app/services/http.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  childActive = 1;
  public pendingSales: any;
  public allSales: any;
  constructor(
    private http:HttpService
  ) {}
  async ngOnInit() {
    await this.getSales();
  }

  async getSales() {
    await this.http
      .loaderPost(
        'get-order-status',
        { domain_id: localStorage.getItem('domainId') },
        true
      )
      .subscribe((res: any) => {
        this.pendingSales = res?.data?.pending;
        this.allSales = res?.data?.others;
      });
  }
}

