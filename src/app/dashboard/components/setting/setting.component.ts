import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';
import { UniversalService } from 'src/app/services/universal.service';
import { DiscountGst, Setting } from 'src/classes';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  public id: number;
  public settings: any;
  public settingsForm: any = this.fb.group({
    logo: [null, Validators.required],
    banner: [null, Validators.required],
    profile: [null, Validators.required],
    restaurant_name: [null, Validators.required],
    city: [null, Validators.required],
    address: [null, Validators.required],
    phone: [null, Validators.required],
    email: [null, Validators.required],
    description: [null, Validators.required],
    slogan: [null, Validators.required],
    theme: [null, Validators.required],
    banner_shade: [null, Validators.required]
  });
  public discountGstForm: any = this.fb.group({
    GST: [null, Validators.required],
    discount: [null, Validators.required],
    all_menu_discount: [null, Validators.required]
  });
  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private http: HttpService,
    private fb: FormBuilder,
    private helper: HelperService
  ) {}
  async ngOnInit() {
    await this.observe();
    await this.getData();
    await this.getSettings();
    await this.getDiscountGst()
  }
  async getData() {
    let data = localStorage.getItem('domainId');
    if (data) {
      this.id = await JSON.parse(data);
    } else return;
  }
  async observe(){
    UniversalService.settingLoad.subscribe((res: boolean) => {
      this.getSettings();
      this.cd.detectChanges();
    });
  }
  async getSettings() {
    if(localStorage.getItem('domainId')){
    await this.helper.getSettings()?.then((settings: Setting) => {
      this.settingsForm.patchValue({
        logo: settings?.logo,
        banner: settings?.banner,
        profile: settings?.profile,
        restaurant_name: settings?.restaurant_name,
        city: settings?.city,
        address: settings?.address,
        phone: settings?.phone,
        email: settings?.email,
        description: settings?.description,
        slogan:settings?.slogan,
        theme: settings?.theme,
        banner_shade: settings?.banner_shade
      });
    })
  }
  }
  async getDiscountGst(){
    await this.helper.getDiscountGst()?.then((gstDiscount: DiscountGst) => {
      console.log(gstDiscount);
      this.discountGstForm.patchValue({
        GST: gstDiscount?.GST,
        discount: gstDiscount?.discount,
        all_menu_discount: gstDiscount?.all_menu_discount,
      });

    })
  }
  upload(event: any, type: any) {
    this.helper
      .fileUploadHttp(event)
      .then((result: any) => {
        this.settingsForm.patchValue({
          [type]: result.data.image_url,
        });
        console.log(this.settingsForm.value);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  colorTheme(event: any) {
    const colors = event.target.value.split(', ');
    localStorage.setItem('theme', JSON.stringify(colors));
    this.settingsForm.patchValue({
      theme: colors,
    });
    document.documentElement.style.setProperty(
      '--body-primary-prop',
      colors[0]
    );
    document.documentElement.style.setProperty(
      '--body-secondary-prop',
      colors[1]
    );
  }
  colorBanner(event: any) {
    const colors = event.target.value.split(', ');
    localStorage.setItem('bannertheme', JSON.stringify(colors));
    this.settingsForm.patchValue({
      banner_shade: colors,
    });
    console.log(this.settingsForm.value);

    document.documentElement.style.setProperty(
      '--banner-primary-color',
      colors[0]
    );
    document.documentElement.style.setProperty(
      '--banner-secondary-color',
      colors[1]
    );
    document.documentElement.style.setProperty(
      '--bannerForm-primary-color',
      colors[0]
    );
    document.documentElement.style.setProperty(
      '--bannerForm-secondary-color',
      colors[1]
    );
  }
  async save() {
    this.settingsForm.addControl('domain_id', new FormControl(this.id));
    await this.http
      .loaderPost('add-setting', this.settingsForm.value, true)
      .subscribe(async(res: any) => {
        await this.settingsForm.removeControl('domain_id');
        await this.helper.setSettings()
        await this.getSettings()
        UniversalService.logoUpdated.next(this.settingsForm.controls['logo'].value)
      });
  }
  async stateItem(event: any) {
    this.discountGstForm.patchValue({
      all_menu_discount: event.target.checked ? 1 : 0
    })
    if(event.target.checked == 0){
      this.saveDiscount();
    }
  }
  async saveDiscount() {
    this.discountGstForm.addControl('domain_id', new FormControl(this.id));
    await this.http
      .loaderPost('add-gst-charges', this.discountGstForm.value, true)
      .subscribe(async(res: any) => {
        await this.discountGstForm.removeControl('domain_id');
        await this.helper.setDiscountGst()
        console.log('hello3')
        await this.getDiscountGst()
      });
  }
}
