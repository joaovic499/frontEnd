import { TrocarSenhaUsuarioComponent } from './../trocar-senha-usuario/trocar-senha-usuario.component';
import { Component } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent  {


  token: string;
  constructor(private authService: AuthServiceService, private dialog: MatDialog, private cookieService: CookieService ) {
    this.token = this.cookieService.get('token') || '';
   }


   openTrocarSenhaModal():void {
    console.log(this.token)
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
