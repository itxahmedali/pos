import { fadeIn } from './../../../animations/itemCartAnimation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeIn],
})
export class OrderComponent implements OnInit {
  @Input() data: any;
  Orders:any
  OrderDetail:any
  modalReference: any;
  constructor(private modalService: NgbModal) { }
  ngOnChanges(changes: SimpleChanges) {
    this.Orders = this.data;
  }
  ngOnInit(): void {
  }
  open(content:any, modal:any) {
    this.OrderDetail = modal
    this.modalReference = this.modalService.open(content, { centered: true, backdrop:'static', windowClass: 'checkoutModal',size:'xl'});
	}
  modalClose(){
    localStorage.removeItem('modal')
  }
  proceed(){
    this.modalReference.close();
  }
}
