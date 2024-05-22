import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, interval, map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isLoggedUsuario: boolean = false;
  private isLoggedFuncionario: boolean = false;

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {

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
            this.cookieService.set('token', token);
            this.cookieService.set('name', name);
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

    this.cookieService.get('token')

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
            this.cookieService.set('tokenFuncionario', response.tokenFuncionario)
            this.cookieService.set('nome', nome);
            this.cookieService.set('codigoFuncionario', codigo);
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
    this.cookieService.delete('tokenFuncionario');
    this.cookieService.delete('codigoFuncionario');
    this.cookieService.delete('nome');
    alert("Funcionario deslogado com sucesso");
    this.router.navigate(['/funcionario']);
  }

  logoutUsuario(): void {
    this.isLoggedUsuario = false;
    this.cookieService.delete('token');
    this.cookieService.delete('name');
    alert("Usuário deslogado com sucesso");
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.cookieService.get('token') || !!this.cookieService.get('tokenFuncionario');
  }

  isTokenFuncionarioValid(): boolean {
    const tokenFuncionario = this.cookieService.get('tokenFuncionario');

    if (!tokenFuncionario) {
      return false;
    }
    if (this.isTokenExpiredFuncionario(tokenFuncionario)) {
      return false;
    }
    return true;
  }

  isTokenUsuarioValid(): boolean {
    const token = this.cookieService.get('token');

    // Verifica se o token existe
    if (!token) {
      console.log('Token não encontrado.');
      return false;
    }

    // Verifica se o token está expirado
    if (this.isTokenExpired(token)) {
      console.log('Token está expirado.');
      return false;
    }

    return true;
  }


  getNomeUsuario(): string {
    const nome = this.cookieService.get('name');
    return nome !== null ? nome : '';
  }

  getNomeFuncionario(): string {
    const nome = this.cookieService.get('nome');
    return nome !== null ? nome: '';
  }

  getCodigoFuncionario(): string {
    const codigo = this.cookieService.get('codigoFuncionario')
    return codigo !== null ? codigo : '';
  }

  isFuncionario(): boolean {
    return !!this.cookieService.get('tokenFuncionario');
  }

  isUsuario(): boolean {
    return !!this.cookieService.get('token')
  }
}
