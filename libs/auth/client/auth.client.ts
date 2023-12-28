import { SupabaseService, User } from '@libs/supabase';

export class AuthClient {
  constructor(private supabase: SupabaseService) {}

  async signIn(credentials: { email: string; password: string }): Promise<User> {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

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
