import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'boardman';
  @ViewChild('openmodal', { static: false }) openModal: ElementRef<HTMLElement>;
  @ViewChild('tabGroup', { static: false }) tabGroup;
  loginForm: FormGroup;
  registerForm: FormGroup;
  hide = true;
  loading = false;
  active = true;
  betslip;
  constructor(public authservice: AuthService,
              private formbuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              public dataservice: DataService) {
   }

  ngOnInit() {
    this.initialiseForm();
    this.initialiseRegForm();
    this.dataservice.betSlip.subscribe(data => {
      if (data) {
        this.betslip = data;
      }
      const betslip = JSON.parse(localStorage.getItem('bordman-slip'));
      if (betslip) {
        this.betslip = betslip;
      } else {
        this.betslip = null;
      }
    });
  }
  initialiseForm() {
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  initialiseRegForm() {
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
    console.log(formvalue.username, formvalue.email, formvalue.password);
    this.authservice.signUp(formvalue.username, formvalue.email, formvalue.password).then((value: any) => {
      if (value.user) {
        this.loading = false;
        this.closeModal();
      }
    }).catch((error) => {
      this.loading = false;
      this.toastr.error(error.message);
    });
  }
  get LoggedIn() {
    return this.authservice.isLoggedIn;
  }
  togglePwd() {
    this.hide = !this.hide;
  }

  login(formvalue) {
    this.loading = true;
    this.authservice.signIn(formvalue.email, formvalue.password).then((value: any) => {
      if (value.user) {
        this.loading = false;
        this.closeModal();
      }
    }).catch((error) => {
      this.loading = false;
      this.toastr.error(error.message);
    });
  }

  openThisModal() {
    this.openModal.nativeElement.classList.add('open');
    this.tabGroup.selectedIndex = 0;
  }
  closeModal() {
    this.openModal.nativeElement.classList.remove('open');
  }
  // tabChanged(tabChangeEvent: MatTabChangeEvent){
  //   console.log('tabChangeEvent => ', tabChangeEvent);
  //   console.log('index => ', tabChangeEvent.index);
  // }
}
