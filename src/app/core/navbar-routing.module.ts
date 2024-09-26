import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PesquisaComponent } from "../membros/pesquisa/pesquisa.component";

const rotas: Routes = [
    {
      path: 'membros',
      component: PesquisaComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(rotas)
    ],
    exports: [
        RouterModule
    ]
})
export class NavBarRoutingModule{}