import { Component, Inject } from '@angular/core';
import { Funcionario } from '../../../../funcionarios/funcionario';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-view-pontos',
  templateUrl: './modal-view-pontos.component.html',
  styleUrl: './modal-view-pontos.component.scss'
})
export class ModalViewPontosComponent {

  pontoData: Funcionario;

  constructor(
    public dialogRef: MatDialogRef<ModalViewPontosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.pontoData = data;
    console.log('Dados do funcionario: ', this.pontoData);
  }

  closeModal() { this.dialogRef.close();}

}
