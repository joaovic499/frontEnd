import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './auth-guard';
import { CrudComponent } from './pages/crud/crud.component';
import { TimerComponent } from './pages/timer/timer.component';
import { FuncionariosLoginComponent } from './funcionarios/funcionarios-login/funcionarios-login.component';
import { FuncionariosRegistroComponent } from './funcionarios/funcionarios-registro/funcionarios-registro.component';
import { FuncionariosHomeComponent } from './funcionarios/funcionarios-home/funcionarios-home.component';




const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/funcionario', pathMatch: 'full' },
  {path: 'register/usuario', component: RegisterComponent},
  {path: 'cadastro/funcionario', component: CrudComponent},
  {path: 'timer', component: TimerComponent},
  {path: 'funcionario', component: FuncionariosLoginComponent},
  {path: 'registro/funcionario', component: FuncionariosRegistroComponent},
  {path: 'funcionario/home', component: FuncionariosHomeComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
