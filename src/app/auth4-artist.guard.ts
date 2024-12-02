import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { RoleService } from './services/role.service';
import { Router } from '@angular/router';

export const auth4artistGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inject Router
  const roleService = inject(RoleService); // Inject AuthService
  // chua hoàn thành xong guard
  if (roleService.getRole() == "ARTIST")
    return true

  router.navigate(['/not-found']);
  return false
};
