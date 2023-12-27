import { Injectable } from '@angular/core';

import { User, SupabaseService } from '@libs/supabase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _supabaseService: SupabaseService) {}

  public async signIn(credentials: { email: string; password: string }): Promise<User> {
    return this._supabaseService.signIn(credentials);
  }

  public async signOut(): Promise<void> {
    return this._supabaseService.signOut();
  }

  public async resetPassword(email: string): Promise<void> {
    await this._supabaseService.resetPassword(email);
  }
}
