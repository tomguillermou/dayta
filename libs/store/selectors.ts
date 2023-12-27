import { createFeature } from '@ngrx/store';

import { appReducer } from './reducers';

export const { selectDashboard, selectDashboards, selectUser } = createFeature({
  name: 'app',
  reducer: appReducer,
});
