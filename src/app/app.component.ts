import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';

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
  loading;
  active = true;
  constructor(public authservice: AuthService, private formbuilder: FormBuilder, private router: Router) {
    // console.log(this.authservice.isLoggedIn)
   }

  ngOnInit() {
    this.initialiseForm();
    this.initialiseRegForm();
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
    console.log(formvalue.username, formvalue.email, formvalue.password);
    this.authservice.signUp(formvalue.username, formvalue.email, formvalue.password);
  }
  get LoggedIn() {
    return this.authservice.isLoggedIn;
  }
  togglePwd() {
    this.hide = !this.hide;
  }

  login(formvalue) {
    this.authservice.signIn(formvalue.email, formvalue.password).then((value: any) => {
      if (value.user) {
        this.closeModal();
      }
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
