import { Routes } from '@angular/router';

import { authGuard } from '@libs/auth';

export const routes: Routes = [
  {
    path: 'dashboards',
    canActivate: [authGuard],
    loadChildren: () => import('@libs/dashboard/page').then((m) => m.dashboardPageRoutes),
  },
  { path: 'login', pathMatch: 'full', loadComponent: () => import('@libs/login').then((m) => m.LoginComponent) },
  {
    path: 'reset-password',
    pathMatch: 'full',
    loadComponent: () => import('@libs/reset-password').then((m) => m.ResetPasswordComponent),
  },
  { path: '**', redirectTo: '/dashboards' },
];
