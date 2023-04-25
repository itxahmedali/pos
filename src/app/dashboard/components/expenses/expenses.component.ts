import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent {
  modalReference: any;
  public Expenses: any;
  public expenseForm: any = this.fb.group({
    domain_id: [localStorage.getItem('domainId'), Validators.required],
    date: [null, Validators.required],
    expenses: [null, Validators.required],
    description: [null, Validators.required],
    type: [null, Validators.required],
  });
  constructor(
    private modalService: NgbModal,
    private http: HttpService,
    private fb: FormBuilder,
    private toaster:ToastrService
  ) {}
  async ngOnInit() {
    await this.getExpenses();
  }
  open(content: any) {
    this.modalReference = this.modalService.open(content, {
      centered: true,
      backdrop: 'static',
      windowClass: 'checkoutModal',
    });
  }
  proceed() {
    this.modalReference.close();
  }
  async addExpense() {
    await this.http
      .loaderPost(
        'add-expense',
        this.expenseForm.value,
        true
      )
      .subscribe((res: any) => {
        this.toaster.success(res?.message)
        this.getExpenses()
        this.proceed()
        this.expenseForm.reset()
      });
  }
  async getExpenses() {
    await this.http
      .loaderPost(
        'get-expense',
        { domain_id: localStorage.getItem('domainId') },
        true
      )
      .subscribe((res: any) => {
        this.Expenses = res?.data;
      });
  }
}
