import { Routes } from '@angular/router';

export const authPageRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sign-in',
        loadComponent: () => import('../sign-in/sign-in.component').then((m) => m.SignInComponent),
      },
      {
        path: 'sign-up',
        loadComponent: () => import('../sign-up/sign-up.component').then((m) => m.SignUpComponent),
      },
      // {
      //   path: 'reset-password',
      //   loadComponent: () => import('../reset-password/reset-password.component').then((m) => m.ResetPasswordComponent),
      // },
    ],
  },
];
