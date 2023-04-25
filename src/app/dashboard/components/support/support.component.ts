import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';
import { UniversalService } from 'src/app/services/universal.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  public myData:any = localStorage.getItem('my_data')
  public supportForm: any = this.fb.group({
    domain_id: [localStorage.getItem('domainId'), Validators.required],
    user_id: [JSON.parse(this.myData)?.id, Validators.required],
    message: [null, Validators.required]
  });

  constructor(private http:HttpService, private toaster:ToastrService, private fb:FormBuilder) { }
  ngOnInit(): void {
  }
  async send(){
    await this.http
      .loaderPost('add-support', this.supportForm.value, true)
      .subscribe((res: any) => {
        this.toaster.success(res?.message)
        this.supportForm.reset();
      });
  }

}
