import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroComponent } from './cadastro/cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { PesquisaComponent } from './pesquisa/pesquisa.component'
import { MembroRoutingModule } from './membro-routing.module';


@NgModule({
  declarations: [
    CadastroComponent,
    PesquisaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MembroRoutingModule,
    FormsModule
  ],
  exports: [
    CadastroComponent
  ]
})
export class MembrosModule { }
