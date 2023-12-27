import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';

import { User } from '@libs/auth';
import { Dashboard } from 'libs/dashboard';
import {
  createDashboardRequested,
  deleteDashboardRequested,
  loadDashboardsRequested,
  signOutRequested,
  selectDashboards,
  selectUser,
} from '@libs/store';

type ViewModel = {
  user: User | null;
  dashboards: Array<Pick<Dashboard, 'id' | 'name'>>;
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  vm$: Observable<ViewModel> = combineLatest([this.store.select(selectUser), this.store.select(selectDashboards)]).pipe(
    map(([user, dashboards]) => ({
      user,
      dashboards,
    }))
  );

  constructor(private store: Store) {
    this.store.dispatch(loadDashboardsRequested());
  }

  onCreateDashboard(user: User): void {
    this.store.dispatch(
      createDashboardRequested({
        user_id: user.id,
        name: 'New dashboard',
        description: 'Describe your dashboard here',
      })
    );
  }

  onDeleteDashboard(dashboard: Dashboard): void {
    this.store.dispatch(deleteDashboardRequested({ dashboard }));
  }

  onSignOut(): void {
    this.store.dispatch(signOutRequested());
  }
}
