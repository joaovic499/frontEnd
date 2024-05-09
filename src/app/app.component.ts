import { AuthServiceService } from './auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'api-jsonMongooDb';
  constructor(private authService: AuthServiceService) {}

 logout(): void{
    this.authService.logout();
 }
}
