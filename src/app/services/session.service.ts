import {computed, inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {SessionStorageService} from './session-storage.service';
import {commands} from '../app.routes';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  #storage = inject(SessionStorageService);
  #router = inject(Router);
  #selfLogoutTimerID?: number;

  isLoggedIn = computed(() => {
    const lastActivity = this.#storage.lastActivity();
    return lastActivity !== SessionStorageService.LAST_ACTIVITY_INITIAL && (Date.now() - lastActivity) < environment.sessionTimeout
  });

  login(): void {
    this.#registerLastActivity(Date.now());
    void this.#router.navigate(commands.home);
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
    void this.#router.navigate(commands.login);
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
