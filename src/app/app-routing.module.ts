import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./usuario/login/login.component";

const rotas: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forRoot(rotas)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}