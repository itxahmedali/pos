import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { HttpService } from 'src/app/services/http.service';
import { UniversalService } from 'src/app/services/universal.service';

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
    theme: [null, Validators.required],
    banner_shade: [null, Validators.required],
  });
  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private http: HttpService,
    private fb: FormBuilder,
    private helper: HelperService
  ) {}
  async ngOnInit() {
    await this.getData();
    await this.getSettings();
  }
  async getData() {
    let data = localStorage.getItem('domainId');
    if (data) {
      this.id = await JSON.parse(data);
    } else return;
  }
  async getSettings() {
    await this.http
      .loaderPost('get-setting', { domain_id: this.id }, true)
      .subscribe((res: any) => {
        this.settingsForm.patchValue({
          logo: res?.data?.logo,
          banner: res?.data?.banner,
          profile: res?.data?.profile,
          restaurant_name: res?.data?.restaurant_name,
          city: res?.data?.city,
          address: res?.data?.address,
          phone: res?.data?.phone,
          email: res?.data?.email,
          description: res?.data?.description,
          theme: res?.data?.theme,
          banner_shade: res?.data?.banner_shade,
        });
      });
  }
  upload(event: any, type: any) {
    this.helper
      .fileUploadHttp(event)
      .then((result: any) => {
        this.settingsForm.patchValue({
          [type]: result.data.image_url,
        });
        console.log(this.settingsForm.controls['logo'].value);
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
      .subscribe((res: any) => {
        this.settingsForm.removeControl('domain_id');
        this.getSettings()
        UniversalService.logoUpdated.next(this.settingsForm.controls['logo'].value)
      });
  }
}
