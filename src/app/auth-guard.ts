import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthServiceService) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redireciona para a página de login se o usuário não estiver autenticado
      return false;
    }
  }

  canActivateAdmin(): boolean {
    if (this.authService.isLoggedIn() && this.authService.isAdmin()){
      return true;

    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

  canActivateFuncionario(): boolean {
    if (this.authService.isLoggedIn() && this.authService.isFuncionario()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redireciona para a página de login de o funcionario não estiver autenticado
      return false;
    }
  }
}
