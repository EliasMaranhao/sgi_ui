import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MembrosModule } from './membros/membros.module';
import { CoreModule } from './core/core.module';
import { RouterModule, Routes } from '@angular/router';
import { PesquisaComponent } from './membros/pesquisa/pesquisa.component';
import { CadastroComponent } from './membros/cadastro/cadastro.component';
import { AppRoutingModule } from './app-routing.module';
import { UsuarioModule } from './usuario/usuario.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MembrosModule,
    CoreModule,
    AppRoutingModule,
    UsuarioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
