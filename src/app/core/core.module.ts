import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NavBarRoutingModule } from './navbar-routing.module';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    NavBarRoutingModule
  ],
  exports: [NavbarComponent]
})
export class CoreModule { }
