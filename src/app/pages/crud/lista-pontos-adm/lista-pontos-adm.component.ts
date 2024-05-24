import { Tipo } from './../../../funcionarios/timer-funcionario/tipo.enum';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FuncionarioService } from '../../../funcionarios/funcionario.service';
import { CookieService } from 'ngx-cookie-service';
import { ModalViewPontosComponent } from './modal-view-pontos/modal-view-pontos.component';
import { Funcionario } from '../../../funcionarios/funcionario';
import { ModalFormPontosComponent } from './modal-form-pontos/modal-form-pontos.component';

@Component({
  selector: 'app-lista-pontos-adm',
  templateUrl: './lista-pontos-adm.component.html',
  styleUrl: './lista-pontos-adm.component.scss'
})
export class ListaPontosAdmComponent {

  displayedColumns: string[] = ['codigo', 'nome', 'dataHora', 'tipo', 'localizacao', 'action'];

  dataSource: MatTableDataSource<any>;
  codigo: string;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  novoRegistro: any;
  codigoFuncionario: string;
  tipo: string;


  constructor(public dialog: MatDialog, private funcionarioService: FuncionarioService, private cookieService: CookieService) {}

  ngOnInit(){
    this.dataSource = new MatTableDataSource<any>();

    this.mostrarPontos();
  }

  mostrarPontos() {
    this.funcionarioService.mostrarPontos().subscribe(
      (response) => {
        console.log('Dados obtidos:', response);

        // Verifique se funcionarios está definido e é um array
        if (!response || !Array.isArray(response)) {
          console.error('Nenhum funcionário encontrado');
          return;
        }

        // Mapeie os dados dos funcionários e seus pontos de registro
        const data = response.map((funcionario: any) => {
          return funcionario.pontosDeRegistro.map((ponto: any) => ({
            codigo: funcionario.codigo,
            nome: funcionario.nome,
            tipo: ponto.tipo,
            dataHora: ponto.dataHora ? new Date(ponto.dataHora) : null,
            localizacao: ponto.localizacao
          }));
        }).flat(); // flat() é usado para achatar o array de arrays em um único array

        this.dataSource = new MatTableDataSource<any>(data);
        console.log('Fonte de dados:', this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Erro ao carregar pontos:', error)
      }
    )
  }

  adicionarPontoRegistro(novoRegistro: any) {
    const data = this.dataSource.data;
    data.unshift(novoRegistro);
    this.dataSource.data = data;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModalViewPontos(row: Funcionario) {
    this.dialog.open(ModalViewPontosComponent, {
      width: '700px',
      height: '330px',
      data: row
    })
  }

  openModalEditPonto(row: Funcionario) {
    this.dialog.open(ModalFormPontosComponent, {
      width: '700px',
      height: '330px',
      data: row
    }).afterClosed().subscribe(() => this.mostrarPontos());
  }

  deletePonto(codigoFuncionario: string, tipoPonto: string) {
    this.funcionarioService.deletePonto(codigoFuncionario, tipoPonto).subscribe(
      () => {
        // Remova a linha da fonte de dados local
        this.dataSource.data = this.dataSource.data.filter((ponto: any) => ponto.codigo !== codigoFuncionario || ponto.tipo !== tipoPonto);
        alert('Ponto deletado com sucesso')
      },
      (error) => {
        console.error('Erro ao excluir ponto de registro:', error);
      }
    );
  }
}
