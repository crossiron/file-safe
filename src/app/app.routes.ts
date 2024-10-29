import {Router, Routes} from '@angular/router';
import {isLoggedInGuard, isNotLoggedInGuard} from './guards/is-logged-in.guard';

export const ROUTE_SEGMENT_LOGIN = ['/login'];
export const ROUTE_SEGMENT_SAFE = ['/safe'];

export const navigateToLogin = (router: Router) => router.navigate(ROUTE_SEGMENT_LOGIN);
export const navigateToHome = (router: Router) => router.navigate(ROUTE_SEGMENT_SAFE);

export const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    canActivate: [isNotLoggedInGuard(navigateToHome)],
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'safe',
    pathMatch: 'full',
    canActivate: [isLoggedInGuard(navigateToLogin)],
    loadChildren: () => import('./pages/safe/safe.routes')
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
