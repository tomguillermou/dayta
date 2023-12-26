import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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

  @Output() nameOrDescriptionChanged = new EventEmitter<boolean>();

  dashboardName!: FormControl<Dashboard['name']>;
  dashboardDescription!: FormControl<Dashboard['description']>;

  constructor(private _dashboardService: DashboardService, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.dashboardName = this._formBuilder.nonNullable.control(this.dashboard.name, Validators.required);
    this.dashboardDescription = this._formBuilder.nonNullable.control(this.dashboard.description, Validators.required);

    this.dashboardName.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((name) =>
          this._dashboardService.updateDashboard({ dashboardId: this.dashboard.id, fields: { name } })
        )
      )
      .subscribe((updateDashboard) => {
        this.dashboard = { ...updateDashboard };
        this.nameOrDescriptionChanged.emit(true);
      });

    this.dashboardDescription.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((description) =>
          this._dashboardService.updateDashboard({ dashboardId: this.dashboard.id, fields: { description } })
        )
      )
      .subscribe((updateDashboard) => {
        this.dashboard = { ...updateDashboard };
        this.nameOrDescriptionChanged.emit(true);
      });
  }
}
