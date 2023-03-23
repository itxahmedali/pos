import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UniversalService } from 'src/app/services/universal.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  constructor(private router:Router, private cd:ChangeDetectorRef) { }
  uploadImage(event:any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload =()=>{
     };
    }

  ngOnInit(): void {
    this.observe('setting');
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
  colorTheme(event:any){
    const colors = event.target.value.split(", ");
    localStorage.setItem('theme', JSON.stringify(colors))
    document.documentElement.style.setProperty('--body-primary-prop', colors[0]);
    document.documentElement.style.setProperty('--body-secondary-prop', colors[1]);
  }
  colorBanner(event:any){
    const colors = event.target.value.split(", ");
    localStorage.setItem('bannertheme', JSON.stringify(colors))
    document.documentElement.style.setProperty('--banner-primary-color', colors[0]);
    document.documentElement.style.setProperty('--banner-secondary-color', colors[1]);
    document.documentElement.style.setProperty('--bannerForm-primary-color', colors[0]);
    document.documentElement.style.setProperty('--bannerForm-secondary-color', colors[1]);
  }

}
