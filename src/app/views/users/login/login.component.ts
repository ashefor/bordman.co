import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  loading = false;
  constructor(private authservice: AuthService, private formbuilder: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.initialiseForm();
  }
  initialiseForm() {
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      password: ['', Validators.required],
    });
  }
  togglePwd() {
    this.hide = !this.hide;
  }
  login(formvalue) {
    this.loading = true;
    return this.authservice.signIn(formvalue.email, formvalue.password).then((data: any) => {
      if (data.user) {
        this.loading = false;
        if (this.authservice.redirectUrl) {
          this.router.navigateByUrl(this.authservice.redirectUrl);
        } else {
          this.router.navigate(['/']);
        }
      }
    }).catch((error: any) => {
      this.loading = false;
    });
  }
}
