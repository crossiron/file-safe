import {computed, inject, Injectable, Renderer2} from '@angular/core';
import {environment} from '../../environments/environment';
import {SessionStorageService} from './session-storage.service';
import {navigateToHome, navigateToLogin} from '../app.routes';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  #storage = inject(SessionStorageService);
  #router = inject(Router);
  #renderer = inject(Renderer2);

  #selfLogoutTimerID?: number;
  #disposeClickHandler?: () => void;

  #registerLastActivity(time: number) {
    clearTimeout(this.#selfLogoutTimerID);
    if(time === SessionStorageService.LAST_ACTIVITY_INITIAL) {
      this.#selfLogoutTimerID = undefined;
    } else {
      this.#selfLogoutTimerID = window.setTimeout(() => this.logout(), environment.sessionTimeout);
    }
    this.#storage.lastActivity.set(time);
  }

  isLoggedIn = computed(() => {
    const lastActivity = this.#storage.lastActivity();
    return lastActivity !== SessionStorageService.LAST_ACTIVITY_INITIAL && (Date.now() - lastActivity) < environment.sessionTimeout
  });

  extend(): void {
    if (this.isLoggedIn()) {
      this.#registerLastActivity(Date.now());
    } else {
      this.logout();
    }
  }

  login(): void {
    this.#registerLastActivity(Date.now());
    this.#disposeClickHandler = this.#renderer.listen('window', 'click', _ => this.extend());
    navigateToHome(this.#router);
  }

  logout(): void {
    this.#registerLastActivity(SessionStorageService.LAST_ACTIVITY_INITIAL);
    this.#disposeClickHandler?.();
    navigateToLogin(this.#router);
  }
}
