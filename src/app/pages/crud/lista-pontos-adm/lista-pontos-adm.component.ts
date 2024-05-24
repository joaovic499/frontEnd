import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FuncionarioService } from '../../../funcionarios/funcionario.service';
import { CookieService } from 'ngx-cookie-service';
import { ModalViewPontosComponent } from './modal-view-pontos/modal-view-pontos.component';
import { Funcionario } from '../../../funcionarios/funcionario';

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


}


