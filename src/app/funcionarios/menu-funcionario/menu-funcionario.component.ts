import { Component } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-menu-funcionario',
  templateUrl: './menu-funcionario.component.html',
  styleUrl: './menu-funcionario.component.scss'
})
export class MenuFuncionarioComponent {
  constructor(private authService: AuthServiceService ) { }


  logout(): void{
    this.authService.logout();
 }



}
