import { User } from '@libs/user';

export function setUserInStorage(user: User): void {
  localStorage.setItem('user', JSON.stringify(user));
}
