import { TrocarSenhaUsuarioComponent } from './../trocar-senha-usuario/trocar-senha-usuario.component';
import { Component } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent  {


  token: string;
  constructor(private authService: AuthServiceService, private dialog: MatDialog ) {
    this.token = localStorage.getItem('token') || '';
   }


   openTrocarSenhaModal():void {
    const dialogRef = this.dialog.open(TrocarSenhaUsuarioComponent, {
      width: '700px',
      height: '330px',
      data: {token: this.token}

  });

}

  logout(): void{
    this.authService.logoutUsuario();
 }



}
