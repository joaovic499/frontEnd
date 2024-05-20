import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Funcionario } from './funcionario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Funcionario[]>('http://localhost:3001/funcionarios');
  }

  trocarSenha(codigo: string, senhaAtual: string, novaSenha: string): Observable<any> {
    const url = `http://localhost:3001/trocar-senha/${codigo}`;
    const body = { senhaAtual, novaSenha }; // Agrupando as senhas em um objeto
    return this.http.put<any>(url, body);
  }

  create(data: Funcionario) {
    return this.http.post('http://localhost:3001/register', data);
  }

  edit(codigo: String){
    return this.http.get<Funcionario>(`http://localhost:3001/edit/${codigo}`);
  }

  update( codigo: string, data: Funcionario) {
    return this.http.put<Funcionario>(`http://localhost:3001/edit/${codigo}`, data)
}

  delete(codigo: String){
    return this.http.delete<Funcionario>(`http://localhost:3001/delete/${codigo}`)
  }


}
