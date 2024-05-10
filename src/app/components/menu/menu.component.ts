import { Component } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent  {

  constructor(private authService: AuthServiceService ) { }


  logout(): void{
    this.authService.logout();
 }

}
