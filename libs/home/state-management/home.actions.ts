import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { User } from '@libs/auth';
import { Dashboard } from '@libs/dashboards';

export const homeActions = createActionGroup({
  source: 'Home',
  events: {
    'Current User Requested': emptyProps(),
    'Current User Retrieved': props<{ user: User }>(),
    'Sign Out Requested': emptyProps(),
    'Load Dashboards Requested': emptyProps(),
    'Load Dashboards Fulfilled': props<{ dashboards: Dashboard[] }>(),
    'Load Dashboards Failed': props<{ error: string }>(),
    'Dashboard Selected': props<{ dashboard: Dashboard }>(),
    'Create Dashboard Requested': props<{ name: string; description: string; user_id: string }>(),
    'Create Dashboard Fulfilled': props<{ dashboard: Dashboard }>(),
    'Create Dashboard Failed': props<{ error: string }>(),
    'Delete Dashboard Requested': props<{ dashboard: Dashboard }>(),
    'Delete Dashboard Fulfilled': props<{ dashboard: Dashboard }>(),
    'Delete Dashboard Failed': props<{ error: string }>(),
  },
});
