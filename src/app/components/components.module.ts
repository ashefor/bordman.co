import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../views/shared/shared.module';
import { RouterModule } from '@angular/router';
import { LeaguesComponent } from './leagues/leagues.component';



@NgModule({
  declarations: [FooterComponent, NavbarComponent, LeaguesComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent
  ]
})
export class ComponentsModule { }
