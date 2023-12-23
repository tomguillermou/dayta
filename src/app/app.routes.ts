import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('@libs/home').then((m) => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('@libs/login').then((m) => m.LoginComponent) },
  { path: '**', redirectTo: '/home' },
];
