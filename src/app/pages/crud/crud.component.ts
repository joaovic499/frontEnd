import { MatPaginator } from '@angular/material/paginator';
import { FuncionarioService } from './../../funcionarios/funcionario.service';
import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Funcionario } from '../../funcionarios/funcionario';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent {

  displayedColumns: string[] = ['codigo', 'nome', 'cargo', 'action'];
  dataSource: MatTableDataSource<Funcionario>;
  listfuncionarios: Funcionario[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private funcionarioService: FuncionarioService) {
   this.dataSource = new MatTableDataSource<Funcionario>([]);
  }
  ngOnInit(){
    this.getListUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getListUsers(){
    this.funcionarioService.getAll().subscribe({
      next: (response: Funcionario[]) => {
        this.listfuncionarios = response;

        this.dataSource.data = this.listfuncionarios;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    },
    error: (err) => {
      console.error(err);
    }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

