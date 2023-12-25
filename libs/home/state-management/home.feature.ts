import { createFeature, createReducer, on } from '@ngrx/store';

import { User } from '@libs/auth';
import { Dashboard } from '@libs/dashboards';

import { homeActions } from './home.actions';

type HomeState = {
  user: User | null;
  dashboard: Dashboard | null;
  dashboards: Dashboard[];
};

const initialState: HomeState = {
  user: null,
  dashboard: null,
  dashboards: [],
};

export const homeFeature = createFeature({
  name: 'home',
  reducer: createReducer(
    initialState,
    on(
      homeActions.currentUserRetrieved,
      (state, { user }): HomeState => ({
        ...state,
        user: { ...user },
      })
    ),
    on(
      homeActions.loadDashboardsFulfilled,
      (state, { dashboards }): HomeState => ({
        ...state,
        dashboards: [...dashboards],
      })
    ),
    on(
      homeActions.dashboardSelected,
      (state, { dashboard }): HomeState => ({
        ...state,
        dashboard: { ...dashboard },
      })
    ),
    on(
      homeActions.createDashboardFulfilled,
      (state, { dashboard }): HomeState => ({
        ...state,
        dashboard: { ...dashboard },
        dashboards: [dashboard, ...state.dashboards],
      })
    ),
    on(
      homeActions.deleteDashboardFulfilled,
      (state, { dashboard }): HomeState => ({
        ...state,
        dashboard: null,
        dashboards: [...state.dashboards.filter((d) => d.id !== dashboard.id)],
      })
    )
  ),
});
