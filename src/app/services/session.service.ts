import {computed, inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {SessionStorageService} from './session-storage.service';
import {navigateToHome, navigateToLogin} from '../app.routes';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  #storage = inject(SessionStorageService);
  isLoggedIn = computed(() => {
    const lastActivity = this.#storage.lastActivity();
    return lastActivity !== SessionStorageService.LAST_ACTIVITY_INITIAL && (Date.now() - lastActivity) < environment.sessionTimeout
  });
  #router = inject(Router);
  #selfLogoutTimerID?: number;

  login(): void {
    this.#registerLastActivity(Date.now());
    void navigateToHome(this.#router);
  }

  extend(): void {
    if (this.isLoggedIn()) {
      this.#registerLastActivity(Date.now());
    } else {
      this.logout();
    }
  }

  logout(): void {
    this.#registerLastActivity(SessionStorageService.LAST_ACTIVITY_INITIAL);
    void navigateToLogin(this.#router);
  }

  #registerLastActivity(time: number) {
    clearTimeout(this.#selfLogoutTimerID);
    if (time === SessionStorageService.LAST_ACTIVITY_INITIAL) {
      this.#selfLogoutTimerID = undefined;
    } else {
      this.#selfLogoutTimerID = window.setTimeout(() => this.logout(), environment.sessionTimeout);
    }
    this.#storage.lastActivity.set(time);
  }
}
