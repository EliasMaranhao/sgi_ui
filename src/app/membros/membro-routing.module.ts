import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CadastroComponent } from "./cadastro/cadastro.component";

const rotas: Routes = [
    {
        path: 'membros/novo',
        component: CadastroComponent
    },
    {
        path: 'membro/:id',
        component: CadastroComponent
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
export class MembroRoutingModule {}