import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';

import { deleteDashboardRequested, selectDashboard } from '../../store';
import { DashboardChartComponent } from '../chart';
import { Dashboard } from '../dashboard';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, DashboardChartComponent],
  selector: 'app-dashboard',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
})
export class DashboardViewComponent {
  vm$ = combineLatest([this.store.select(selectDashboard)]).pipe(
    map(([dashboard]) => ({
      dashboard,
    }))
  );

  constructor(private router: Router, private store: Store) {}

  onDeleteDashboard(dashboard: Dashboard): void {
    this.store.dispatch(deleteDashboardRequested({ dashboard_id: dashboard.id }));
  }

  onEditDashboard(dashboard: Dashboard): void {
    this.router.navigate(['dashboards', dashboard.id, 'edit']);
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
