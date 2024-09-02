import { CanActivateFn } from '@angular/router';
import { Location } from '@angular/common';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';
import { NotificationService } from '../services/notification.service';

export const rolAuthGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const notificactionService = inject(NotificationService);
  const location = inject(Location);

  if (!loginService.isAdmin()) {
    notificactionService.showError(
      'Acceso denegado, no tiene permisos de realizar esta operación'
    );
    setTimeout(() => {
      location.back();
    }, 2000);

    return false;
  }
  return true;
};
