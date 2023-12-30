import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Dashboard } from '@libs/dashboard';
import { User } from '@libs/user';

export const { signInRequested, signInSuccess, signInFail } = createActionGroup({
  source: 'Sign In Page',
  events: {
    'Sign In Requested': props<{ email: string; password: string }>(),
    'Sign In Success': props<{ user: User }>(),
    'Sign In Fail': props<{ error: string }>(),
  },
});

export const { signUpRequested, signUpSuccess, signUpFail } = createActionGroup({
  source: 'Sign Up Page',
  events: {
    'Sign Up Requested': props<{ email: string; password: string }>(),
    'Sign Up Success': props<{ user: User }>(),
    'Sign Up Fail': props<{ error: string }>(),
  },
});

export const { resetPasswordRequested, resetPasswordSuccess, resetPasswordFail } = createActionGroup({
  source: 'Reset Password Page',
  events: {
    'Reset Password Requested': props<{ email: string }>(),
    'Reset Password Success': emptyProps(),
    'Reset Password Fail': props<{ error: string }>(),
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
