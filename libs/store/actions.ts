import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Dashboard } from '@libs/dashboard';
import { User } from '@libs/user';

export const { logInRequested, logInSuccess, logInFail } = createActionGroup({
  source: 'Login Page',
  events: {
    'Log In Requested': props<{ email: string; password: string }>(),
    'Log In Success': props<{ user: User }>(),
    'Log In Fail': props<{ error: string }>(),
  },
});

export const { signUpRequested, signUpSuccess, signUpFail } = createActionGroup({
  source: 'Register Page',
  events: {
    'Sign Up Requested': props<{ email: string; password: string }>(),
    'Sign Up Success': props<{ user: User }>(),
    'Sign Up Fail': props<{ error: string }>(),
  },
});

export const {
  signOutRequested,
  signOutSuccess,
  signOutFail,
  loadDashboardsRequested,
  loadDashboardsSuccess,
  loadDashboardsFail,
  createDashboardRequested,
  createDashboardSuccess,
  createDashboardFail,
  deleteDashboardRequested,
  deleteDashboardSuccess,
  deleteDashboardFail,
} = createActionGroup({
  source: 'Sidebar',
  events: {
    'Sign Out Requested': emptyProps(),
    'Sign Out Success': emptyProps(),
    'Sign Out Fail': props<{ error: string }>(),
    'Load Dashboards Requested': emptyProps(),
    'Load Dashboards Success': props<{ dashboards: Array<Pick<Dashboard, 'id' | 'name'>> }>(),
    'Load Dashboards Fail': props<{ error: string }>(),
    'Create Dashboard Requested': props<{ name: string; description: string; user_id: string }>(),
    'Create Dashboard Success': props<{ dashboard: Dashboard }>(),
    'Create Dashboard Fail': props<{ error: string }>(),
    'Delete Dashboard Requested': props<{ dashboard_id: Dashboard['id'] }>(),
    'Delete Dashboard Success': props<{ dashboard: Dashboard }>(),
    'Delete Dashboard Fail': props<{ error: string }>(),
  },
});

export const {
  loadDashboardRequested,
  loadDashboardFail,
  loadDashboardSuccess,
  updateDashboardRequested,
  updateDashboardSuccess,
  updateDashboardFail,
} = createActionGroup({
  source: 'Dashboard Page',
  events: {
    'Load Dashboard Requested': props<{ dashboard_id: Dashboard['id'] }>(),
    'Load Dashboard Success': props<{ dashboard: Dashboard }>(),
    'Load Dashboard Fail': props<{ error: string }>(),
    'Update Dashboard Requested': props<{ dashboard: Dashboard }>(),
    'Update Dashboard Success': props<{ dashboard: Dashboard }>(),
    'Update Dashboard Fail': props<{ error: string }>(),
  },
});
