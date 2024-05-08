import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isLoggedInStatus: boolean = false;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean>{
    return this.http.post<any>('http://localhost:3000/auth/autenticate', {email, password})
    .pipe(
      map(response => {
        const usuario = response;
          if (usuario){
            this.isLoggedInStatus = true;
            localStorage.setItem('currentUsuario', JSON.stringify(usuario));
            return true;
          }
          return false;
      })
    );

  }

  logout(): void {
    this.isLoggedInStatus = false;
    localStorage.removeItem('currentUsuario');
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }
}
