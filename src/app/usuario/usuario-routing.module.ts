import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";

const rotas: Routes = [
    {
        path: 'usuario/login',
        component: LoginComponent
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
export class UsuarioRoutingModule {

}