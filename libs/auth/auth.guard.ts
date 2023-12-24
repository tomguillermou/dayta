import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (): Observable<UrlTree | boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn$.pipe(map((isLoggedIn) => (isLoggedIn ? true : router.createUrlTree(['login']))));
};
