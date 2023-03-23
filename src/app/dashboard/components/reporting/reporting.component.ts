import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UniversalService } from 'src/app/services/universal.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss']
})
export class ReportingComponent implements OnInit {

  constructor(private router:Router, private cd:ChangeDetectorRef) { }
  public Waitertables: any = [
    { no: '01', name:'Jennifer', amount:12, items:2, tables:'T1' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '02', name:'Jennifer', amount:53, items:2, tables:'T2' , status: 'Ending', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '03', name:'Jennifer', amount:60, items:2, tables:'T3' , status: 'Ending', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '04', name:'Jennifer', amount:100, items:2, tables:'T4' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '04', name:'Jennifer', amount:100, items:2, tables:'T4' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '04', name:'Jennifer', amount:100, items:2, tables:'T4' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '04', name:'Jennifer', amount:100, items:2, tables:'T4' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '05', name:'Jennifer', amount:200, items:2, tables:'T5' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '06', name:'Jennifer', amount:14, items:2, tables:'T6' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '06', name:'Jennifer', amount:14, items:2, tables:'T6' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '06', name:'Jennifer', amount:14, items:2, tables:'T6' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '06', name:'Jennifer', amount:14, items:2, tables:'T6' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '04', name:'Jennifer', amount:100, items:2, tables:'T4' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '07', name:'Jennifer', amount:34, items:2, tables:'T7' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '07', name:'Jennifer', amount:34, items:2, tables:'T7' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '07', name:'Jennifer', amount:34, items:2, tables:'T7' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '07', name:'Jennifer', amount:34, items:2, tables:'T7' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '07', name:'Jennifer', amount:34, items:2, tables:'T7' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '01', name:'Jennifer', amount:12, items:2, tables:'T1' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '02', name:'Jennifer', amount:53, items:2, tables:'T2' , status: 'Ending', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '03', name:'Jennifer', amount:60, items:2, tables:'T3' , status: 'Ending', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '04', name:'Jennifer', amount:100, items:2, tables:'T4' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '04', name:'Jennifer', amount:100, items:2, tables:'T4' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '04', name:'Jennifer', amount:100, items:2, tables:'T4' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '04', name:'Jennifer', amount:100, items:2, tables:'T4' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '05', name:'Jennifer', amount:200, items:2, tables:'T5' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '06', name:'Jennifer', amount:14, items:2, tables:'T6' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '06', name:'Jennifer', amount:14, items:2, tables:'T6' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '06', name:'Jennifer', amount:14, items:2, tables:'T6' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '06', name:'Jennifer', amount:14, items:2, tables:'T6' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '04', name:'Jennifer', amount:100, items:2, tables:'T4' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '01', name:'Jennifer', amount:12, items:2, tables:'T1' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '02', name:'Jennifer', amount:53, items:2, tables:'T2' , status: 'Ending', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '03', name:'Jennifer', amount:60, items:2, tables:'T3' , status: 'Ending', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '04', name:'Jennifer', amount:100, items:2, tables:'T4' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '04', name:'Jennifer', amount:100, items:2, tables:'T4' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '04', name:'Jennifer', amount:100, items:2, tables:'T4' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '04', name:'Jennifer', amount:100, items:2, tables:'T4' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '05', name:'Jennifer', amount:200, items:2, tables:'T5' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '06', name:'Jennifer', amount:14, items:2, tables:'T6' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '06', name:'Jennifer', amount:14, items:2, tables:'T6' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '06', name:'Jennifer', amount:14, items:2, tables:'T6' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '06', name:'Jennifer', amount:14, items:2, tables:'T6' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '04', name:'Jennifer', amount:100, items:2, tables:'T4' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '07', name:'Jennifer', amount:34, items:2, tables:'T7' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '07', name:'Jennifer', amount:34, items:2, tables:'T7' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '07', name:'Jennifer', amount:34, items:2, tables:'T7' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '07', name:'Jennifer', amount:34, items:2, tables:'T7' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '07', name:'Jennifer', amount:34, items:2, tables:'T7' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '01', name:'Jennifer', amount:12, items:2, tables:'T1' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '02', name:'Jennifer', amount:53, items:2, tables:'T2' , status: 'Ending', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '03', name:'Jennifer', amount:60, items:2, tables:'T3' , status: 'Ending', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '04', name:'Jennifer', amount:100, items:2, tables:'T4' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '04', name:'Jennifer', amount:100, items:2, tables:'T4' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '04', name:'Jennifer', amount:100, items:2, tables:'T4' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '04', name:'Jennifer', amount:100, items:2, tables:'T4' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '05', name:'Jennifer', amount:200, items:2, tables:'T5' , status: 'Complete', waiter:'Lawrence', payment:'Cash', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '06', name:'Jennifer', amount:14, items:2, tables:'T6' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '06', name:'Jennifer', amount:14, items:2, tables:'T6' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '06', name:'Jennifer', amount:14, items:2, tables:'T6' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '06', name:'Jennifer', amount:14, items:2, tables:'T6' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},
    { no: '04', name:'Jennifer', amount:100, items:2, tables:'T4' , status: 'In process', waiter:'Lawrence', payment:'Card', action:{process:'process',edit:'edit',cancel:'cancel'}},

  ];
  ngOnInit(): void {
    this.observe('reporting');
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

}
