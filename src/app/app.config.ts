import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {DATE_PIPE_DEFAULT_OPTIONS, DatePipeConfig} from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS, useFactory: (): DatePipeConfig => ({
        dateFormat: 'y MMM dd HH:mm'
      })
    }
  ]
};
