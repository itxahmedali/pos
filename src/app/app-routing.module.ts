import { AuthGuard } from './guards/auth.guard';
import { CartComponent } from './shared/cart/cart.component';
import { InnerGuard } from './guards/inner.guard';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome-customers',
    pathMatch: 'full',
  },
  {
    path: 'welcome-customers',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
    data: { animation: 'welcomePage' },
  },
  {
    path: 'welcome-waiters',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
    data: { animation: 'welcomePage' },
  },
  {
    path: 'welcome-kitchen',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
    data: { animation: 'welcomePage' },
  },
  {
    path: 'welcome-master',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
    data: { animation: 'welcomePage' },
  },
  {
    path: 'welcome-counter',
    component: WelcomeComponent,
    canActivate: [AuthGuard],
    data: { animation: 'welcomePage' },
  },
  {
    path: 'add-cart',
    component: CartComponent,
    canActivate: [InnerGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    data: { title: 'dashboard', roles: 'dashboard' },
    canActivate: [InnerGuard],
  }
];

@NgModule({
  imports: [BrowserAnimationsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
