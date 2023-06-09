import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../guards/role.guard';
import { AddOnComponent } from './components/add-on/add-on.component';
import { CategoryComponent } from './components/category/category.component';
import { CreatedDiscountComponent } from './components/created-discount/created-discount.component';
import { CustomerDataComponent } from './components/customer-data/customer-data.component';
import { EditComponent } from './components/edit/edit.component';
import { FooditemsComponent } from './components/fooditems/fooditems.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ItemsComponent } from './components/items/items.component';
import { MenuItemsComponent } from './components/menu-items/menu-items.component';
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
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
let menuItem: any = localStorage.getItem('routes');
let role = localStorage.getItem('role')
let routes: Routes = [];
if(role == 'master'){
  routes.push({
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'orderStatus',
        component: OrdersComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'items',
        component: ItemsComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'createDiscount',
        component: CreatedDiscountComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'staff',
        component: StaffComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'sale&expenses',
        component: SaleComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'staffPayroll',
        component: StaffPayRollComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'support',
        component: SupportComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'overview',
        component: OverviewComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      // {
      //   path: 'inventory',
      //   component: InventoryComponent,
      //   canActivate: [RoleGuard],
      //   data: { allowedRoles: ['master'] },
      // },
      {
        path: 'customerData',
        component: CustomerDataComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'setting',
        component: SettingComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'menu',
        component: MenuComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'reporting',
        component: ReportingComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'foodItems',
        component: FooditemsComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'category',
        component: CategoryComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'sub-category',
        component: SubCategoryComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'add-ons',
        component: AddOnComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'foodItems/edit/:id',
        component: EditComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'foodItems/add',
        component: EditComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'category/edit/:id',
        component: EditComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'category/add',
        component: EditComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'sub-category/edit/:id',
        component: EditComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'sub-category/add',
        component: EditComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'add-ons/edit/:id',
        component: EditComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
      {
        path: 'add-ons/add',
        component: EditComponent,
        canActivate: [RoleGuard],
        data: { allowedRoles: ['master'] },
      },
    ],
  },)
}
else if(role == 'customers'){
  const route:any = generateRoutes(JSON.parse(menuItem))
  routes.push({
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: route?.[0]?.path ? route?.[0]?.path : '',
        pathMatch: 'full',
      },
      ...generateRoutes(JSON.parse(menuItem))
    ],
  },)
}
function generateRoutes(menuItems: any): Route[] {
  const routes: Route[] = [];
  if (menuItem) {
    for (const menuItem of menuItems) {
      if (menuItem?.type === 'link') {
        routes.push({
          path: menuItem?.path,
          component: MenuItemsComponent,
          canActivate: [RoleGuard],
          data: { allowedRoles: ['customers'] },
          // component: getMenuComponent(menuItem?.title),
        });
      } else if (menuItem?.type === 'sub') {
        for (const child of menuItem?.children) {
          routes.push({
            path: `${child?.path}`,
            component: MenuItemsComponent,
            canActivate: [RoleGuard],
            data: { allowedRoles: ['customers'] },
            // component: getMenuComponent(child?.title),
          });
        }
      }
    }
  }
  return routes;
}
// optional if want to put differten components we can use switch
function getMenuComponent(title: string): any {
  switch (title) {
    case 'Starters':
      return MenuItemsComponent;
    case 'Fast Food':
      return MenuItemsComponent;
    case 'BBQ':
      return MenuItemsComponent;
    // etc.
    default:
      return MenuItemsComponent;
  }
}
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
