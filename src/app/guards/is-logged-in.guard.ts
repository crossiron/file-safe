import {inject} from '@angular/core';
import {SessionService} from '../services/session.service';
import {Router} from '@angular/router';

const isLoggedIn = () => inject(SessionService).isLoggedIn();

const doRedirect = (redirect: (router: Router) => void) => {
    const router = inject(Router);
    redirect(router);
    return false;
}

export const isLoggedInGuard = (redirect: (router: Router) => void) => () => {
    if (isLoggedIn()) {
        return true;
    }
    return doRedirect(redirect);
};

export const isNotLoggedInGuard = (redirect: (router: Router) => void) => () => {
    if (!isLoggedIn()) {
        return true;
    }
    return doRedirect(redirect);
};
