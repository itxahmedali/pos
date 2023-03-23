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
import { ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';


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
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutModule,
    SharedModule,
    NgbModule,
    NgbNavModule,
    NgApexchartsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }