import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService); // Inject AuthService
  const router = inject(Router); // Inject Router

  if (tokenService.isLoggedIn()) 
    return true;
  
  router.navigate(['/login']);
  return false;
};
