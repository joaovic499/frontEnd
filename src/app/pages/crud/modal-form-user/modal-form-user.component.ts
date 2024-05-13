import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrl: './modal-form-user.component.scss'
})
export class ModalFormUserComponent {

  formFuncionario: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalFormUserComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formFuncionario = this.formBuilder.group({
      nome: [null, [Validators.required]],
      cargo: [null, [Validators.required]]
    })
  }

  closeModal(){this.dialogRef.close(); }

}
