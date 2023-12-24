import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';

import { AuthService, User } from '@libs/auth';
import { DashboardService } from '@libs/dashboards';

type ViewModel = {
  currentUser: User | null;
};

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // private _selectedDashboard = new BehaviorSubject<string | null>(null);

  vm$: Observable<ViewModel> = combineLatest({
    currentUser: this._authService.currentUser$,
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
  }

  async onSignOut(): Promise<void> {
    await this._authService.signOut();
    this._router.navigate(['/login']);
  }
}
