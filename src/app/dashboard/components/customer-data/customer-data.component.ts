import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/services/http.service';
import { UniversalService } from 'src/app/services/universal.service';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.scss']
})
export class CustomerDataComponent {
  modalReference: any;
  constructor(private http:HttpService, private fb:FormBuilder, private modalService: NgbModal) { }
  public Staff: any;
  public CustomerForm: any = this.fb.group({
    domain_id: [localStorage.getItem('domainId'), Validators.required],
    name: [null, Validators.required],
    email: [null, Validators.required],
    phone: [null, Validators.required]
  });
  ngOnInit(): void {
    this.getCustomers()
  }
  open(content: any, modal: any) {
      this.modalReference = this.modalService.open(content, {
        centered: true,
        backdrop: 'static',
        windowClass: 'checkoutModal',
        size: 'md'
      });
  }
  proceed() {
    this.modalReference.close();
  }
  async getCustomers(){
    await this.http.loaderPost('get-customers', { domain_id: localStorage.getItem('domainId') }, true)
    .subscribe((res:any)=>{
      this.Staff = res?.data
    })
  }
}
