import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { authGuard } from '@libs/auth';

import { homeFeature, homeEffects } from './state-management';

export const homeRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    providers: [provideState(homeFeature), provideEffects(homeEffects)],
    loadComponent: () => import('./home.component').then((m) => m.HomeComponent),
  },
];
