import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const rolAuthGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);

  if (!loginService.isAdmin()) {
    loginService.redirectToLogin();
    return false;
  } else if (!loginService.isLeader()) {
    loginService.redirectToLogin();
    return false;
  }
  return true;
};
