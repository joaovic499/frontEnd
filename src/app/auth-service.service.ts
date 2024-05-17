import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, interval, map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isLoggedUsuario: boolean = false;
  private isLoggedFuncionario: boolean = false;


  constructor(private http: HttpClient, private router: Router) {

}
  private isTokenExpired(token: string): boolean {
    try{
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Converte para segundos
      return decodedToken.exp < currentTime;
    } catch (error) {
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
            this.isLoggedUsuario = true;
            localStorage.setItem('token', token);
            localStorage.setItem('name', name);
            return true;
          } else {
            this.isLoggedUsuario = false;
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
            this.isLoggedFuncionario = true;
            localStorage.setItem('tokenFuncionario', tokenFuncionario);
            localStorage.setItem('nome', nome);
            return true;
          } else {
            this.isLoggedFuncionario = false;
            return false;
          }
      })
    );

  }

  logout(): void {
    if(this.isLoggedUsuario) {
      this.logoutUsuario();
    } else if (this.isLoggedFuncionario) {
      this.logoutFuncionario();
    }
}

  logoutFuncionario(): void {
    this.isLoggedFuncionario = false;
    localStorage.removeItem('tokenFuncionario');
    alert("Funcionario deslogado com sucesso")
    this.router.navigate(['funcionario']);
  }


  logoutUsuario(): void {
    this.isLoggedUsuario = false;
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    alert("Usuário deslogado com sucesso")
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token') || !!localStorage.getItem('tokenFuncionario');
  }

  isTokenFuncionarioValid(): boolean {
    const tokenFuncionario = localStorage.getItem('tokenFuncionario');
    return tokenFuncionario ? !this.isTokenExpired(tokenFuncionario) :false;
  }

  isTokenUsuarioValid(): boolean {
    const token = localStorage.getItem('token');
    return token ? !this.isTokenExpired(token) : false;
  }


  getNomeUsuario(): string {
    const nome = localStorage.getItem('name');
    return nome !== null ? nome : ''; // Retorna uma string vazia se o nome for nulo
  }

  getNomeFuncionario(): string {
    const nome = localStorage.getItem('nome');
    return nome !== null ? nome: '';
  }

  isFuncionario(): boolean {
    return !!localStorage.getItem('tokenFuncionario');
  }

  isUsuario(): boolean {
    return !!localStorage.getItem('token')
  }



}
