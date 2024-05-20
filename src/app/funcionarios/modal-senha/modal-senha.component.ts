import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuncionarioService } from '../funcionario.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-senha',
  templateUrl: './modal-senha.component.html',
  styleUrl: './modal-senha.component.scss'
})
export class ModalSenhaComponent {
  formTrocarSenha: FormGroup;
  codigoFuncionario: string;

  constructor(private formBuilder: FormBuilder, private funcinarioService: FuncionarioService, private dialog: MatDialog, private dialogRef: MatDialogRef<ModalSenhaComponent>, @Inject(MAT_DIALOG_DATA) public data: {codigo: string}) {
    this.codigoFuncionario = data.codigo;

    this.formTrocarSenha = this.formBuilder.group({
        senhaAtual: ['', Validators.required],
        novaSenha: ['',  Validators.required],
        confirmarNovaSenha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.formTrocarSenha.valid) {
      const { senhaAtual, novaSenha } = this.formTrocarSenha.value;

      this.funcinarioService.trocarSenha(this.codigoFuncionario, senhaAtual, novaSenha).subscribe (
        () => {
          console.log('Senha trocada com sucesso');
        },
        (error) => {
          console.error('Erro ao trocar a senha.', error);
        }
      )
    }
  }

  closeModal(){this.dialogRef.close(); }

}


