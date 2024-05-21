import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private isTokenExpiredFuncionario(tokenFuncionario: string): boolean {
    try{
    const decodedToken: any = jwtDecode(tokenFuncionario);
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

  trocarSenhaUsuario(token: string, senhaAtual: string, novaSenha: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const body = {
      senhaAtual,
      novaSenha
    };

    return this.http.post('http://localhost:3000/auth/autenticate/changePassword', body, { headers });
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
            localStorage.setItem('codigoFuncionario', codigo);
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
    localStorage.removeItem('codigoFuncionario');
    localStorage.removeItem('nome');
    alert("Funcionario deslogado com sucesso");
    this.router.navigate(['/funcionario']);
  }

  logoutUsuario(): void {
    this.isLoggedUsuario = false;
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    alert("Usuário deslogado com sucesso");
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token') || !!localStorage.getItem('tokenFuncionario');
  }

  isTokenFuncionarioValid(): boolean {
    const tokenFuncionario = localStorage.getItem('tokenFuncionario');

    if (!tokenFuncionario) {
      return false;
    }
    if (this.isTokenExpiredFuncionario(tokenFuncionario)) {
      return false;
    }
    return true;
  }

  isTokenUsuarioValid(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    if (this.isTokenExpired(token)){
      return false;
    }

    const storedToken = localStorage.getItem('token');
    if (storedToken !== token){
      return false;
    }

    return true;
  }

  getNomeUsuario(): string {
    const nome = localStorage.getItem('name');
    return nome !== null ? nome : '';
  }

  getNomeFuncionario(): string {
    const nome = localStorage.getItem('nome');
    return nome !== null ? nome: '';
  }

  getCodigoFuncionario(): string {
    const codigo = localStorage.getItem('codigoFuncionario')
    return codigo !== null ? codigo : '';
  }

  isFuncionario(): boolean {
    return !!localStorage.getItem('tokenFuncionario');
  }

  isUsuario(): boolean {
    return !!localStorage.getItem('token')
  }
}
