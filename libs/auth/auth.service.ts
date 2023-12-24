import { Injectable } from '@angular/core';
import {
  Auth,
  User as FirebaseUser,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { BehaviorSubject, map } from 'rxjs';

import { User } from './user';

function firebaseUserToAuthUser(user: FirebaseUser): User {
  return {
    uid: user.uid,
    email: user.email!,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
  };
}

function setUserInStorage(user: User): void {
  localStorage.setItem('user', JSON.stringify(user));
}

function removeUserFromStorage(): void {
  localStorage.removeItem('user');
}

function getUserFromStorage(): User | null {
  const user = localStorage.getItem('user');

  return user ? JSON.parse(user) : null;
}

function handleUserStorage(user: User | null): void {
  if (user) {
    return setUserInStorage(user);
  }

  if (getUserFromStorage()) {
    return removeUserFromStorage();
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = new BehaviorSubject<User | null>(getUserFromStorage());

  readonly currentUser$ = this._user.asObservable();
  readonly isLoggedIn$ = this.currentUser$.pipe(map((user) => Boolean(user)));

  constructor(private _auth: Auth) {
    this._user.subscribe((user) => handleUserStorage(user));
  }

  public async signIn(credentials: { email: string; password: string }): Promise<void> {
    const { email, password } = credentials;
    const { user } = await signInWithEmailAndPassword(this._auth, email, password);

    this._user.next(firebaseUserToAuthUser(user));
  }

  public async signOut(): Promise<void> {
    await signOut(this._auth);

    this._user.next(null);
  }

  public async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this._auth, email);
  }
}
