import { Routes } from '@angular/router';

import { dashboardPageResolver } from './dashboard-page.resolver';

export const dashboardPageRoutes: Routes = [
  {
    path: ':id',
    resolve: { dashboardPageResolver },
    loadComponent: () => import('./dashboard-page.component').then((m) => m.DashboardPageComponent),
  },
];
