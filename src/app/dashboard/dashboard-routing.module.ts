import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { CreatedDiscountComponent } from './components/created-discount/created-discount.component';
import { CustomerDataComponent } from './components/customer-data/customer-data.component';
import { FooditemsComponent } from './components/fooditems/fooditems.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ItemsComponent } from './components/items/items.component';
import { MenuComponent } from './components/menu/menu.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ReportingComponent } from './components/reporting/reporting.component';
import { SaleComponent } from './components/sale/sale.component';
import { SettingComponent } from './components/setting/setting.component';
import { StaffPayRollComponent } from './components/staff-pay-roll/staff-pay-roll.component';
import { StaffComponent } from './components/staff/staff.component';
import { SupportComponent } from './components/support/support.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'master',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      { path: 'orderstatus', component: OrdersComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'creatediscount', component: CreatedDiscountComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'sale&expenses', component: SaleComponent },
      { path: 'staffpayroll', component: StaffPayRollComponent },
      { path: 'support', component: SupportComponent },
      { path: 'overview', component: OverviewComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'customerdata', component: CustomerDataComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'reporting', component: ReportingComponent },
      { path: 'fooditems', component: FooditemsComponent },
      { path: 'category', component: CategoryComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
