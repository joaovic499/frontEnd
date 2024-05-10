import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Funcionario } from './funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<Funcionario[]>('http://localhost:3001/funcionarios');
  }

  create(data: Funcionario) {
    return this.http.post('http://localhost:3001/register', data);
  }

  edit(codigo: String){
    return this.http.get<Funcionario>(`http://localhost:3001/edit/${codigo}`);
  }

  update(data: Funcionario) {
    return this.http.put<Funcionario>(`http://localhost:3001/edit/${data.codigo}`, data)
}

  delete(codigo: String){
    return this.http.delete<Funcionario>(`http://localhost:3001/delete/${codigo}`)
  }


}
