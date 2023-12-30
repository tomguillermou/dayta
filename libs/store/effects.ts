import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of, from, filter, withLatestFrom, tap } from 'rxjs';

import { AuthClient } from '@libs/auth/client';
import { deleteUserFromStorage, setUserInStorage } from '@libs/auth/storage';
import { DashboardClient } from '@libs/dashboard/client';
import { Toaster } from '@libs/toaster';

import {
  loadDashboardRequested,
  loadDashboardSuccess,
  loadDashboardFail,
  createDashboardRequested,
  deleteDashboardRequested,
  loadDashboardsRequested,
  loadDashboardsFail,
  createDashboardSuccess,
  deleteDashboardSuccess,
  loadDashboardsSuccess,
  createDashboardFail,
  deleteDashboardFail,
  updateDashboardRequested,
  updateDashboardSuccess,
  updateDashboardFail,
  signUpRequested,
  signUpSuccess,
  signUpFail,
  signInRequested,
  signInSuccess,
  signInFail,
  signOutRequested,
  signOutSuccess,
  signOutFail,
} from './actions';
import { selectUser } from './selectors';

export const loadDashboard = createEffect(
  (action$ = inject(Actions), dashboardClient = inject(DashboardClient)) => {
    return action$.pipe(
      ofType(loadDashboardRequested),
      switchMap((action) =>
        from(dashboardClient.getDashboardById(action.dashboard_id)).pipe(
          filter(Boolean),
          map((dashboard) => loadDashboardSuccess({ dashboard })),
          catchError((error) => of(loadDashboardFail({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const afterLoadDashboardFail = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(loadDashboardFail),
      tap(() => router.navigate(['/dashboards']))
    );
  },
  { functional: true, dispatch: false }
);

export const loadDashboards = createEffect(
  (action$ = inject(Actions), store = inject(Store), dashboardClient = inject(DashboardClient)) => {
    return action$.pipe(
      ofType(loadDashboardsRequested),
      withLatestFrom(store.select(selectUser)),
      map(([, user]) => user),
      filter(Boolean),
      switchMap((user) => dashboardClient.getDashboardsByUserId(user.id)),
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
        dashboardClient.createDashboard({ name, description, user_id: user_id })
      ),
      filter(Boolean),
      map((dashboard) => createDashboardSuccess({ dashboard })),
      catchError((error) => of(createDashboardFail({ error })))
    );
  },
  { functional: true }
);

export const afterCreateDashboardSuccess = createEffect(
  (action$ = inject(Actions), router = inject(Router), toaster = inject(Toaster)) => {
    return action$.pipe(
      ofType(createDashboardSuccess),
      tap(({ dashboard }) => router.navigate(['/dashboards', dashboard.id])),
      tap(() => toaster.showSuccess({ text: 'Dashboard created' }))
    );
  },
  { functional: true, dispatch: false }
);

export const updateDashboard = createEffect(
  (action$ = inject(Actions), dashboardClient = inject(DashboardClient)) => {
    return action$.pipe(
      ofType(updateDashboardRequested),
      switchMap(({ dashboard }) => dashboardClient.updateDashboardById(dashboard.id, dashboard)),
      filter(Boolean),
      map((dashboard) => updateDashboardSuccess({ dashboard })),
      catchError((error) => of(updateDashboardFail({ error })))
    );
  },
  { functional: true }
);

export const afterUpdateDashboardSuccess = createEffect(
  (action$ = inject(Actions), router = inject(Router), toaster = inject(Toaster)) => {
    return action$.pipe(
      ofType(updateDashboardSuccess),
      tap(({ dashboard }) => router.navigate(['/dashboards', dashboard.id])),
      tap(() => toaster.showSuccess({ text: 'Dashboard updated' }))
    );
  },
  { functional: true, dispatch: false }
);

export const deleteDashboard = createEffect(
  (action$ = inject(Actions), dashboardRepo = inject(DashboardClient)) => {
    return action$.pipe(
      ofType(deleteDashboardRequested),
      switchMap(({ dashboard_id }) => dashboardRepo.deleteDashboardById(dashboard_id)),
      filter(Boolean),
      map((dashboard) => deleteDashboardSuccess({ dashboard })),
      catchError((error) => of(deleteDashboardFail({ error })))
    );
  },
  { functional: true }
);

export const afterDeleteDashboardSuccess = createEffect(
  (action$ = inject(Actions), router = inject(Router), toaster = inject(Toaster)) => {
    return action$.pipe(
      ofType(deleteDashboardSuccess),
      tap(() => router.navigate(['/dashboards'])),
      tap(() => toaster.showSuccess({ text: 'Dashboard deleted' }))
    );
  },
  { functional: true, dispatch: false }
);

export const signUp = createEffect(
  (action$ = inject(Actions), authClient = inject(AuthClient)) => {
    return action$.pipe(
      ofType(signUpRequested),
      switchMap((credentials) =>
        from(authClient.signUp(credentials)).pipe(
          map((user) => signUpSuccess({ user })),
          catchError((error) => of(signUpFail({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const afterSignUpSuccess = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(signUpSuccess),
      tap(({ user }) => setUserInStorage(user)),
      tap(() => router.navigate(['/']))
    );
  },
  { functional: true, dispatch: false }
);

export const signIn = createEffect(
  (action$ = inject(Actions), authClient = inject(AuthClient)) => {
    return action$.pipe(
      ofType(signInRequested),
      switchMap((credentials) =>
        from(authClient.signIn(credentials)).pipe(
          map((user) => signInSuccess({ user })),
          catchError((error) => of(signInFail({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const afterSignInSuccess = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(signInSuccess),
      tap(({ user }) => setUserInStorage(user)),
      tap(() => router.navigate(['/']))
    );
  },
  { functional: true, dispatch: false }
);

export const signOut = createEffect(
  (action$ = inject(Actions), authClient = inject(AuthClient)) => {
    return action$.pipe(
      ofType(signOutRequested),
      switchMap(() =>
        from(authClient.signOut()).pipe(
          map(() => signOutSuccess()),
          catchError((error) => of(signOutFail({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const afterSignOutSuccess = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(signOutSuccess),
      tap(() => deleteUserFromStorage()),
      tap(() => router.navigate(['/auth/sign-in']))
    );
  },
  { functional: true, dispatch: false }
);
