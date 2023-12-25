import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    loadChildren: () => import('@libs/home').then((m) => m.homeRoutes),
  },
  { path: 'login', pathMatch: 'full', loadComponent: () => import('@libs/login').then((m) => m.LoginComponent) },
  {
    path: 'reset-password',
    pathMatch: 'full',
    loadComponent: () => import('@libs/reset-password').then((m) => m.ResetPasswordComponent),
  },
  { path: '**', redirectTo: '/home' },
];
