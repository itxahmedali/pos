import { AuthGuardService } from './../../services/auth-guard.service';
import { HelperService } from './../../services/helper.service';
import { UniversalService } from './../../services/universal.service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormComponent } from '../form/form.component';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';
import { LoaderService } from 'src/app/services/loader.service';
import { Setting } from 'src/classes';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  href: string;
  skip: any = true;
  url: string;
  id: number;
  public Data: any = {};
  public formValid = false;
  public auth: boolean;
  public setting: Setting;
  @ViewChild(FormComponent) formComponent: FormComponent;
  constructor(
    private router: Router,
    private helper: HelperService,
    private authGuardService: AuthGuardService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private http: HttpService,
    private cd:ChangeDetectorRef
  ) {}
  async ngOnInit() {
    await this.observe();
    this.href = await this.router.url;
    if (this.helper.urlSplit(this.href) == 'welcome-waiters') {
      this.skip = this.helper.urlCheck(this.href, 'welcome-waiters', 'waiters');
      this.auth = true;
    }
    if (this.helper.urlSplit(this.href) == 'welcome-kitchen') {
      this.skip = this.helper.urlCheck(this.href, 'welcome-kitchen', 'kitchen');
      this.auth = true;
    }
    if (this.helper.urlSplit(this.href) == 'welcome-master') {
      this.skip = this.helper.urlCheck(this.href, 'welcome-master', 'master');
      this.auth = true;
    }
    if (this.helper.urlSplit(this.href) == 'welcome-counter') {
      this.skip = this.helper.urlCheck(this.href, 'welcome-counter', 'counter');
      this.auth = true;
    }
    if (this.helper.urlSplit(this.href) == 'welcome-customers') {
      this.skip = false;
      this.auth = false;
    }
    await this.getData();
    await this.getSettings();
  }
  signin(event: string, customer: any) {
    const formData = this.formComponent.formGroup.value;
    if (
      this.formComponent.formGroup.status == 'VALID' &&
      event == 'signin' &&
      this.auth
      ) {
      let loginData = {
        email: formData.Email,
        password: formData.Password,
        domain: localStorage.getItem('subDomain'),
      };
      this.http.loaderPost('login', loginData, false).subscribe((res: any) => {
        if (res) {
          if (res?.hasOwnProperty('errors')) {
            for (const key in res?.errors) {
              this.toaster.error(res?.errors[key]);
            }
          } else {
            this.toaster.success(res?.message);
            localStorage.setItem('access_token', res?.token);
            if (this.helper.urlSplit(this.href) == 'welcome-waiters') {
              this.router.navigate(['/dashboard']);
              this.authGuardService.login('waiters');
              localStorage.setItem('orderview', 'true');
              UniversalService.SideBar.next(false);
            }
            if (this.helper.urlSplit(this.href) == 'welcome-kitchen') {
              this.router.navigate(['/dashboard']);
              this.authGuardService.login('kitchen');
            }
            if (this.helper.urlSplit(this.href) == 'welcome-counter') {
              this.router.navigate(['/dashboard']);
              this.authGuardService.login('counter');
            }
            if (this.helper.urlSplit(this.href) == 'welcome-master') {
              this.router.navigate(['/dashboard']);
              this.authGuardService.login('master');
            }
            AuthService.signin.next(true);
            UniversalService.modules.next(true);
          }
        }
      });
    }
    // else if for feedback api form
    else if (event == 'signin' && !this.auth) {
      let loginData = {
        name: formData.Name,
        email: formData.Email,
        password: formData.Password,
        phone: formData.Phone,
        domain_id: localStorage.getItem('domainId'),
      };
      this.http.loaderPost('add-customers', loginData, false).subscribe((res: any) => {
        if (res) {
          if (res?.hasOwnProperty('errors')) {
            for (const key in res?.errors) {
              this.toaster.error(res?.errors[key]);
            }
          } else {
            this.toaster.success(res?.message);
            localStorage.setItem('access_token', 'skipped');
            if (this.helper.urlSplit(this.href) == 'welcome-customers') {
              this.router.navigate(['/dashboard']);
              this.authGuardService.login('customers');
              AuthService.signin.next(true);
              UniversalService.modules.next(true);
            }
          }
        }
      });
    } else if (event == 'skip') {
      localStorage.setItem('access_token', 'skipped');
      this.generateUniqueId();
      if (this.helper.urlSplit(this.href) == 'welcome-customers') {
        this.authGuardService.login('customers');
        this.router.navigate(['/dashboard']);
      }
      AuthService.signin.next(true);
      UniversalService.modules.next(true);
    } else {
      this.toaster.error('Form invalid!');
      return;
    }
  }
  generateUniqueId() {
    // Generate a unique ID with a length of at least 5 characters
    const uniqueId = Math.random().toString(36).substring(2, 7);
    const randomNumber = Math.floor(Math.random() * 1000);
    // Generate a corresponding secret key with some unique text
    const secretKey = `${uniqueId + '-' + randomNumber}`;
    localStorage.setItem('customer_id', uniqueId);
    localStorage.setItem('customer_secret', secretKey);
  }
  async getData() {
    let data = localStorage.getItem('domainId');
    if (data) {
      this.id = await JSON.parse(data);
    } else return;
  }
  async getSettings() {
    if(localStorage.getItem('domainId')){
      this.helper.getSettings().then((settings: Setting) => {
        this.setting = settings;
      });
    }
  }
  async observe(){
    UniversalService.settingLoad.subscribe((res: boolean) => {
      this.getSettings();
      this.cd.detectChanges();
    });
  }
}
