import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  constructor(private authservice: AuthService, private formbuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.initialiseForm()
  }
  initialiseForm() {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      password: ['', Validators.required],
    })
  }
  togglePwd(){
    this.hide = !this.hide
  }
}
