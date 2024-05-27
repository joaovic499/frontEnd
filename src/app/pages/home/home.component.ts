import { Funcionario } from './../../funcionarios/funcionario';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  countFuncionario: number;
  spinnerValue: number;
  ultimoFuncionario: Funcionario;
  nomeUsuario: string | null;

  constructor(private http: HttpClient, public authService: AuthServiceService) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3001/totalfuncionarios').subscribe(
        (data) => {
            this.countFuncionario = data.count;
            this.spinnerValue = (this.countFuncionario / 150) * 100;
            this.carregarUltimoFuncionario();
        },
        (error) => {
            console.error("Erro em contar os funcionario", error);
        }
    );

    this.nomeUsuario = this.authService.getNomeUsuario();
}

carregarUltimoFuncionario() {
    this.http.get<any>('http://localhost:3001/funcionario/ultimo').subscribe(
        (data) => {
            this.ultimoFuncionario = data;
        },
        (error) => {
            console.error("Erro em pegar o ultimo funcionario", error);
        }
    );
  }
}
