import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, map, tap } from 'rxjs';

import { selectDashboard, updateDashboardRequested } from '@libs/store';

import { Dashboard } from '../dashboard';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-dashboard-edit',
  templateUrl: './dashboard-edit.component.html',
  styleUrls: ['./dashboard-edit.component.scss'],
})
export class DashboardEditComponent {
  editionForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  vm$ = combineLatest([this.store.select(selectDashboard)]).pipe(
    map(([dashboard]) => ({ dashboard })),
    tap(({ dashboard }) => {
      if (dashboard) {
        this.editionForm.patchValue({
          name: dashboard.name,
          description: dashboard.description,
        });
        this.editionForm.markAsUntouched();
      }
    })
  );

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  onEditDashboard(dashboard: Dashboard): void {
    const formValue = this.editionForm.getRawValue();

    this.store.dispatch(updateDashboardRequested({ dashboard: { ...dashboard, ...formValue } }));
  }
}
