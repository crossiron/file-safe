import {Routes} from '@angular/router';

import {safeResolver} from './safe.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: safeResolver(),
    loadComponent: () => import('./safe.component').then(m => m.SafeComponent)
  },
];

export default routes;
