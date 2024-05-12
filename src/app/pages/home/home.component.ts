import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  countFuncionario: number;
  spinnerValue: number;

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
      )
  }


}
