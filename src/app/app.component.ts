import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'boardman';
  @ViewChild('openmodal', { static: false }) openModal: ElementRef<HTMLElement>
  @ViewChild('tabGroup', { static: false }) tabGroup;
  loginForm: FormGroup;
  registerForm: FormGroup;
  hide = true;
  active: boolean = true;
  constructor(private authservice: AuthService, private formbuilder: FormBuilder, private router: Router) {
    console.log(this.authservice.isLoggedIn)
   }
   
  ngOnInit() {
    this.initialiseForm()
    this.initialiseRegForm();
  }
  ngAfterViewInit() {
    console.log(this.tabGroup.selectedIndex);
    this.tabGroup.selectedIndex = 0;
  }
  initialiseForm() {
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    })
  }

  initialiseRegForm() {
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

  openThisModal() {
    this.openModal.nativeElement.classList.add('open');
    this.tabGroup.selectedIndex = 0;
  }
  closeModal() {
    this.openModal.nativeElement.classList.remove('open')
    console.log(this.tabGroup.selectedIndex);
    // this.tabGroup.selectedIndex = 0;
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent){
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
  }
}
