import { Routes } from '@angular/router';

import { authGuard } from '@libs/auth';

import { dashboardPageResolver } from './dashboard-page.resolver';

export const dashboardPageRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./dashboard-page.component').then((m) => m.DashboardPageComponent),
    children: [
      {
        path: ':id',
        resolve: { dashboardPageResolver },
        loadComponent: () => import('../view/dashboard-view.component').then((m) => m.DashboardViewComponent),
      },
      {
        path: ':id/edit',
        resolve: { dashboardPageResolver },
        loadComponent: () => import('../edit/dashboard-edit.component').then((m) => m.DashboardEditComponent),
      },
    ],
  },
];
