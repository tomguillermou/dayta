import { Injectable } from '@angular/core';
import { createClient, User } from '@supabase/supabase-js';

import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private _supabaseClient = createClient(environment.supabase.url, environment.supabase.key);

  constructor() {}

  async signIn(credentials: { email: string; password: string }): Promise<User> {
    const { data, error } = await this._supabaseClient.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      throw error;
    }

    return data.user;
  }

  async signOut(): Promise<void> {
    const { error } = await this._supabaseClient.auth.signOut();

    if (error) {
      throw error;
    }
  }

  async resetPassword(email: string): Promise<void> {
    const { error } = await this._supabaseClient.auth.resetPasswordForEmail(email);

    if (error) {
      throw error;
    }
  }
}
