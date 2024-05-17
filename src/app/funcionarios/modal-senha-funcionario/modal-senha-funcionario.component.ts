import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Funcionario } from '../funcionario';
import { ModalFormUserComponent } from '../../pages/crud/modal-form-user/modal-form-user.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-senha-funcionario',
  templateUrl: './modal-senha-funcionario.component.html',
  styleUrl: './modal-senha-funcionario.component.scss'
})
export class ModalSenhaFuncionarioComponent implements OnInit{
  formFuncionario: FormGroup;
  senhaAtual: string = '';
  novaSenha: string = '';
  confirmSenha: string = '';
  dialog: any;


  constructor(public dialogRef: MatDialogRef<ModalSenhaFuncionarioComponent>,
    public modalFormFuncionario: ModalFormUserComponent,
    private formBuilder: FormBuilder,
    private modalForm: ModalFormUserComponent,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {}
  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.formFuncionario = this.formBuilder.group({
      senha: [null, [Validators.required]],
      novaSenha: [null, [Validators.required]],
      confirmSenha: [null, [Validators.required]]
    })
  }


  trocarSenhaFuncionario(){
    this.dialog.open(ModalSenhaFuncionarioComponent, {
      width: '700px',
      height: '400px',
    })
  }

  closeModal(){
    this.dialogRef.close();

  }
}
