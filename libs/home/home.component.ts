import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest, filter, switchMap } from 'rxjs';

import { AuthService, User } from '@libs/auth';
import { Dashboard, DashboardComponent, DashboardService } from '@libs/dashboards';

type ViewModel = {
  currentUser: User | null;
  dashboards: Dashboard[];
  currentDashboard: Dashboard | null;
};

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, DashboardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private _reloadDashboards = new BehaviorSubject<boolean>(false);
  private _currentDashboard = new BehaviorSubject<Dashboard | null>(null);

  vm$: Observable<ViewModel> = combineLatest({
    currentUser: this._authService.currentUser$,
    currentDashboard: this._currentDashboard.asObservable(),
    dashboards: combineLatest([this._reloadDashboards.asObservable(), this._authService.currentUser$]).pipe(
      filter(([reload, user]) => reload || user !== null),
      switchMap(([_reload, user]) => this._dashboardService.getDashboardsForOwner(user!.id))
    ),
  });

  constructor(
    private _authService: AuthService,
    private _dashboardService: DashboardService,
    private _router: Router
  ) {}

  async onCreateDashboard(user: User | null): Promise<void> {
    if (!user) {
      return;
    }

    const newDashboard = await this._dashboardService.createDashboard({
      name: 'My Dashboard',
      description: 'My first dashboard',
      owner_id: user.id,
    });

    this._reloadDashboards.next(true);
    this._currentDashboard.next(newDashboard);
  }

  async onSignOut(): Promise<void> {
    await this._authService.signOut();
    this._router.navigate(['/login']);
  }

  async onSelectDashboard(dashboard: Dashboard): Promise<void> {
    this._currentDashboard.next(dashboard);
  }
}
