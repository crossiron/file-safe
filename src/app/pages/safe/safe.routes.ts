import {Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./safe.component').then(m => m.SafeComponent)
  },
];

export default routes;
