import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from '../layout/layout.module';
import { CreatedDiscountComponent } from './components/created-discount/created-discount.component';
import { CustomerDataComponent } from './components/customer-data/customer-data.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ItemsComponent } from './components/items/items.component';
import { MenuComponent } from './components/menu/menu.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ReportingComponent } from './components/reporting/reporting.component';
import { SaleComponent } from './components/sale/sale.component';
import { SettingComponent } from './components/setting/setting.component';
import { StaffComponent } from './components/staff/staff.component';
import { StaffPayRollComponent } from './components/staff-pay-roll/staff-pay-roll.component';
import { SupportComponent } from './components/support/support.component';
import { FooditemsComponent } from './components/fooditems/fooditems.component';
import { CategoryComponent } from './components/category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './components/edit/edit.component';
import { AddOnComponent } from './components/add-on/add-on.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { EllipsisPipe } from '../pipes/ellipses.pipe';
import { FilterPipe } from '../pipes/filter.pipe';
import { MenuItemsComponent } from './components/menu-items/menu-items.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { NgxProgressiveImageLoaderModule, IImageLoaderOptions } from 'ngx-progressive-image-loader';

@NgModule({
  declarations: [
    DashboardComponent,
    CreatedDiscountComponent,
    CustomerDataComponent,
    InventoryComponent,
    ItemsComponent,
    MenuComponent,
    OrdersComponent,
    OverviewComponent,
    ReportingComponent,
    SaleComponent,
    SettingComponent,
    StaffComponent,
    StaffPayRollComponent,
    SupportComponent,
    FooditemsComponent,
    CategoryComponent,
    EditComponent,
    AddOnComponent,
    EllipsisPipe,
    FilterPipe,
    MenuItemsComponent,
    SubCategoryComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutModule,
    SharedModule,
    NgbModule,
    NgbNavModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    CarouselModule,
    NgxProgressiveImageLoaderModule.forRoot(<IImageLoaderOptions>{
      // rootMargin must be specified in pixels or percent
      rootMargin: '30px',
      threshold: 0.1,
      // css filter
      filter: 'blur(3px)',
      // image width / height ratio for image holder
      imageRatio: 16 / 9,
      // loading image in placeholder. Can be URL or base64
      placeholderImageSrc:
        // tslint:disable-next-line:max-line-length
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICA8cGF0aCBmaWxsPSIjZGQwMDMxIiBkPSJNMTI1IDMwTDMxLjkgNjMuMmwxNC4yIDEyMy4xTDEyNSAyMzBsNzguOS00My43IDE0LjItMTIzLjF6Ii8+CiAgPHBhdGggZmlsbD0iI2MzMDAyZiIgZD0iTTEyNSAzMHYyMi4yLS4xVjIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMUwxMjUgMzB6Ii8+CiAgPHBhdGggZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPgo='
    }),
  ]
})
export class DashboardModule { }
