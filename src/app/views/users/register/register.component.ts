import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading;
  constructor(private formbuilder: FormBuilder, private authservice: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.initialiseForm();
  }

  initialiseForm() {
    this.registerForm = this.formbuilder.group({
      // name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      // confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      // checked: ['', Validators.required]
    });
  }
  register(formvalue) {
    this.loading = true;
    this.authservice.createUser(formvalue.username, formvalue.email, formvalue.password).then(() => {
      if (this.authservice.user) {
        this.loading = false;
        if (this.authservice.redirectUrl) {
          this.router.navigateByUrl(this.authservice.redirectUrl);
        } else {
          this.router.navigate(['/']);
        }
      }
    }).catch((error: any) => {
      this.toastr.error(error.message);
      this.loading = false;
    });
  }
}
