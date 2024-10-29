import {inject} from '@angular/core';
import {SessionService} from '../services/session.service';
import {Router} from '@angular/router';
import {navigateToHome, navigateToLogin} from "../app.routes";

export const isLoggedInGuard = () => {
    if (inject(SessionService).isLoggedIn()) {
        return true;
    }
    navigateToLogin(inject(Router));
    return false;
};

export const isNotLoggedInGuard = () => {
    if (!inject(SessionService).isLoggedIn()) {
        return true;
    }
    navigateToHome(inject(Router));
    return false;
};
