import { Injectable } from '@angular/core';
import { Auth, User, signInWithEmailAndPassword } from '@angular/fire/auth';

import { AuthUser } from './auth-user';

function firebaseUserToAuthUser(user: User): AuthUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
  };
}

function setUserInStorage(user: AuthUser): void {
  localStorage.setItem('user', JSON.stringify(user));
}

function getUserFromStorage(): AuthUser | null {
  const user = localStorage.getItem('user');

  return user ? JSON.parse(user) : null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  public async signIn(credentials: { email: string; password: string }): Promise<void> {
    const userCredential = await signInWithEmailAndPassword(this.auth, credentials.email, credentials.password);

    setUserInStorage(firebaseUserToAuthUser(userCredential.user));
  }

  public isLoggedIn(): boolean {
    return Boolean(getUserFromStorage());
  }
}
