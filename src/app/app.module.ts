import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthServiceService } from './auth-service.service';
import { ButtonComponent } from './components/button/button.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CrudComponent } from './pages/crud/crud.component';
import {MatInputModule} from '@angular/material/input';
import { MatPaginatorModule} from '@angular/material/paginator';
import { ModalViewUserComponent } from './pages/crud/modal-view-user/modal-view-user.component';
import {MatDialogModule } from '@angular/material/dialog';
import { ModalFormUserComponent } from './pages/crud/modal-form-user/modal-form-user.component';
import { FuncionariosLoginComponent } from './funcionarios/funcionarios-login/funcionarios-login.component';
import { FuncionariosRegistroComponent } from './funcionarios/funcionarios-registro/funcionarios-registro.component';
import { FuncionariosHomeComponent } from './funcionarios/funcionarios-home/funcionarios-home.component';
import { MenuFuncionarioComponent } from './funcionarios/menu-funcionario/menu-funcionario.component';
import { TimerFuncionarioComponent } from './funcionarios/timer-funcionario/timer-funcionario.component';
import { ModalSenhaComponent } from './funcionarios/modal-senha/modal-senha.component';
import { TrocarSenhaUsuarioComponent } from './components/trocar-senha-usuario/trocar-senha-usuario.component';
import { CookieService } from 'ngx-cookie-service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import { LancamentoPontoComponent } from './funcionarios/timer-funcionario/lancamento-ponto/lancamento-ponto.component';
import { ListaPontosAdmComponent } from './pages/crud/lista-pontos-adm/lista-pontos-adm.component';
import { ModalViewPontosComponent } from './pages/crud/lista-pontos-adm/modal-view-pontos/modal-view-pontos.component';





@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MenuComponent,
    CrudComponent,
    ModalViewUserComponent,
    ModalFormUserComponent,
    FuncionariosLoginComponent,
    FuncionariosRegistroComponent,
    FuncionariosHomeComponent,
    MenuFuncionarioComponent,
    TimerFuncionarioComponent,
    ModalSenhaComponent,
    TrocarSenhaUsuarioComponent,
    LancamentoPontoComponent,
    ListaPontosAdmComponent,
    ModalViewPontosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatListModule

  ],
  providers:[CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {


 }
