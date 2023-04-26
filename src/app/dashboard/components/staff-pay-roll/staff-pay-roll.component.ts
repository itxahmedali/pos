import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';
import { UniversalService } from 'src/app/services/universal.service';
import { Staff } from 'src/classes';

@Component({
  selector: 'app-staff-pay-roll',
  templateUrl: './staff-pay-roll.component.html',
  styleUrls: ['./staff-pay-roll.component.scss'],
})
export class StaffPayRollComponent {
  public staffDetail: boolean = false;
  public staffMembers: Staff[];
  public modalReference: any;
  public staffpayRollForm: any = this.fb.group({
    domain_id: [localStorage.getItem('domainId'), Validators.required],
    employee_id: [null, Validators.required],
    name: [null, Validators.required],
    salary: [null, Validators.required],
    allownces: [null, [Validators.required]],
  });
  constructor(
    private http: HttpService,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private fb:FormBuilder,
    private toaster:ToastrService,
    private helper:HelperService
  ) {}
  public PayrollTable: any;
  public Waitertables: any;
  async ngOnInit() {
    await this.getPayRoll();
    await this.getStaff()
  }
  async getStaff() {
    await this.helper.getStaff()?.then((staffList: Staff[]) => {
      this.staffMembers = staffList;
    })
  }
  open(content: any) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
    });
  }
  proceed() {
    this.modalReference.close();
  }
  selectStaff(user:Staff){
    this.staffpayRollForm.patchValue({
      employee_id:user?.id
    });
  }
  save(modal: boolean) {
    if (this.staffpayRollForm.valid) {
      this.http
        .loaderPost('add-payroll', this.staffpayRollForm.value, true)
        .pipe(
          tap(() => {
            this.staffpayRollForm.reset();
            if (modal) {
              this.proceed();
            }
            this.getPayRoll();
          })
        )
        .subscribe((res: any) => {
          this.toaster.success(res?.message);
        });
    } else {
    }
  }
  async getPayRoll() {
    await this.http
      .loaderPost(
        'get-payroll',
        { domain_id: localStorage.getItem('domainId') },
        true
      )
      .subscribe((res: any) => {
        this.PayrollTable = res?.data;
      });
  }
}
