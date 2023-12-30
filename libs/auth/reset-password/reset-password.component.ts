import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';

import { AuthClient } from '@libs/auth/client';

type Alert = { message: string; type: 'success' | 'error' };

type ViewModel = {
  loading: boolean;
  alert: Alert | undefined;
};

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
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

  constructor(private authClient: AuthClient, private _formBuilder: FormBuilder) {
    this.resetPasswordForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      this.resetPassword();
    } else {
      this.alert$.next({ message: 'Please enter a valid email address.', type: 'error' });
    }
  }

  private resetPassword(): void {
    this.alert$.next(undefined);
    this.loading$.next(true);

    this.authClient.resetPassword(this.resetPasswordForm.value.email).then(
      () => {
        this.alert$.next({ message: 'Check your email for a password reset link.', type: 'success' });
        this.loading$.next(false);
      },
      (error) => {
        this.alert$.next({ message: error.message, type: 'error' });
        this.loading$.next(false);
      }
    );
  }
}
