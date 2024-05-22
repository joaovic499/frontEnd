import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsuarioAuthservicesService } from '../../usuario-authservices.service';
import { AuthServiceService } from '../../auth-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-trocar-senha-usuario',
  templateUrl: './trocar-senha-usuario.component.html',
  styleUrl: './trocar-senha-usuario.component.scss'
})
export class TrocarSenhaUsuarioComponent {
  formTrocarSenhaUsuario: FormGroup;
  passwordCorreto: string;
  tokenUsuario: string;

  constructor(private formBuilder: FormBuilder,
    private usuarioService: AuthServiceService,
    private dialog: MatDialog,
    private cookieService: CookieService,
    private dialogRef: MatDialogRef<TrocarSenhaUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {token: string}) {

      this.tokenUsuario = cookieService.get('token') || '';

      this.formTrocarSenhaUsuario = this.formBuilder.group({
        senhaAtual: ['', Validators.required],
        novaSenha: ['', Validators.required],
        confirmarNovaSenha: ['', Validators.required]
      });

    }

    onSubmit(): void {
      if (this.formTrocarSenhaUsuario.valid) {
        const { senhaAtual, novaSenha, confirmarNovaSenha } = this.formTrocarSenhaUsuario.value;

        if (novaSenha !== confirmarNovaSenha) {
          alert('Senha nova e Confirmar Senha não coincidem')
        } else {
          this.usuarioService.trocarSenhaUsuario(this.tokenUsuario, senhaAtual, novaSenha).subscribe(
          () => {
            alert('Senha alterada com sucesso!')
            this.closeModal();
          },
          (error) => {
            console.error('Ocooreu um erro ao alterar a senha!', error);
          }
          )
        }
      }
    }

    closeModal(){this.dialogRef.close(); }


}
