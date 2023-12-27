import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';

import { loadDashboardRequested } from '../../store';

export const dashboardPageResolver: ResolveFn<void> = (route: ActivatedRouteSnapshot) => {
  const store = inject(Store);
  const dashboardId = route.paramMap.get('dashboard_id');

  if (dashboardId) {
    store.dispatch(loadDashboardRequested({ dashboard_id: dashboardId }));
  }
};
