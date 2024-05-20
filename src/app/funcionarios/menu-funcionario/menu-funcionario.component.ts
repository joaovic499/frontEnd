import { Funcionario } from './../funcionario';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';
import { ModalFormUserComponent } from '../../pages/crud/modal-form-user/modal-form-user.component';
import { CrudComponent } from '../../pages/crud/crud.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalSenhaComponent } from '../modal-senha/modal-senha.component';


@Component({
  selector: 'app-menu-funcionario',
  templateUrl: './menu-funcionario.component.html',
  styleUrl: './menu-funcionario.component.scss'
})
export class MenuFuncionarioComponent implements OnInit{
  codigoFuncionario: string
  constructor(private authService: AuthServiceService, private dialog: MatDialog ) {
    this.codigoFuncionario = this.authService.getCodigoFuncionario();
   }


  ngOnInit(): void {

  }



  openTrocarSenhaModal(codigoFuncionario: string):void {
    console.log(codigoFuncionario)
    const dialogRef = this.dialog.open(ModalSenhaComponent, {
      width: '700px',
      height: '330px',
      data: {codigo: this.codigoFuncionario}

  });


}


  logout(): void{
    this.authService.logoutFuncionario();
   }
}

