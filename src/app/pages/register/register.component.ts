import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  public registerForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router){ }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name:[''],
      email:[''],
      password:[''],
      confirmpassword:['']

    })
  }

  register(): void {
    const password = this.registerForm.value.password;
    const confirmpassword = this.registerForm.value.confirmpassword;


    if(password !== confirmpassword){
      alert("Senhas não conferem, tente novamente");
      return
      }

    this.http.post<any>("http://localhost:3000/auth/register", this.registerForm.value).pipe(
      tap(() => {
        alert("Registrado com Sucesso");
        this.registerForm.reset();
        this.router.navigate(['login']);

      }),

      catchError((error) => {
        if (error. error.message == "Email de usuario ja cadastrado, Cadastre um usuario com outro email!"){
          alert('Email de usuário ja cadastrado.')
        } else {
        alert("Erro ao registrar um usuário");
        }
        return of(null);
      })
    ).subscribe()

  }
}
