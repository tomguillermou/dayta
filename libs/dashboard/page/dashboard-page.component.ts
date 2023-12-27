import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { combineLatest, map, tap } from 'rxjs';

// import { Dashboard } from '../dashboard';
import { DashboardChartComponent } from '../chart';
import { Store } from '@ngrx/store';
import { selectDashboard } from '../../store';
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
    tap(([dashboard]) => console.log('dashboard', dashboard)),
    map(([dashboard]) => ({
      dashboard,
    }))
  );

  constructor(private store: Store) {}
}
