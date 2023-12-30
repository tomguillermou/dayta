import { Injectable } from '@angular/core';

import { EmailNotAvailablError, InternalServerError, InvalidCredentialsError } from '@libs/errors';
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
      throw new EmailNotAvailablError();
    } else if (error) {
      // Implement logger
      throw new InternalServerError();
    }

    return data.user!;
  }

  async signIn(credentials: { email: string; password: string }): Promise<User> {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({ ...credentials });

    if (error?.message === 'Invalid login credentials') {
      throw new InvalidCredentialsError();
    } else if (error) {
      // Implement logger
      throw new InternalServerError();
    }

    return data.user;
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.client.auth.signOut();

    if (error) {
      // Implement logger
      throw new InternalServerError();
    }
  }

  async resetPassword(email: string): Promise<void> {
    const { error } = await this.supabase.client.auth.resetPasswordForEmail(email);

    if (error) {
      // Implement logger
      throw new InternalServerError();
    }
  }
}
