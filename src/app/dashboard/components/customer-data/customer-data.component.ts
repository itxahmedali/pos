import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversalService } from 'src/app/services/universal.service';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.component.html',
  styleUrls: ['./customer-data.component.scss']
})
export class CustomerDataComponent {
  modalReference: any;
  constructor(private router:Router, private cd:ChangeDetectorRef, private modalService: NgbModal) { }
  public Staff: any = [
    {
      id: 1,
      Name: 'Jennifer',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'Johnsons',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'Cena',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'Jennifer',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'Johnsons',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'Cena',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'John Sandwich',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'John',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'John',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'John',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'John Sandwich',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'John',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'John',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'John',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'John Sandwich',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'John',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'John',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'John',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'John',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'John',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'John',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'John',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'John',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'John',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },
    {
      id: 1,
      Name: 'John',
      contact: '123-456-789-0',
      email:'abc@exmaple.com',
      lastdinein: '01-Jan-2022',
    },

];
  ngOnInit(): void {
    this.observe('customerdata');
  }
  alert(){
   alert('no screen')

  }
  open(content: any, modal: any) {
      this.modalReference = this.modalService.open(content, {
        centered: true,
        backdrop: 'static',
        windowClass: 'checkoutModal',
        size: 'md'
      });
  }
  proceed() {
    this.modalReference.close();
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
