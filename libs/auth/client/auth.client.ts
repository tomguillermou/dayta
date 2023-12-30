import { Injectable } from '@angular/core';

import { SupabaseService, User } from '@libs/supabase';

@Injectable({
  providedIn: 'root',
})
export class AuthClient {
  constructor(private supabase: SupabaseService) {}

  async signUp(credentials: { email: string; password: string }): Promise<User> {
    const { data, error } = await this.supabase.client.auth.signUp({ ...credentials });

    if (error) {
      throw error;
    }
    if (!data.user) {
      throw new Error('User is null after signing up');
    }

    return data.user;
  }

  async signIn(credentials: { email: string; password: string }): Promise<User> {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({ ...credentials });

    if (error) {
      throw error;
    }

    return data.user;
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.client.auth.signOut();

    if (error) {
      throw error;
    }
  }

  async resetPassword(email: string): Promise<void> {
    const { error } = await this.supabase.client.auth.resetPasswordForEmail(email);

    if (error) {
      throw error;
    }
  }
}
