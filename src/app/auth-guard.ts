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
      if (this.authService.isFuncionario()) { // Verifica se é funcionário primeiro
        if (!this.authService.isTokenFuncionarioValid()) { // Verifica se o token de funcionário é inválido
          alert('Sessão do funcionário expirado. Tente Novamente!')
          this.authService.logoutFuncionario();
          this.router.navigate(['funcionario']);
          return false;
        }
      } else if (!this.authService.isTokenValid()) { // Verifica se o token do usuário é inválido
        alert('Sessão expirada. Por favor, faça o login novamente.');
        this.authService.logoutUsuario();
        this.router.navigate(['login'])
        return false;
      }

      return true;
    } else {
      alert('Você precisa fazer o login!');
      this.router.navigate(['/login'])
      return false;
    }
  }
}
