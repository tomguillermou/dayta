import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { resetPasswordRequested } from '@libs/store';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  email = this.formBuilder.nonNullable.control('', [Validators.required, Validators.email]);

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  onResetPassword(): void {
    if (this.email.valid) {
      this.store.dispatch(resetPasswordRequested({ email: this.email.value }));
    }
  }
}
