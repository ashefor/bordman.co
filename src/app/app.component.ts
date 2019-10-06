import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'boardman';

  loginForm: FormGroup;
  hide = true;
  constructor(private authservice: AuthService, private formbuilder: FormBuilder, private router: Router) {
    console.log(this.authservice.isLoggedIn)
   }
   
  ngOnInit() {
    this.initialiseForm()
  }
  initialiseForm() {
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    })
  }

  get LoggedIn(){
    return this.authservice.isLoggedIn
  }
  togglePwd(){
    this.hide = !this.hide
  }

  login(formvalue){
    console.log(formvalue.email, formvalue.password)
    this.authservice.signIn(formvalue.email, formvalue.password)
  }
}
