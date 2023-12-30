import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';

import {
  createDashboardRequested,
  loadDashboardsRequested,
  signOutRequested,
  selectDashboards,
  selectUser,
} from '@libs/store';
import { User } from '@libs/supabase';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  vm$ = combineLatest([this.store.select(selectUser), this.store.select(selectDashboards)]).pipe(
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
        name: 'My new dashboard',
        description: 'Describe your dashboard here',
      })
    );
  }

  onSignOut(): void {
    this.store.dispatch(signOutRequested());
  }
}
