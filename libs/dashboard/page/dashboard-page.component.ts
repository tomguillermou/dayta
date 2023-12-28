import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { combineLatest, map } from 'rxjs';

// import { Dashboard } from '../dashboard';
import { DashboardChartComponent } from '../chart';
import { Store } from '@ngrx/store';
import { deleteDashboardRequested, selectDashboard } from '../../store';
import { SidebarComponent } from '@libs/sidebar';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DashboardChartComponent, SidebarComponent],
  selector: 'app-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent {
  vm$ = combineLatest([this.store.select(selectDashboard)]).pipe(
    map(([dashboard]) => ({
      dashboard,
    }))
  );

  constructor(private store: Store) {}

  onDeleteDashboard(dashboardId: string): void {
    this.store.dispatch(deleteDashboardRequested({ dashboard_id: dashboardId }));
  }

  mockData(): Array<{ x: number; y: number }> {
    let ts2 = 1484418600000;
    const dates = [{ x: ts2, y: 0 }];

    for (let i = 0; i < 30; i++) {
      ts2 = ts2 + 60 * 3600;
      dates.push({ x: ts2, y: Math.floor(Math.random() * 90) + 10 });
    }

    return dates;
  }
}
