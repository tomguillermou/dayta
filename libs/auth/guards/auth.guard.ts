import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { selectUser } from '@libs/store';

export const authGuard: CanActivateFn = (): Observable<UrlTree | boolean> => {
  const store = inject(Store);
  const router = inject(Router);

  return store
    .select(selectUser)
    .pipe(map((user) => (user !== null ? true : router.createUrlTree(['auth', 'sign-in']))));
};
