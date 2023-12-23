import { Injectable } from '@angular/core';
import { Auth, UserCredential, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private auth: Auth) {}

  public async signIn(credentials: { email: string; password: string }): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, credentials.email, credentials.password);
  }
}
