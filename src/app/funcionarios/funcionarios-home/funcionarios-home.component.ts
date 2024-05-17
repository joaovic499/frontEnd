import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';


@Component({
  selector: 'app-funcionarios-home',
  templateUrl: './funcionarios-home.component.html',
  styleUrl: './funcionarios-home.component.scss'
})
export class FuncionariosHomeComponent implements OnInit {

  countFuncionario: number;
  spinnerValue: number;
  nomeFuncionario: string | null;

  constructor(private http: HttpClient, public authService: AuthServiceService) { }

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

      this.nomeFuncionario = this.authService.getNomeFuncionario();
    }


}
