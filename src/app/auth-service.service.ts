
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

  constructor(private http: HttpClient, private router: Router) { }

  checkAuthentication(): boolean {
    const token = localStorage.getItem('token');
    const tokenFuncionario = localStorage.getItem('tokenFuncionario');

    if (token) {
      if (this.isTokenExpired(token)) {
        // Token expirado, desautentica
        this.isLoggedInStatus = false;
        localStorage.removeItem('token');
        localStorage.removeItem('name');
      } else {
        // Token válido, autentica
        this.isLoggedInStatus = true;
      }
    } else if (tokenFuncionario) {
        if (this.isTokenExpired(tokenFuncionario)) {
          this.isLoggedInStatus = false;
          localStorage.removeItem('tokenFuncionario');
          localStorage.removeItem('name');
          alert("Sessão Expirada")
        } else {
          this.isLoggedInStatus = true;
        }
    } else {
      this.isLoggedInStatus = false;
      alert("Você precisa fazer o login")
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
            localStorage.setItem('userType', 'usuario');
            return true;
          } else {
            this.isLoggedInStatus = false;
            return false;
          }

      })
    );

  }

  loginFunc(codigo: string, senha: string): Observable<boolean>{
    return this.http.post<any>('http://localhost:3001/autenticate', {codigo, senha})
    .pipe (
      map(response => {
        const tokenFuncionario = response.tokenFuncionario
        const nome = response.nome;
          if (tokenFuncionario) {
            this.isLoggedInStatus = true;
            localStorage.setItem('tokenFuncionario', tokenFuncionario);
            localStorage.setItem('userType', 'funcionario');
            return true;
          } else {
            this,this.isLoggedInStatus = false;
            return false;
          }
      })
    );

  }

  logout(): void {
    const userType = localStorage.getItem('userType');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenFuncionario')
    localStorage.removeItem('name');
    localStorage.removeItem('userType');
    this.isLoggedInStatus = false;

      if (!localStorage.getItem('token') && userType === 'usuario'){
          alert("Usuario Deslogado com sucesso !")
          this.router.navigate(['/login']);
        } else if (!localStorage.getItem('tokenFuncionario') && userType === 'funcionario'){
          alert("Funcionario Deslogado com sucesso !")
          this.router.navigate(['/funcionario']);
        } else  {
          this.router.navigate(['/funcionario']);
    }
  }




  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }

  getNomeUsuario(): string {
    const nome = localStorage.getItem('name');
    return nome !== null ? nome : ''; // Retorna uma string vazia se o nome for nulo
  }

  isAdmin(): boolean {
    return this.isLoggedInStatus;

  }

  isFuncionario(): boolean {
    return this.isLoggedInStatus;
  }

}
