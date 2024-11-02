import {inject} from '@angular/core';
import {SessionService} from '../services/session.service';
import {Router} from '@angular/router';
import {navigateToHome, navigateToLogin} from "../app.routes";

export const isLoggedInGuard = () => {
  if (inject(SessionService).isLoggedIn()) {
    return true;
  }
  void navigateToLogin(inject(Router));
  return false;
};

export const isNotLoggedInGuard = () => {
  if (!inject(SessionService).isLoggedIn()) {
    return true;
  }
  void navigateToHome(inject(Router));
  return false;
};
