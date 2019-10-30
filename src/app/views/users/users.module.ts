import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component'



@NgModule({
  declarations: [UsersComponent, LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '', redirectTo: 'login', pathMatch: 'full'
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      }
    ])
  ]
})
export class UsersModule { }
