import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UniversalService } from 'src/app/services/universal.service';
import { HttpService } from 'src/app/services/http.service';
import { HelperService } from 'src/app/services/helper.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  modalReference: any;
  public image: any;
  public Staff: any;
  public id: number;
  public staffForm: any = this.fb.group({
    image: [null, Validators.required],
    name: [null, Validators.required],
    father_name: [null, Validators.required],
    dob: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
    address: [null, Validators.required],
    zipcode: [null, Validators.required],
    phone: [null, Validators.required],
    position: [null, Validators.required],
    domain_id: [localStorage.getItem('domainId'), Validators.required],
    manager: [null, Validators.required],
    shift: [null, Validators.required],
    joining_date: [null, Validators.required],
    national_identity: [null, Validators.required],
    salary: [null, Validators.required],
  });
  constructor(
    private modalService: NgbModal,
    private toaster: ToastrService,
    private http: HttpService,
    private helper: HelperService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}
  async ngOnInit() {
    await this.getData();
    await this.getStaff();
    await this.observe();
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
    let data = localStorage.getItem('domainId');
    if (data) {
      this.id = await JSON.parse(data);
    } else return;
  }
  async getStaff() {
    await this.http
      .loaderPost('get-employee', { domain_id: this.id }, true)
      .subscribe((res: any) => {
        this.Staff = res?.data;
      });
  }
  upload(event: any) {
    this.helper
      .fileUploadHttp(event)
      .then((result: any) => {
        this.image = result.data.image_url;
        this.staffForm.patchValue({
          image: result.data.image_url,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  handleEmployeeDetail(employeeDetail: any) {
    this.staffForm = this.createStaffFormGroup(employeeDetail);
  }
  save(modal: boolean) {
    if (this.staffForm.valid) {
      this.http
        .loaderPost('add-employee', this.staffForm.value, true)
        .pipe(
          tap(() => {
            this.staffForm.controls.password.setValidators([Validators.required]);
            this.staffForm.get('password')?.updateValueAndValidity();
            this.staffForm.reset();
            this.image = null;
            if (modal) {
              this.proceed();
            }
            this.getStaff();
          })
        )
        .subscribe((res: any) => {
          this.toaster.success(res?.message);
        });
    } else {
    }
  }
  observe() {
    UniversalService.editModal.subscribe((employeeDetail: any) => {
      this.staffForm.get('password')?.clearValidators();
      this.staffForm.get('password')?.updateValueAndValidity();
      this.staffForm = this.createStaffFormGroup(employeeDetail);
      this.staffForm.addControl('id', new FormControl(employeeDetail?.id));
      this.staffForm.addControl(
        'user_id',
        new FormControl(JSON.stringify(employeeDetail?.id))
      );
      this.image = employeeDetail?.user?.image;
      document?.getElementById('qrCode')?.click();
      this.cd.detectChanges();
    });
  }
  async statusHandler(stateHandler: any) {
    const employeeDetail = await this.Staff.filter(
      (staff: any) => staff.id === stateHandler.id
    );
    await this.staffForm.removeControl('active_status');
    await this.staffForm.patchValue({
      image: employeeDetail?.[0]?.user.image,
      name: employeeDetail?.[0]?.user.name,
      father_name: employeeDetail?.[0]?.father_name,
      dob: employeeDetail?.[0]?.user.dob,
      email: employeeDetail?.[0]?.user.email,
      password: null,
      address: employeeDetail?.[0]?.address,
      zipcode: employeeDetail?.[0]?.zipcode,
      phone: employeeDetail?.[0]?.user.phone,
      position: employeeDetail?.[0]?.user.position,
      domain_id: localStorage.getItem('domainId'),
      manager: employeeDetail?.[0]?.manager,
      shift: employeeDetail?.[0]?.shift,
      joining_date: employeeDetail?.[0]?.joining_date,
      national_identity: employeeDetail?.[0]?.national_identity,
      salary: employeeDetail?.[0]?.salary,
    });
    await this.staffForm.addControl(
      'active_status',
      new FormControl(stateHandler.value)
    );
    await this.staffForm.addControl('id', new FormControl(stateHandler.id));
    await this.save(false);
  }

  createStaffFormGroup(employeeDetail: any) {
    return this.fb.group({
      image: [employeeDetail.user.image, Validators.required],
      name: [employeeDetail.user.name, Validators.required],
      father_name: [employeeDetail.father_name, Validators.required],
      dob: [employeeDetail.user.dob, Validators.required],
      email: [
        employeeDetail.user.email,
        [Validators.required, Validators.email],
      ],
      password: [null],
      address: [employeeDetail.address, Validators.required],
      zipcode: [employeeDetail.zipcode, Validators.required],
      phone: [employeeDetail.user.phone, Validators.required],
      position: [employeeDetail.user.position, Validators.required],
      domain_id: [localStorage.getItem('domainId'), Validators.required],
      manager: [employeeDetail.manager, Validators.required],
      shift: [employeeDetail.shift, Validators.required],
      joining_date: [employeeDetail.joining_date, Validators.required],
      national_identity: [
        employeeDetail.national_identity,
        Validators.required,
      ],
      salary: [employeeDetail.salary, Validators.required],
    });
  }
}
