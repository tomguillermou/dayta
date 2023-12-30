import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboards',
  },
  {
    path: 'dashboards',
    loadChildren: () => import('@libs/dashboard/page').then((m) => m.dashboardPageRoutes),
  },
  {
    path: 'auth',
    loadChildren: () => import('@libs/auth/page').then((m) => m.authPageRoutes),
  },
  {
    path: '**',
    redirectTo: 'dashboards',
  },
];
