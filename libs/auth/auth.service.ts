import { Injectable } from '@angular/core';
import { Auth, User as FirebaseUser, sendPasswordResetEmail, signInWithEmailAndPassword } from '@angular/fire/auth';

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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  public async signIn(credentials: { email: string; password: string }): Promise<void> {
    const userCredential = await signInWithEmailAndPassword(this.auth, credentials.email, credentials.password);

    setUserInStorage(firebaseUserToAuthUser(userCredential.user));
  }

  public async signOut(): Promise<void> {
    await this.auth.signOut();

    removeUserFromStorage();
  }

  public isLoggedIn(): boolean {
    return Boolean(getUserFromStorage());
  }

  public resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }
}
