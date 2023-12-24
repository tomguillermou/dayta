import { User } from '@libs/supabase';

export function getUserFromStorage(): User | null {
  const user = localStorage.getItem('user');

  return user ? JSON.parse(user) : null;
}

export function setUserInStorage(user: User | null): void {
  if (user) {
    return storeUser(user);
  }

  if (getUserFromStorage()) {
    return deleteUser();
  }
}

function storeUser(user: User): void {
  localStorage.setItem('user', JSON.stringify(user));
}

function deleteUser(): void {
  localStorage.removeItem('user');
}
