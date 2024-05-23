import { CookieService } from 'ngx-cookie-service';
import { FuncionarioService } from './../../funcionario.service';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-lancamento-ponto',
  templateUrl: './lancamento-ponto.component.html',
  styleUrl: './lancamento-ponto.component.scss'
})
export class LancamentoPontoComponent {

  displayedColumns: string[] = ['codigo', 'data', 'tipo', 'cargo'];

  dataSource: MatTableDataSource<any>;
  codigo: string;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public dialog: MatDialog, private funcionarioService: FuncionarioService, private cookieService: CookieService) {
    this.codigo = this.cookieService.get('codigoFuncionario');
    console.log('Valor do cookie:', this.codigo)
    if(!this.codigo) {
      console.error('Codigo do funcionario nao encontrado no cookie')
    }

  }
  ngOnInit(){
    this.dataSource = new MatTableDataSource<any>();

    this.carregarPontos();
  }

  carregarPontos() {
    this.funcionarioService.getPontos(this.codigo).subscribe(
      (response) => {
        console.log('Dados obtidos:', response);
        this.dataSource = new MatTableDataSource<any>(response);
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

}
