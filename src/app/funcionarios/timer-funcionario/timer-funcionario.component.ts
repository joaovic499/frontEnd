import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { Tipo } from './tipo.enum';
import { FuncionarioService } from '../funcionario.service';
import { CookieService } from 'ngx-cookie-service';


declare var navigator: any;

@Component({
  selector: 'app-timer-funcionario',
  templateUrl: './timer-funcionario.component.html',
  styleUrl: './timer-funcionario.component.scss'
})
export class TimerFuncionarioComponent implements OnInit {
  private dataAtualEn: string;
  dataAtual: string;
  geoLocation: string;
  ultimoTipoLancado: string;
  trabalhoIniciado: boolean = false;
  almocoIniciado: boolean = false;
  pontos: any[] = [];
  codigo: string;
  mapaRenderizado: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private funcionarioService: FuncionarioService,
    private cookieService: CookieService)  {
      this.codigo = this.cookieService.get('codigoFuncionario');
      console.log('Valor do cookie:', this.codigo)
      if(!this.codigo) {
        console.error('Codigo do funcionario nao encontrado no cookie')
      }
    }

  ngOnInit(): void {
    this.dataAtual = moment().format('DD/MM/YYYY HH:mm:ss');
    this.dataAtualEn = moment().format('YYYY-MM--DD HH:mm:ss');
    this.obterGeoLocation();
    this.ultimoTipoLancado = '';
    this.obterUltimoLancamento();
  }

  obterGeoLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: { coords: { latitude: any; longitude: any; }; }) => {
        this.geoLocation = `${position.coords.latitude},${position.coords.longitude}`;

        this.mapaOn();
      });
    }
}
  iniciarTrabalho(){
    this.funcionarioService.iniciarTrabalho(this.codigo, this.geoLocation).subscribe(() => {
      this.ultimoTipoLancado = Tipo.INICIO_TRABALHO;
      this.trabalhoIniciado = true;
        this.exibirAlertaHorario();
        this.getPontos();
    });
  }

  iniciarAlmoco() {
    this.funcionarioService.iniciarAlmoco(this.codigo, this.geoLocation).subscribe(() => {
      this.ultimoTipoLancado = Tipo.INICIO_ALMOCO
      this.trabalhoIniciado = true;
      this.exibirAlertaHorario();
      this.getPontos();
    });
  }

  terminarAlmoco() {
    this.funcionarioService.terminarAlmoco(this.codigo, this.geoLocation).subscribe(() =>{
      this.ultimoTipoLancado = Tipo.TERMINO_ALMOCO
      this.almocoIniciado = true;
      this.exibirAlertaHorario();
      this.getPontos();
    });
  }

  terminarTrabalho() {
    this.funcionarioService.terminarTrabalho(this.codigo, this.geoLocation).subscribe(() => {
      this.ultimoTipoLancado = Tipo.TERMINO_TRABALHO;
        this.exibirAlertaHorario();
        this.getPontos();
    });
  }

  getPontos() {
    this.funcionarioService.getPontos(this.codigo).subscribe(
      (response) => {
        this.pontos = response;
      },

      (error) => {
        console.error('Erro ao carregar pontos:', error)
      }
    )
  }


  exibirAlertaHorario(): void{
    const horarioAtual = moment().format('DD/MM/YYYY HH:mm:ss');
    alert(`Ação realizada com sucesso ás ${horarioAtual}`);
  }

  obterUltimoLancamento() {
    this.ultimoTipoLancado = '';
  }

  cadastrar(tipo: Tipo) {
    alert(`Tipo: ${tipo}, dataAtualEn: ${this.dataAtualEn},
      geolocation: ${this.geoLocation}`);
  }

  obterUrlMapa(): string {
    return "https://www.google.com/maps/search/?api=1&query=" +
      this.geoLocation;
  }

  mapaOn() {
    this.mapaRenderizado = true;
  }

  exibirInicioTrabalho(): boolean {
    return this.ultimoTipoLancado == '' ||
      this.ultimoTipoLancado == Tipo.TERMINO_TRABALHO;
  }
  exibirInicioAlmoco(): boolean {
    return this.ultimoTipoLancado == Tipo.INICIO_TRABALHO
  }

  exibirTerminoAlmoco(): boolean {
    return this.ultimoTipoLancado == Tipo.INICIO_ALMOCO && this.trabalhoIniciado;
  }

  exibirTerminoTrabalho(): boolean {
    return this.trabalhoIniciado && this.almocoIniciado;
  }
}
