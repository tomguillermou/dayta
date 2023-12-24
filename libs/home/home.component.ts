import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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

  constructor(private _authService: AuthService) {}

  onSignOut(): void {
    this._authService.signOut().then(() => window.location.reload());
  }
}
