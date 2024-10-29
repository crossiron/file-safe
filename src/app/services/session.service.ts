import {computed, inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {SessionStorageService} from './session-storage.service';
import {navigateToLogin} from '../app.routes';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  #storage = inject(SessionStorageService);
  #router = inject(Router);

  isLoggedIn = computed(() => {
    const lastActivity = this.#storage.lastActivity();
    return lastActivity !== -1 && (Date.now() - lastActivity) < environment.sessionTimeout
  });

  extend(): void {
    if (this.isLoggedIn()) {
      this.#storage.lastActivity.set(Date.now());
    } else {
      this.#storage.lastActivity.set(SessionStorageService.LAST_ACTIVITY_INITIAL);
      navigateToLogin(this.#router).then();
    }
  }
}
