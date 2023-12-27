import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';

import { logInRequested } from '@libs/store';

interface ViewModel {
  loading: boolean;
  error: string;
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  error$ = new BehaviorSubject<string>('');
  loading$ = new BehaviorSubject<boolean>(false);

  vm$: Observable<ViewModel> = combineLatest({
    loading: this.loading$.asObservable(),
    error: this.error$.asObservable(),
  });

  constructor(private fb: FormBuilder, private store: Store) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(logInRequested({ ...this.loginForm.value }));
    } else {
      this.error$.next('Invalid email or password.');
    }
  }

  // private signIn(): void {
  //   this.error$.next('');
  //   this.loading$.next(true);

  //   this._authService
  //     .signIn(this.loginForm.value)
  //     .then(() => {
  //       this.loading$.next(false);
  //       this._router.navigate(['/home']);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       this.loading$.next(false);
  //       this.error$.next('Invalid email or password.');
  //     });
  // }
}
