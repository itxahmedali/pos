import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UniversalService } from 'src/app/services/universal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  ChartComponent
} from 'ng-apexcharts';
export type ChartOptions = {
  series: any;
  chart: any;
  xaxis: any;
  stroke: any;
  tooltip: any;
  dataLabels: any;
};

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  active = 1;
  modalReference: any;
  public BookingTables: any = [
    { Tableno: 'Table 01', NumberOfPerson: '04 Person', status: 'free' },
    { Tableno: 'Table 02', NumberOfPerson: '03 Person', status: 'Reserve' },
    { Tableno: 'Table 03', NumberOfPerson: '04 Person', status: 'booked' },
    { Tableno: 'Table 04', NumberOfPerson: '01 Person', status: 'free' },
    { Tableno: 'Table 05', NumberOfPerson: '05 Person', status: 'free' },
    { Tableno: 'Table 06', NumberOfPerson: '02 Person', status: 'booked' },
    { Tableno: 'Table 07', NumberOfPerson: '02 Person', status: 'free' },
    { Tableno: 'Table 08', NumberOfPerson: '01 Person', status: 'free' },
    { Tableno: 'Table 09', NumberOfPerson: '03 Person', status: 'free' },
    { Tableno: 'Table 10', NumberOfPerson: '01 Person', status: 'Reserve' },
    { Tableno: 'Table 11', NumberOfPerson: '04 Person', status: 'free' },
    { Tableno: 'Table 12', NumberOfPerson: '03 Person', status: 'Reserve' },
    { Tableno: 'Table 13', NumberOfPerson: '04 Person', status: 'booked' },
    { Tableno: 'Table 14', NumberOfPerson: '03 Person', status: 'Reserve' },
    { Tableno: 'Table 15', NumberOfPerson: '04 Person', status: 'booked' },
    { Tableno: 'Table 16', NumberOfPerson: '04 Person', status: 'free' },
  ];
  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
    };
  }
  ngOnInit(): void {
    // this.observe('overview');
  }
  // async observe(path: string) {
  //   if (path) {
  //     this.router.navigate([`master/${path}`]);
  //   }
  //   UniversalService.routePath.subscribe((res: string) => {
  //     let path = res.toLowerCase();
  //     this.router.navigate([`master/${path}`]);
  //     this.cd.detectChanges();
  //   });
  // }
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
  public generateData(baseval:any, count:any, yrange:any) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }
  orderStatus(){
    UniversalService.headerHeading.next('Order Status');
    UniversalService.routePath.next('orderstatus')
  }
}
