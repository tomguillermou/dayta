import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

import { Dashboard } from './dashboard';
import { DashboardService } from './dashboard.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Input() dashboard!: Dashboard;

  dashboardForm!: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
  }>;

  constructor(private _dashboardService: DashboardService, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.dashboardForm = this._formBuilder.nonNullable.group({
      name: [this.dashboard.name, Validators.required],
      description: [this.dashboard.description, Validators.required],
    });

    this.dashboardForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        switchMap((updates) =>
          this._dashboardService.updateDashboard({
            dashboardId: this.dashboard.id,
            fields: updates,
          })
        )
      )
      .subscribe((updatedDashboard) => {
        this.dashboard = updatedDashboard;
      });
  }
}
