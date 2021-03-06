import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { ItemsComponent }      from './items/items.component';
import { ItemDetailComponent }  from './item-detail/item-detail.component';
import { HistoricalDisplayComponent }  from './historical-display/historical-display.component';
import { PortfolioComponent }  from './portfolio/portfolio.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // can activate checks if the user is locked in, otherwise it redirects to login page.
  { path: 'portfolio', component: PortfolioComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: ItemDetailComponent, canActivate: [AuthGuard] },
  { path: 'items', component: ItemsComponent, canActivate: [AuthGuard] },
  { path: 'historical', component: HistoricalDisplayComponent, canActivate: [AuthGuard] },

  //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
