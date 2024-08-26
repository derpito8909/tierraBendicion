import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);

  if (!loginService.isLoggedIn()) {
    loginService.redirectToLogin();
    return false;
  }

  return true;
};
