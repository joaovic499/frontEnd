import { Component, Inject } from '@angular/core';
import { Funcionario } from '../../../funcionarios/funcionario';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-view-user',
  templateUrl: './modal-view-user.component.html',
  styleUrl: './modal-view-user.component.scss'
})
export class ModalViewUserComponent {

  funcionarioData: Funcionario;

  constructor(public dialogRef: MatDialogRef<ModalViewUserComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.funcionarioData = data
    console.log('Dados do usuario', this.funcionarioData);
  }



closeModal(){this.dialogRef.close(); }

}




