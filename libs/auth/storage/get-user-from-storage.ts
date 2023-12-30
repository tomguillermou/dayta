import { User } from '@libs/supabase';

export function getUserFromStorage(): User | null {
  const user = localStorage.getItem('user');

  return user ? JSON.parse(user) : null;
}
