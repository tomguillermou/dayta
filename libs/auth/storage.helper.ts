import { User } from '@libs/supabase';

export function setUserInStorage(user: User): void {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUserFromStorage(): User | null {
  const user = localStorage.getItem('user');

  return user ? JSON.parse(user) : null;
}

export function deleteUserFromStorage(): void {
  localStorage.removeItem('user');
}
