import { User } from '@libs/supabase';

export function setUserInStorage(user: User): void {
  localStorage.setItem('user', JSON.stringify(user));
}
