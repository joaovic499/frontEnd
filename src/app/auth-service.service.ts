import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isLoggedInStatus: boolean = false;
  private token: string = '';


  constructor(private http: HttpClient) { }

  checkAuthentication(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedInStatus = true;
    } else {
      this.isLoggedInStatus = false;
    }
    return this.isLoggedInStatus;
  }


  login(email: string, password: string): Observable<boolean>{
    return this.http.post<any>('http://localhost:3000/auth/autenticate', {email, password})
    .pipe(
      map(response => {
        const token = response.token;
          if (token){
            this.isLoggedInStatus = true;
            localStorage.setItem('token', token);
            return true;
          } else {
            this.isLoggedInStatus = false;
            return false;
          }

      })
    );

  }

  logout(): void {
    this.isLoggedInStatus = false;
    this.token = '';
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }

}
