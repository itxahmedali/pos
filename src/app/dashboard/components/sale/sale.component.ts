import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef, Component, OnInit , ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UniversalService } from 'src/app/services/universal.service';
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
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
})
export class SaleComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  active = 1;
  modalReference: any;
  orderDetailView: boolean = false;
  public Sales: any = [
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 12,
      totalsales: 123,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 53,
      totalsales: 43,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 60,
      totalsales: 56,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 100,
      totalsales: 3566,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 100,
      totalsales: 7453,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 100,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 100,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 200,
      totalsales: 345,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 14,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 14,
      totalsales: 8797,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 14,
      totalsales: 767,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 14,
      totalsales: 978,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 100,
      totalsales: 9000,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 34,
      totalsales: 5467,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 34,
      totalsales: 456,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 34,
      totalsales: 456,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 34,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 34,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 12,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 53,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 60,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 100,
      totalsales: 234345,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 100,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 100,
      totalsales: 345,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 100,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 200,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 14,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 14,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 14,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 14,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 100,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 12,
      totalsales: 123,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 53,
      totalsales: 43,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 60,
      totalsales: 56,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 100,
      totalsales: 3566,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 100,
      totalsales: 7453,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 100,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 100,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 200,
      totalsales: 345,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 14,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 14,
      totalsales: 8797,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 14,
      totalsales: 767,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 14,
      totalsales: 978,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 100,
      totalsales: 9000,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 34,
      totalsales: 5467,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 34,
      totalsales: 456,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 34,
      totalsales: 456,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 34,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 34,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 12,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 53,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 60,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 100,
      totalsales: 234345,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 100,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 100,
      totalsales: 345,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 100,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 200,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 14,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 14,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 14,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 14,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
    {
      date: '01-Jan-2022',
      noitems: '01',
      nocustomers: 100,
      totalsales: 2,
      action: { process: 'process', edit: 'edit', cancel: 'cancel' },
    },
  ];
  public Expenses: any = [
    {
      date: '01-Jan-2022',
      expenses: 123,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 43,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 56,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 3566,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 7453,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 345,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 8797,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 767,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 978,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 9000,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 5467,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 456,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 456,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 234345,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 345,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 123,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 43,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 56,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 3566,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 7453,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 345,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 8797,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 767,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 978,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 9000,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 5467,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 456,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 456,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 234345,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 345,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
    {
      date: '01-Jan-2022',
      expenses: 2,
      description: 'Lorem ipsum asd uq we iasd asdjbqwe qwebasdjbqwbeq weqwgeqw e',
      type: "Other"
    },
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
    this.observe('sale&expenses');
  }
  overDetailView(){
    UniversalService.OrderDetailView.next(false)
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
    UniversalService.OrderDetailView.subscribe((res: boolean) => {
      if(res){
        this.orderDetailView = res
      }
      else{
        this.orderDetailView = false
        return
      }
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
