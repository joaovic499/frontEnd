import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-funcionarios-registro',
  templateUrl: './funcionarios-registro.component.html',
  styleUrl: './funcionarios-registro.component.scss'
})
export class FuncionariosRegistroComponent implements OnInit {
  public registerFuncForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }


  ngOnInit(): void {
    this.registerFuncForm = this.formBuilder.group({
      nome:[''],
      cargo:[''],
      senha:[''],
      confirmarSenha:['']
    })
  }
    registerFuncionario(): void{
      const senha = this.registerFuncForm.value.senha;
      const confirmarSenha = this.registerFuncForm.value.confirmarSenha;

      if(senha !== confirmarSenha) {
        alert("Senha não correspondentes");
        return
      }

      this.http.post<any>("http://localhost:3001/register", this.registerFuncForm.value).pipe(
        tap(() => {
          alert("Funcionário registrado com Sucesso");
          this.registerFuncForm.reset();
          this.router.navigate(['login']);
        }),

        catchError((error) => {
          if(error. error.message == "Cargo ja cadastrado, cadatre com outro cargo"){
            alert('Email de usuario ja cadastrado.')

          } else {
            alert("Erro ao registrar um usuário");
            console.log(error)
          }
          return of(null);
        })
      ).subscribe()

      }

  }

