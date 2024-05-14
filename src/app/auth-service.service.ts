
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isLoggedInStatus: boolean = false;
  private token: string = '';


  constructor(private http: HttpClient, private router: Router) { }

  checkAuthentication(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      if (this.isTokenExpired(token)) {
        // Token expirado, desautentica o usuário
        this.isLoggedInStatus = false;
        localStorage.removeItem('token');
        localStorage.removeItem('name');
      } else {
        // Token válido, autentica o usuário
        this.isLoggedInStatus = true;
      }
    } else {

      this.isLoggedInStatus = false;
      alert("Você precisa fazer o login")
      this.router.navigate(['/login']);
    }
    return this.isLoggedInStatus;
  }

  private isTokenExpired(token: string): boolean {

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Converte para segundos
    if (decodedToken && decodedToken.exp) {
      return decodedToken.exp < currentTime;
    } else {
      return true;
    }
  }



  login(email: string, password: string): Observable<boolean>{
    return this.http.post<any>('http://localhost:3000/auth/autenticate', {email, password})
    .pipe(
      map(response => {
        const token = response.token;
        const name = response.name;
          if (token){
            this.isLoggedInStatus = true;
            localStorage.setItem('token', token);
            localStorage.setItem('name', name);
            return true;
          } else {
            this.isLoggedInStatus = false;
            return false;
          }

      })
    );

  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
      if (!localStorage.getItem('token')){
        alert("Usuário deslogado com sucesso !")
          this.router.navigate(['/login']);
    } else {
      alert("Ocorrou um erro ")
  }
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }

  getNomeUsuario(): string {
    const nome = localStorage.getItem('name');
    return nome !== null ? nome : ''; // Retorna uma string vazia se o nome for nulo
  }

}
