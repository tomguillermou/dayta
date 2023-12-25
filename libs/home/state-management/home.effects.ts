import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';

import { AuthService } from '@libs/auth';
import { DashboardService } from '@libs/dashboards';

import { homeActions } from './home.actions';

export const getCurrentUser = createEffect(
  (action$ = inject(Actions), authService = inject(AuthService)) => {
    const currentUser$ = authService.currentUser$.pipe(filter(Boolean));

    return action$.pipe(
      ofType(homeActions.currentUserRequested),
      withLatestFrom(currentUser$),
      map(([, user]) => homeActions.currentUserRetrieved({ user }))
    );
  },
  { functional: true }
);

export const loadDashboards = createEffect(
  (action$ = inject(Actions), authService = inject(AuthService), dashboardService = inject(DashboardService)) => {
    const currentUser$ = authService.currentUser$.pipe(filter(Boolean));

    return action$.pipe(
      ofType(homeActions.loadDashboardsRequested),
      withLatestFrom(currentUser$),
      switchMap(([, user]) => dashboardService.getDashboardsForOwner(user.id)),
      map((dashboards) => homeActions.loadDashboardsFulfilled({ dashboards })),
      catchError((error) => of(homeActions.loadDashboardsFailed({ error })))
    );
  },
  { functional: true }
);

export const createDashboard = createEffect(
  (action$ = inject(Actions), dashboardService = inject(DashboardService)) => {
    return action$.pipe(
      ofType(homeActions.createDashboardRequested),
      switchMap(({ user_id, name, description }) =>
        dashboardService.createDashboard({ name, description, owner_id: user_id })
      ),
      map((dashboard) => homeActions.createDashboardFulfilled({ dashboard })),
      catchError((error) => of(homeActions.createDashboardFailed({ error })))
    );
  },
  { functional: true }
);

export const deleteDashboard = createEffect(
  (action$ = inject(Actions), dashboardService = inject(DashboardService)) => {
    return action$.pipe(
      ofType(homeActions.deleteDashboardRequested),
      switchMap(({ dashboard }) => dashboardService.deleteDashboard(dashboard.id)),
      map((dashboard) => homeActions.deleteDashboardFulfilled({ dashboard })),
      catchError((error) => of(homeActions.deleteDashboardFailed({ error })))
    );
  },
  { functional: true }
);

export const signOut = createEffect(
  (action$ = inject(Actions), authService = inject(AuthService), router = inject(Router)) => {
    return action$.pipe(
      ofType(homeActions.signOutRequested),
      switchMap(() => authService.signOut()),
      tap(() => router.navigate(['/login']))
    );
  },
  { functional: true, dispatch: false }
);
