import { createReducer, on } from '@ngrx/store';

import { type AppState, initialAppState } from './state';
import {
  createDashboardSuccess,
  loadDashboardSuccess,
  loadDashboardsSuccess,
  logInSuccess,
  signOutSuccess,
  updateDashboardSuccess,
} from './actions';

export const appReducer = createReducer(
  initialAppState,
  on(
    logInSuccess,
    (state, { user }): AppState => ({
      ...state,
      user: { ...user },
    })
  ),
  on(signOutSuccess, (): AppState => ({ ...initialAppState })),
  on(
    createDashboardSuccess,
    (state, { dashboard }): AppState => ({
      ...state,
      dashboards: [dashboard, ...state.dashboards],
    })
  ),
  on(
    loadDashboardsSuccess,
    (state, { dashboards }): AppState => ({
      ...state,
      dashboards: [...dashboards],
    })
  ),
  on(
    loadDashboardSuccess,
    (state, { dashboard }): AppState => ({
      ...state,
      dashboard: { ...dashboard },
    })
  ),
  on(
    updateDashboardSuccess,
    (state, { dashboard }): AppState => ({
      ...state,
      dashboard: { ...dashboard },
    })
  )
);
