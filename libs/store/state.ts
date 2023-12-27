import { User, getUserFromStorage } from '@libs/auth';
import { Dashboard } from '@libs/dashboard';

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
