import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FuncionarioService } from '../../../funcionarios/funcionario.service';
import { Funcionario } from '../../../funcionarios/funcionario';

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrl: './modal-form-user.component.scss'
})
export class ModalFormUserComponent {

  formFuncionario: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalFormUserComponent>,
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  saveFuncionario() {
    if (this.formFuncionario.valid) {
      const dadosFuncionario = this.formFuncionario.value;
      this.funcionarioService.create(dadosFuncionario).subscribe(() => {
        alert('Funcionario Cadastrado com sucesso');
        this.closeModal();

      },
      error => {
        alert('Houve um erro ao salvar o funcionário');
        console.error(error);
      });
  } else {
    window.alert('Por favor, preencha todos os campos corretamente.');
  }
}



  buildForm() {
    this.formFuncionario = this.formBuilder.group({
      nome: [null, [Validators.required]],
      cargo: [null, [Validators.required]]
    })
  }


  closeModal(){this.dialogRef.close(); }

}
