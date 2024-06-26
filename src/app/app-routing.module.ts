import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { CrudComponent } from './pages/crud/crud.component';
import { FuncionariosLoginComponent } from './funcionarios/funcionarios-login/funcionarios-login.component';
import { FuncionariosRegistroComponent } from './funcionarios/funcionarios-registro/funcionarios-registro.component';
import { FuncionariosHomeComponent } from './funcionarios/funcionarios-home/funcionarios-home.component';
import { FuncionarioAuthservicesService } from './funcionario-authservices.service';
import { UsuarioAuthservicesService } from './usuario-authservices.service';
import { TimerFuncionarioComponent } from './funcionarios/timer-funcionario/timer-funcionario.component';
import { LancamentoPontoComponent } from './funcionarios/timer-funcionario/lancamento-ponto/lancamento-ponto.component';
import { ListaPontosAdmComponent } from './pages/crud/lista-pontos-adm/lista-pontos-adm.component';




const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [UsuarioAuthservicesService]},
  {path: 'register/usuario', component: RegisterComponent},
  {path: 'cadastro/funcionario', component: CrudComponent, canActivate: [UsuarioAuthservicesService]},
  {path: 'usuarios/registros-funcionario', component: ListaPontosAdmComponent},
  {path: 'funcionario', component: FuncionariosLoginComponent},
  {path: 'registro/funcionario', component: FuncionariosRegistroComponent, canActivate: [UsuarioAuthservicesService]},
  {path: 'funcionario/home', component: FuncionariosHomeComponent, canActivate: [FuncionarioAuthservicesService]},
  {path: 'funcionario/timer', component: TimerFuncionarioComponent, canActivate: [FuncionarioAuthservicesService]},
  {path: 'funcionario/timer/lancamento', component: LancamentoPontoComponent, canActivate: [FuncionarioAuthservicesService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
