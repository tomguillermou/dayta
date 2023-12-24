import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';

import { AuthService, User } from '@libs/auth';

type ViewModel = {
  currentUser: User | null;
};

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  vm$: Observable<ViewModel> = combineLatest({
    currentUser: this._authService.currentUser$,
  });

  constructor(private _authService: AuthService, private _router: Router) {}

  onSignOut(): void {
    this._authService.signOut().then(() => this._router.navigate(['/login']));
  }
}
