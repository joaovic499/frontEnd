import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { Tipo } from './tipo.enum';


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

  constructor(
    private snackBar: MatSnackBar,
    private router: Router)  {}

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
      });
    }
}
  iniciarTrabalho(){
    this.cadastrar(Tipo.INICIO_TRABALHO);
  }

  terminarTrabalho() {
    this.cadastrar(Tipo.TERMINO_TRABALHO);
  }

  iniciarAlmoco() {
    this.cadastrar(Tipo.INICIO_ALMOCO);
  }

  terminarAlmoco() {
    this.cadastrar(Tipo.TERMINO_ALMOCO)
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

  exibirInicioTrabalho(): boolean {
    return this.ultimoTipoLancado == '' ||
      this.ultimoTipoLancado == Tipo.TERMINO_TRABALHO;
  }

  exibirTerminoTrabalho(): boolean {
    return this.ultimoTipoLancado == Tipo.INICIO_TRABALHO ||
      this.ultimoTipoLancado == Tipo.TERMINO_ALMOCO;
  }

  exibirInicioAlmoco(): boolean {
    return this.ultimoTipoLancado == Tipo.INICIO_TRABALHO
  }

  exibirTerminoAlmoco(): boolean {
    return this.ultimoTipoLancado == Tipo.TERMINO_ALMOCO;
  }

}
