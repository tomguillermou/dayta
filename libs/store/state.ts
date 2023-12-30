import { getUserFromStorage } from '@libs/auth/storage';
import { Dashboard } from '@libs/dashboard';
import { User } from '@libs/supabase';

export type AppState = {
  user: User | null;
  dashboard: Dashboard | null;
  dashboards: Array<Pick<Dashboard, 'id' | 'name'>>;
};

export const initialAppState: AppState = {
  user: getUserFromStorage(),
  dashboard: null,
  dashboards: [],
};
