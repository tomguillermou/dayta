import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of, from, filter, withLatestFrom, tap } from 'rxjs';

import { AuthService, deleteUserFromStorage, setUserInStorage } from '@libs/auth';
import { DashboardClient } from '@libs/dashboard/client';

import {
  loadDashboardRequested,
  loadDashboardSuccess,
  loadDashboardFail,
  updateDashboardRequested,
  updateDashboardSuccess,
  updateDashboardFail,
  createDashboardRequested,
  deleteDashboardRequested,
  loadDashboardsRequested,
  signOutRequested,
  loadDashboardsFail,
  createDashboardSuccess,
  deleteDashboardSuccess,
  loadDashboardsSuccess,
  createDashboardFail,
  deleteDashboardFail,
  signOutSuccess,
  logInRequested,
  logInSuccess,
} from './actions';
import { selectDashboard, selectUser } from './selectors';

export const loadDashboard = createEffect(
  (action$ = inject(Actions), dashboardClient = inject(DashboardClient)) => {
    return action$.pipe(
      ofType(loadDashboardRequested),
      switchMap((action) => from(dashboardClient.getDashboardById(action.dashboard_id))),
      filter(Boolean),
      map((dashboard) => loadDashboardSuccess({ dashboard })),
      catchError((error) => of(loadDashboardFail({ error })))
    );
  },
  { functional: true }
);

export const updateDashboardAfterNameChange = createEffect(
  (action$ = inject(Actions), store = inject(Store)) => {
    return action$.pipe(
      ofType(loadDashboardSuccess),
      withLatestFrom(store.select(selectDashboard)),
      map(([{ dashboard }]) => updateDashboardRequested({ dashboard }))
    );
  },
  { functional: true }
);

export const updateDashboard = createEffect(
  (action$ = inject(Actions), dashboardClient = inject(DashboardClient), store = inject(Store)) => {
    return action$.pipe(
      ofType(updateDashboardRequested),
      withLatestFrom(store.select(selectDashboard)),
      switchMap(([{ dashboard }]) =>
        from(
          dashboardClient.updateDashboardById(dashboard.id, {
            description: dashboard.description,
            name: dashboard.name,
          })
        )
      ),
      filter(Boolean),
      map((dashboard) => updateDashboardSuccess({ dashboard })),
      catchError((error) => of(updateDashboardFail({ error })))
    );
  },
  { functional: true }
);

export const loadDashboards = createEffect(
  (action$ = inject(Actions), store = inject(Store), dashboardClient = inject(DashboardClient)) => {
    return action$.pipe(
      ofType(loadDashboardsRequested),
      withLatestFrom(store.select(selectUser)),
      map(([, user]) => user),
      filter(Boolean),
      switchMap((user) => dashboardClient.getDashboardsByOwnerId(user.id)),
      map((dashboards) => loadDashboardsSuccess({ dashboards })),
      catchError((error) => of(loadDashboardsFail({ error })))
    );
  },
  { functional: true }
);

export const createDashboard = createEffect(
  (action$ = inject(Actions), dashboardClient = inject(DashboardClient)) => {
    return action$.pipe(
      ofType(createDashboardRequested),
      switchMap(({ user_id, name, description }) =>
        dashboardClient.createDashboard({ name, description, owner_id: user_id })
      ),
      filter(Boolean),
      map((dashboard) => createDashboardSuccess({ dashboard })),
      catchError((error) => of(createDashboardFail({ error })))
    );
  },
  { functional: true }
);

export const deleteDashboard = createEffect(
  (action$ = inject(Actions), dashboardRepo = inject(DashboardClient)) => {
    return action$.pipe(
      ofType(deleteDashboardRequested),
      switchMap(({ dashboard }) => dashboardRepo.deleteDashboardById(dashboard.id)),
      filter(Boolean),
      map((dashboard) => deleteDashboardSuccess({ dashboard })),
      catchError((error) => of(deleteDashboardFail({ error })))
    );
  },
  { functional: true }
);

export const signIn = createEffect(
  (action$ = inject(Actions), authService = inject(AuthService)) => {
    return action$.pipe(
      ofType(logInRequested),
      switchMap((credentials) => authService.signIn(credentials)),
      map((user) => logInSuccess({ user }))
    );
  },
  { functional: true }
);

export const afterSignIn = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(logInSuccess),
      tap(({ user }) => setUserInStorage(user)),
      tap(() => router.navigate(['/home']))
    );
  },
  { functional: true, dispatch: false }
);

export const signOut = createEffect(
  (action$ = inject(Actions), authService = inject(AuthService)) => {
    return action$.pipe(
      ofType(signOutRequested),
      switchMap(() => authService.signOut()),
      map(() => signOutSuccess())
    );
  },
  { functional: true }
);

export const afterSignOut = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(signOutSuccess),
      tap(() => deleteUserFromStorage()),
      tap(() => router.navigate(['/login']))
    );
  },
  { functional: true, dispatch: false }
);