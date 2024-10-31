import {Routes} from '@angular/router';

import {safeResolver} from './safe.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: safeResolver(),
    runGuardsAndResolvers: 'always',
    loadComponent: () => import('./safe.component').then(m => m.SafeComponent)
  },
];

export default routes;
