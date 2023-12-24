import { Routes } from '@angular/router';

import { authGuard } from '@libs/auth';

export const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadComponent: () => import('@libs/home').then((m) => m.HomeComponent),
  },
  { path: 'login', pathMatch: 'full', loadComponent: () => import('@libs/login').then((m) => m.LoginComponent) },
  {
    path: 'reset-password',
    pathMatch: 'full',
    loadComponent: () => import('@libs/reset-password').then((m) => m.ResetPasswordComponent),
  },
  { path: '**', redirectTo: '/home' },
];
