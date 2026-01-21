import { Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { UserComponent } from './component/user/user.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full', },
  { path: 'dashboard', component: DashboardComponent, title: 'Dashboard' },
  { path: 'user', component: UserComponent, title: 'User' },
  {
    path: 'user/:id',
    component: UserDetailComponent,
  },
  { path: '**', redirectTo: 'dashboard' },
];
