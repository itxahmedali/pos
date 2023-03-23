import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UniversalService } from 'src/app/services/universal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  active = 1;
  modalReference: any;
  public Waitertables: any = [
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Tuesday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'Ending', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Wednesday', checkin:'-', checkout:'-', availability:'Present' , status: 'Ending', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'thursday', checkin:'9:00AM',  checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'friday', checkin:'9:00AM',  checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Saturday', checkin:'9:00AM',  checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Sunday', checkin:'9:00AM',  checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Tuesday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Wednesday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'thursday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'friday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Saurday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Sunday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'Ending', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'Ending', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'Ending', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'Ending', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'Ending', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'Ending', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM',checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { date: '01-sep-2022', day:'Monday', checkin:'9:00AM', checkout:'6:00PM', availability:'Present' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},

  ];
  public image:File

  constructor(private router:Router, private cd:ChangeDetectorRef , private modalService: NgbModal) { }
  ngOnInit(): void {
    this.observe('inventory');
  }
  async observe(path: string) {
    // if (path) {
    //   this.router.navigate([`master/${path}`]);
    // }
    // UniversalService.routePath.subscribe((res: string) => {
    //   let path = res.toLowerCase();
    //   this.router.navigate([`master/${path}`]);
    //   this.cd.detectChanges();
    // });
  }
  open(content:any, modal:string) {
    this.modalReference = this.modalService.open(content, { centered: true, backdrop:'static', windowClass: 'checkoutModal'});
}
proceed(){
  this.modalReference.close();
}
}
