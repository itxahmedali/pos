import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UniversalService } from 'src/app/services/universal.service';
import {
  NgbCalendar,
  NgbDateParserFormatter,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ChartComponent } from 'ng-apexcharts';
import { HttpService } from 'src/app/services/http.service';
import { HelperService } from 'src/app/services/helper.service';
import { Graph } from 'src/classes';
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
  overViewDetails: any = {};
  date = new Date();
  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private router: Router,
    private cd: ChangeDetectorRef,
    private modalService: NgbModal,
    private http: HttpService,
    private helper: HelperService
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'Sale',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'Revenue',
          data: [32, 34, 52, 41, 11, 32, 45],
        },
        {
          name: 'Expenses',
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
  async ngOnInit() {
    await this.getOverView();
    await this.dates();
  }
  async getOverView() {
    const res: any = await this.http
      .loaderPost(
        'overview',
        { domain_id: localStorage.getItem('domainId') },
        true
      )
      .toPromise();
    const realtimeOrdersItems = await Promise.all(
      res.data.realtime_orders.map(async (item: any) => {
        const items = JSON.parse(item.items);
        return items.length;
      })
    );
    this.overViewDetails = {
      realTimeOrders: res.data.realtime_orders.length,
      realTimeOrdersItems: realtimeOrdersItems.reduce(
        (acc, curr) => acc + curr,
        0
      ),
      sales_today: res.data.sales_today,
      total_orders: res.data.total_orders.length,
      total_table_occupied: res.data.total_table_occupied.length,
    };
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
  public generateData(baseval: any, count: any, yrange: any) {
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
  orderStatus() {
    UniversalService.headerHeading.next('Order Status');
    UniversalService.routePath.next('orderstatus');
  }
  dates() {
    this.helper.getGraph()?.then((graph: any) => {
      console.log(graph);
      this.chartOptions.series = [
        {
          name: 'Sale',
          data: graph?.sales_array,
        },
        {
          name: 'Revenue',
          data: graph?.revenue_array,
        },
        {
          name: 'Expenses',
          data: graph?.expense_array,
        },
      ];
      this.chartOptions.xaxis.categories = graph?.dates;
      this.chart.updateOptions(this.chartOptions);
    });
  }
  setGraph(event: any) {
    const data = {
      domain_id: localStorage.getItem('domainId'),
      to: event?.toDate,
      from: event?.fromDate,
    };
    this.http.loaderPost('sales-graph', data, true).subscribe((res: any) => {
      const GraphList =  {
        dates : res.data.dates,
        expense_array :res.data.expense_array,
        revenue_array: res.data.revenue_array,
        sales_array:  res.data.sales_array
      };
      this.chartOptions.series = [
        {
          name: 'Sale',
          data: GraphList?.sales_array,
        },
        {
          name: 'Revenue',
          data: GraphList?.revenue_array,
        },
        {
          name: 'Expenses',
          data: GraphList?.expense_array,
        },
      ];

      this.chartOptions.xaxis.categories = GraphList?.dates;
      this.chart.updateOptions(this.chartOptions);
    });
  }
}
