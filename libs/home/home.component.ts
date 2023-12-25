import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';

import { AuthService, User } from '@libs/auth';
import { Dashboard, DashboardComponent, DashboardService } from '@libs/dashboards';

type ViewModel = {
  currentUser: User | null;
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
  private _currentDashboard = new BehaviorSubject<Dashboard | null>(null);

  vm$: Observable<ViewModel> = combineLatest({
    currentUser: this._authService.currentUser$,
    currentDashboard: this._currentDashboard.asObservable(),
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
    console.log('🚀  newDashboard:', newDashboard);

    this._currentDashboard.next(newDashboard);
  }

  async onSignOut(): Promise<void> {
    await this._authService.signOut();
    this._router.navigate(['/login']);
  }
}
