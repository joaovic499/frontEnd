import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAuthservicesService implements CanActivate {

  constructor(private router: Router, private authService: AuthServiceService) { }

  canActivate(): boolean {
    if (this.authService.isUsuario() && this.authService.isTokenUsuarioValid()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
