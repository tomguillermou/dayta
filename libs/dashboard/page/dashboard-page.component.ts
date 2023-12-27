import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest, debounceTime, distinctUntilChanged, map } from 'rxjs';

import { Dashboard } from '../dashboard';
import { DashboardChartComponent } from '../chart';
import { Store } from '@ngrx/store';
import { dashboardDescriptionChanged, dashboardNameChanged, selectDashboard } from '../../store';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DashboardChartComponent],
  selector: 'app-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  dashboardName: FormControl<Dashboard['name']>;
  dashboardDescription: FormControl<Dashboard['description']>;

  vm$ = combineLatest([this.store.select(selectDashboard)]).pipe(
    map(([dashboard]) => ({
      dashboard,
    }))
  );

  constructor(private fb: FormBuilder, private store: Store) {
    this.dashboardName = this.fb.nonNullable.control('', Validators.required);
    this.dashboardDescription = this.fb.nonNullable.control('', Validators.required);
  }

  ngOnInit(): void {
    this.dashboardName.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((updatedName) => {
      this.store.dispatch(dashboardNameChanged({ name: updatedName }));
    });

    this.dashboardDescription.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((updatedDescription) => {
        this.store.dispatch(dashboardDescriptionChanged({ description: updatedDescription }));
      });
  }
}
