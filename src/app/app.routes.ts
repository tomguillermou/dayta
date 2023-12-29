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
    path: 'login',
    pathMatch: 'full',
    loadComponent: () => import('@libs/login').then((m) => m.LoginComponent),
  },
  {
    path: 'reset-password',
    pathMatch: 'full',
    loadComponent: () => import('@libs/reset-password').then((m) => m.ResetPasswordComponent),
  },
  {
    path: '**',
    redirectTo: 'dashboards',
  },
];
