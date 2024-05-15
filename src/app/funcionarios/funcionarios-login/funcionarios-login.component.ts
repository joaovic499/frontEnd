import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthServiceService } from '../../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionarios-login',
  templateUrl: './funcionarios-login.component.html',
  styleUrl: './funcionarios-login.component.scss'
})
export class FuncionariosLoginComponent implements OnInit {
  public loginForm!: FormGroup

  constructor (private formBuilder : FormBuilder, private htttp: HttpClient, private router: Router, private authService: AuthServiceService ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      codigo: [''],
      senha: ['']
    })
  }

  loginFuncionario(): void{
    const codigo = this.loginForm.value.codigo;
    const senha = this.loginForm.value.senha;


    this.authService.loginFunc(codigo, senha).subscribe(
      loginOk => {
        if (loginOk) {
          alert("Funcionario Logado com sucesso")
          this.loginForm.reset();
          this.router.navigate(['funcionario/home']);
        }

      }, error => {
        if (error.status === 400 && error.error.message) {
          alert(error.error.message);
        } else {
          alert('Ocorreu um erro, tente novamente mais tarde');
        }
      }
    )
  }

}
