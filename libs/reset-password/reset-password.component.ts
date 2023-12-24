import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';

import { AuthService } from '@libs/auth';

type Alert = { message: string; type: 'success' | 'danger' };

type ViewModel = {
  loading: boolean;
  alert: Alert | undefined;
};

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;

  alert$ = new BehaviorSubject<Alert | undefined>(undefined);
  loading$ = new BehaviorSubject<boolean>(false);

  vm$: Observable<ViewModel> = combineLatest({
    loading: this.loading$.asObservable(),
    alert: this.alert$.asObservable(),
  });

  constructor(private _authService: AuthService, private _formBuilder: FormBuilder) {
    this.resetPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      this.resetPassword();
    } else {
      this.alert$.next({ message: 'Please enter a valid email address.', type: 'danger' });
    }
  }

  private resetPassword(): void {
    this.alert$.next(undefined);
    this.loading$.next(true);

    this._authService.resetPassword(this.resetPasswordForm.value.email).then(
      () => {
        this.alert$.next({ message: 'Check your email for a password reset link.', type: 'success' });
        this.loading$.next(false);
      },
      (error) => {
        this.alert$.next({ message: error.message, type: 'danger' });
        this.loading$.next(false);
      }
    );
  }
}
