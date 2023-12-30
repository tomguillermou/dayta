import { Injectable } from '@angular/core';

import { SupabaseService } from '@libs/supabase';
import { User } from '@libs/user';

@Injectable({
  providedIn: 'root',
})
export class AuthClient {
  constructor(private supabase: SupabaseService) {}

  async signUp(credentials: { email: string; password: string }): Promise<User> {
    const { data, error } = await this.supabase.client.auth.signUp({ ...credentials });

    if (error?.message === 'User already registered') {
      throw new Error('User already registered');
    } else if (error) {
      // Implement logger
      throw new Error('Internal server error');
    }

    return data.user!;
  }

  async signIn(credentials: { email: string; password: string }): Promise<User> {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({ ...credentials });

    if (error?.message === 'Invalid login credentials') {
      throw new Error('Invalid credentials');
    } else if (error) {
      // Implement logger
      throw new Error('Internal server error');
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
