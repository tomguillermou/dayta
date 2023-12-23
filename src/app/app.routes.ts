import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('libs/login').then((m) => m.LoginComponent) },
  { path: '**', redirectTo: '/login' },
];
