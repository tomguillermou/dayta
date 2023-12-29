import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import Swal from 'sweetalert2';

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
  addValue = this.formBuilder.control('');

  vm$ = combineLatest([this.store.select(selectDashboard)]).pipe(
    map(([dashboard]) => ({
      dashboard,
    }))
  );

  constructor(private formBuilder: FormBuilder, private router: Router, private store: Store) {}

  onAddValue(dashboard: Dashboard): void {
    const isValidValue = this.addValue.value && !isNaN(Number(this.addValue.value));

    if (isValidValue) {
      const newValue = { x: Date.now(), y: Number(this.addValue.value) };

      this.store.dispatch(
        updateDashboardRequested({
          dashboard: {
            ...dashboard,
            chart_data: [...dashboard.chart_data, newValue],
          },
        })
      );

      this.addValue.reset();
    }
  }

  onEditDashboard(dashboard: Dashboard): void {
    this.router.navigate(['dashboards', dashboard.id, 'edit']);
  }

  async onDeleteDashboard(dashboard: Dashboard): Promise<void> {
    const result = await Swal.fire({
      title: 'Confirm to delete',
      text: ' Delete this dashboard forever?',
      showCancelButton: true,
      cancelButtonText: 'No, cancel',
      cancelButtonColor: 'var(bs-secondary)',
      confirmButtonText: 'Yes, delete it',
      confirmButtonColor: 'var(--bs-danger)',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      this.store.dispatch(deleteDashboardRequested({ dashboard_id: dashboard.id }));
    }
  }
}
