import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioAuthservicesService implements CanActivate {

  constructor(private router: Router, private authService: AuthServiceService) { }

  canActivate(): boolean {
    if (this.authService.isFuncionario() && this.authService.isTokenFuncionarioValid()) {
      return true;
    } else {
      this.router.navigate(['/funcionario']);
      return false;
    }
  }
}
