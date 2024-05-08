import { AuthServiceService } from './../../auth-service.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    public loginForm!: FormGroup

constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router, private authService: AuthServiceService) { }

ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
}


login(): void{
  const email = this.loginForm.value.email;
  const password = this.loginForm.value.password;


  this.authService.login(email, password).subscribe(loginOk =>{
    if (loginOk) {
      alert("Usuario Logado com sucesso")
      this.loginForm.reset();
      this.router.navigate(['home'])

    } else {
      alert("Credenciais incorretas ou Usuario não existe")
    }

  })


}


}
