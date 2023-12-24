import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { User, SupabaseService } from '@libs/supabase';

import { getUserFromStorage, setUserInStorage } from './storage.helper';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = new BehaviorSubject<User | null>(getUserFromStorage());

  readonly currentUser$ = this._user.asObservable();
  readonly isLoggedIn$ = this.currentUser$.pipe(map((user) => Boolean(user)));

  constructor(private _supabaseService: SupabaseService) {
    this._user.subscribe((user) => setUserInStorage(user));
  }

  public async signIn(credentials: { email: string; password: string }): Promise<void> {
    const user = await this._supabaseService.signIn(credentials);

    this._user.next(user);
  }

  public async signOut(): Promise<void> {
    await this._supabaseService.signOut();

    this._user.next(null);
  }

  public async resetPassword(email: string): Promise<void> {
    await this._supabaseService.resetPassword(email);
  }
}
