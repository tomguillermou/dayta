import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';

import { User } from '@libs/auth';
import { Dashboard, DashboardComponent } from '@libs/dashboards';

import { homeActions, homeFeature } from './state-management';

type ViewModel = {
  user: User | null;
  dashboard: Dashboard | null;
  dashboards: Dashboard[];
};

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, DashboardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  vm$: Observable<ViewModel> = combineLatest([
    this.store.select(homeFeature.selectUser),
    this.store.select(homeFeature.selectDashboard),
    this.store.select(homeFeature.selectDashboards),
  ]).pipe(
    map(([user, dashboard, dashboards]) => ({
      user,
      dashboard,
      dashboards,
    }))
  );

  constructor(private store: Store) {}

  ngOnInit(): void {
    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(homeActions.currentUserRequested());
    // eslint-disable-next-line @ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store.dispatch(homeActions.loadDashboardsRequested());
  }

  async onCreateDashboard(user: User): Promise<void> {
    this.store.dispatch(
      homeActions.createDashboardRequested({
        user_id: user.id,
        name: 'New dashboard',
        description: 'Describe your dashboard here',
      })
    );
  }

  async onDeleteDashboard(dashboard: Dashboard): Promise<void> {
    this.store.dispatch(homeActions.deleteDashboardRequested({ dashboard }));
  }

  async onSignOut(): Promise<void> {
    this.store.dispatch(homeActions.signOutRequested());
  }

  async onSelectDashboard(dashboard: Dashboard): Promise<void> {
    this.store.dispatch(homeActions.dashboardSelected({ dashboard }));
  }
}
