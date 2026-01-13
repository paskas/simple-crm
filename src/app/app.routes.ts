import { Routes } from '@angular/router';
import { LayoutPagePage } from './layout/layout-page/layout-page.page';

export const routes: Routes = [
  { path: '', component: LayoutPagePage, title: 'SimpleCrm' },
  { path: '**', redirectTo: '' }
];
