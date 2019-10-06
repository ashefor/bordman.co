import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private formbuilder: FormBuilder, private authservice: AuthService, private router: Router) { }

  ngOnInit() {
    this.initialiseForm()
  }

  initialiseForm() {
    this.registerForm = this.formbuilder.group({
      // name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      // confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      // checked: ['', Validators.required]
    })
  }
  register(formvalue){
    console.log(formvalue.username, formvalue.email, formvalue.password)
    this.authservice.signUp(formvalue.username, formvalue.email, formvalue.password)
  }
}
