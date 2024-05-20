import { Funcionario } from './../funcionario';
import { Component } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';
import { ModalFormUserComponent } from '../../pages/crud/modal-form-user/modal-form-user.component';
import { CrudComponent } from '../../pages/crud/crud.component';


@Component({
  selector: 'app-menu-funcionario',
  templateUrl: './menu-funcionario.component.html',
  styleUrl: './menu-funcionario.component.scss'
})
export class MenuFuncionarioComponent {
  constructor(private authService: AuthServiceService ) { }


  logout(): void{
    this.authService.logoutFuncionario();
 }




}
