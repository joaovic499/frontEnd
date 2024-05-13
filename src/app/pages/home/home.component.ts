import { Funcionario } from './../../funcionarios/funcionario';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  countFuncionario: number;
  spinnerValue: number;
  ultimoFuncionario: Funcionario;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
      this.http.get<any>('http://localhost:3001/totalfuncionarios').subscribe(
        (data) => {
          this.countFuncionario = data.count;
          this.spinnerValue = (this.countFuncionario / 150) * 100;
        },
        (error) => {
          console.error("Erro em contar os funcionario", error);
        }
      );

      this.carregarUltimoFuncionario();
    }

    carregarUltimoFuncionario(){

      this.http.get<any>('http://localhost:3001/funcionario/ultimo').subscribe(
        (data) => {
          this.ultimoFuncionario = data;
        },
        (error) => {
          console.error("Erro em pegar o ultimo funcionario", error);
        }
      )
    }


}
