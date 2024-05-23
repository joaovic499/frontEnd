export class Lancamento {

  constructor(public data: string,
              public tipo: string,
              public localizacao: string,
              public funcionarioCodigo: string,
              public codigo?: string ) {}
}
