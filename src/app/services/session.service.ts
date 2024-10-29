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
    #router = inject(Router);
    #timeoutID?: number;

    isLoggedIn = computed(() => {
        const lastActivity = this.#storage.lastActivity();
        return lastActivity !== SessionStorageService.LAST_ACTIVITY_INITIAL && (Date.now() - lastActivity) < environment.sessionTimeout
    });

    extend(): void {
        if (this.isLoggedIn()) {
            this.#schedule(Date.now());
        } else {
            this.logout();
        }
    }

    #schedule(time: number) {
        clearTimeout(this.#timeoutID);
        this.#timeoutID = window.setTimeout(() => {
            this.logout();
        }, environment.sessionTimeout);
        this.#storage.lastActivity.set(time);
    }

    login(): void {
        this.#schedule(Date.now());
        navigateToHome(this.#router);
    }

    logout(): void {
        clearTimeout(this.#timeoutID);
        this.#timeoutID = undefined;

        this.#storage.lastActivity.set(SessionStorageService.LAST_ACTIVITY_INITIAL);
        navigateToLogin(this.#router);
    }
}
