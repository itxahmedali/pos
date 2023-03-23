import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UniversalService } from 'src/app/services/universal.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  modalReference: any;
  public image:File
  constructor(private router:Router, private cd:ChangeDetectorRef, private modalService: NgbModal) { }
  public Staff: any = [
        {
          id: 1,
          Name: 'John',
          EmployeeId :'00012',
          position: 'Waiter',
          shift: 'Morning',
          manager: 'Paul Walker',
        },
        {
          id: 1,
          Name: 'John',
          EmployeeId :'00012',
          position: 'Manager',
          shift: 'Morning',
          manager: 'Paul Walker',
        },
        {
          id: 1,
          Name: 'John Sandwich',
          EmployeeId :'00012',
          position: 'Waiter',
          shift: 'Morning',
          manager: 'Paul Walker',
        },
        {
          id: 1,
          Name: 'John',
          EmployeeId :'00012',
          position: 'Waiter',
          shift: 'Morning',
          manager: 'Paul Walker',
        },
        {
          id: 1,
          Name: 'John',
          EmployeeId :'00012',
          position: 'Waiter',
          shift: 'Morning',
          manager: 'Paul Walker',
        },
        {
          id: 1,
          Name: 'John',
          EmployeeId :'00012',
          position: 'Manager',
          shift: 'Morning',
          manager: 'Paul Walker',
        },
        {
          id: 1,
          Name: 'John Sandwich',
          EmployeeId :'00012',
          position: 'Waiter',
          shift: 'Morning',
          manager: 'Paul Walker',
        },
        {
          id: 1,
          Name: 'John',
          EmployeeId :'00012',
          position: 'Waiter',
          shift: 'Morning',
          manager: 'Paul Walker',
        },
        {
          id: 1,
          Name: 'John',
          EmployeeId :'00012',
          position: 'Waiter',
          shift: 'Morning',
          manager: 'T1,T2,T3,T4',
        },
        {
          id: 1,
          Name: 'John',
          EmployeeId :'00012',
          position: 'Manager',
          shift: 'Morning',
          manager: 'T1,T2,T3,T4',
        },
        {
          id: 1,
          Name: 'John Sandwich',
          EmployeeId :'00012',
          position: 'Waiter',
          shift: 'Morning',
          manager: 'T1,T2,T3,T4',
        },
        {
          id: 1,
          Name: 'John',
          EmployeeId :'00012',
          position: 'Waiter',
          shift: 'Morning',
          manager: 'T1,T2,T3,T4',
        },
        {
          id: 1,
          Name: 'John',
          EmployeeId :'00012',
          position: 'Waiter',
          shift: 'Morning',
          manager: 'T1,T2,T3,T4',
        },
        {
          id: 1,
          Name: 'John',
          EmployeeId :'00012',
          position: 'Manager',
          shift: 'Morning',
          manager: 'T1,T2,T3,T4',
        },
        {
          id: 1,
          Name: 'John Sandwich',
          EmployeeId :'00012',
          position: 'Waiter',
          shift: 'Morning',
          manager: 'T1,T2,T3,T4',
        },
        {
          id: 1,
          Name: 'John',
          EmployeeId :'00012',
          position: 'Waiter',
          shift: 'Morning',
          manager: 'Paul Walker',
        },
  ];
  ngOnInit(): void {
    // const lastPage = localStorage.getItem('lastVisitheadingPage')
    // if(lastPage){
    //   this.observe(lastPage?.toLowerCase());
    // }
    // else{
    //   this.observe('staff');
    // }
  }
  async observe(path: string) {
    if (path) {
      this.router.navigate([`master/${path}`]);
    }
    UniversalService.routePath.subscribe((res: string) => {
      let path = res.toLowerCase();
      this.router.navigate([`master/${path}`]);
      this.cd.detectChanges();
    });
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
}
