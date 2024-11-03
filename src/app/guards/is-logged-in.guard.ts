import {inject} from '@angular/core';
import {SessionService} from '../services/session.service';
import {Router} from '@angular/router';
import {commands} from "../app.routes";

export const isLoggedInGuard = () => {
  if (inject(SessionService).isLoggedIn()) {
    return true;
  }
  void inject(Router).navigate(commands.login);
  return false;
};

export const isNotLoggedInGuard = () => {
  if (!inject(SessionService).isLoggedIn()) {
    return true;
  }
  void inject(Router).navigate(commands.home);
  return false;
};
