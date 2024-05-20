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
  senhaCorreta: string;

  constructor(private formBuilder: FormBuilder,
    private funcinarioService: FuncionarioService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ModalSenhaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {codigo: string}) {

      this.codigoFuncionario = data.codigo;

      this.formTrocarSenha = this.formBuilder.group({
        senhaAtual: ['', Validators.required],
        novaSenha: ['',  Validators.required],
        confirmarNovaSenha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.formTrocarSenha.valid) {
      const { senhaAtual, novaSenha, confirmarNovaSenha } = this.formTrocarSenha.value;

      if (novaSenha !== confirmarNovaSenha) {
       alert('Senha Nova e Confirmar Senha não coincidem ')
      } else {

      this.funcinarioService.trocarSenha(this.codigoFuncionario, senhaAtual, novaSenha).subscribe (
        () => {
          alert('Senha alterada com sucesso!')
          this.closeModal();
        },
        (error) => {
          console.error('Ocorreu um erro ao alterar a Senha!.', error);
        }
       )
      }
    }

    }

  closeModal(){this.dialogRef.close(); }

}

