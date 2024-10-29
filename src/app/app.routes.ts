import {Router, Routes} from '@angular/router';
import {isLoggedInGuard, isNotLoggedInGuard} from './guards/is-logged-in.guard';

export const navigateToLogin = (router: Router) => router.navigate(['/login']);
export const navigateToHome = (router: Router) => router.navigate(['/safe']);

export const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    canActivate: [isNotLoggedInGuard],
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'safe',
    pathMatch: 'full',
    canActivate: [isLoggedInGuard],
    loadChildren: () => import('./pages/safe/safe.routes')
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
