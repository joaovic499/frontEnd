import { CookieService } from 'ngx-cookie-service';
import { FuncionarioService } from './../../funcionario.service';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-lancamento-ponto',
  templateUrl: './lancamento-ponto.component.html',
  styleUrl: './lancamento-ponto.component.scss'
})
export class LancamentoPontoComponent {

  displayedColumns: string[] = ['nome', 'cargo', 'tipo', 'dataHora', 'localizacao'];

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

        // Verifique se pontosDeRegistro está definido
        if (!response.pontosDeRegistro || !Array.isArray(response.pontosDeRegistro)) {
          console.error('Nenhum ponto de registro encontrado');
          return;
        }

        // Mapeie os dados para extrair os campos necessários e formatar a data se estiver definida
        const data = response.pontosDeRegistro.map((item: any) => ({
          nome: response.nome,
          cargo: response.cargo,
          tipo: item.tipo,
          // Verifique se dataHora está definida antes de criar um novo objeto Date
          dataHora: item.dataHora ? new Date(item.dataHora) : null,
          localizacao: item.geoLocation
        }));

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

}
