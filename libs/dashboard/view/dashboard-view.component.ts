import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, map, tap } from 'rxjs';

import { deleteDashboardRequested, selectDashboard, updateDashboardRequested } from '../../store';
import { DashboardChartComponent } from '../chart';
import { Dashboard } from '../dashboard';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, DashboardChartComponent],
  selector: 'app-dashboard',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
})
export class DashboardViewComponent {
  editionForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  vm$ = combineLatest([this.store.select(selectDashboard)]).pipe(
    map(([dashboard]) => ({
      dashboard,
    })),
    tap(({ dashboard }) => {
      this.editionForm.patchValue({
        name: dashboard?.name ?? '',
        description: dashboard?.description ?? '',
      });
    })
  );

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  onDeleteDashboard(dashboard: Dashboard): void {
    this.store.dispatch(deleteDashboardRequested({ dashboard_id: dashboard.id }));
  }

  onEditDashboard(dashboard: Dashboard): void {
    const formValue = this.editionForm.getRawValue();

    this.store.dispatch(updateDashboardRequested({ dashboard: { ...dashboard, ...formValue } }));
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
