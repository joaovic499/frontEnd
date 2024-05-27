

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuncionarioService } from '../../../funcionarios/funcionario.service';
import { Funcionario } from '../../../funcionarios/funcionario';

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrl: './modal-form-user.component.scss'
})
export class ModalFormUserComponent {

  formFuncionario: FormGroup;
  editFuncionario: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ModalFormUserComponent>,
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.buildForm();
    if(this.data && this.data.codigo) {
      this.editFuncionario = true;
    }
  }

  saveFuncionario() {
    const objFuncForm: Funcionario = this.formFuncionario.getRawValue();
    console.log('Dados do funcionário:', objFuncForm);

    if (this.data && this.data.codigo) {
      // Se existe um código, significa que está editando um funcionário existente
      this.funcionarioService.editFuncionario(this.data.codigo, objFuncForm ).subscribe(
        (response: any) => {
          alert('Usuário editado com sucesso');
          this.closeModal();
        },
        (error: any) => {
          console.error('Erro ao editar usuário:', error);
        }
      );
    } else {
      // Se não existe um código, está criando um novo funcionário
      this.funcionarioService.create(objFuncForm).subscribe(
        (response: any) => {
          alert('Funcionário cadastrado com sucesso');
          this.closeModal();
        },
        (error: any) => {
          console.error('Erro ao cadastrar funcionário:', error);
        }
      );
    }
  }
  buildForm() {
    this.formFuncionario = this.formBuilder.group({
      nome: [null, [Validators.required]],
      cargo: [null, [Validators.required]],
      senha: [null, [Validators.required]],
      confirmarSenha: [null, [Validators.required]]
    });

    if(this.data && this.data.nome) {
      this.fillForm();
      }
    }

    fillForm() {
      this.formFuncionario.patchValue({
        nome: this.data.nome,
        cargo: this.data.cargo,
      });

    }



  closeModal(){this.dialogRef.close(); }

}
