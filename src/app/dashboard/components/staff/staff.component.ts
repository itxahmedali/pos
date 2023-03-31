import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UniversalService } from 'src/app/services/universal.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  modalReference: any;
  public image:File
  constructor(private router:Router, private cd:ChangeDetectorRef, private modalService: NgbModal,
    private http:HttpService) { }
  public Staff: any
  ngOnInit(): void {
    this.getData()
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
      await this.getStaff(JSON.parse(data)?.id);
    } else return;
  }
  getStaff(id:any){
    this.http.loaderPost('get-employee',{domain_id:id},true).subscribe((res:any)=>{
      this.Staff = res?.data
    })
  }
}
