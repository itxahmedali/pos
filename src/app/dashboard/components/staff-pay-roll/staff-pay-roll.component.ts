import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { UniversalService } from 'src/app/services/universal.service';

@Component({
  selector: 'app-staff-pay-roll',
  templateUrl: './staff-pay-roll.component.html',
  styleUrls: ['./staff-pay-roll.component.scss']
})
export class StaffPayRollComponent {
  public staffDetail: boolean = false;
  constructor(private http: HttpService, private cd: ChangeDetectorRef) {}
  public PayrollTable: any;
  public Waitertables: any;
  ngOnInit(): void {
    this.getPayRoll()
  }
  async getPayRoll(){
    await this.http.loaderPost('get-payroll', { domain_id: localStorage.getItem('domainId') }, true)
    .subscribe((res:any)=>{
      console.log('====================================');
      console.log(res?.data);
      console.log('====================================');
      this.PayrollTable = res?.data
    })
  }
}
