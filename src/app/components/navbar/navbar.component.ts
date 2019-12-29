import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EventEmittersService } from 'src/app/services/event-emitters.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('openmodal', { static: false }) openModal: ElementRef<HTMLElement>;
  @ViewChild('tabGroup', { static: false }) tabGroup;
  @ViewChild('activeTab', { static: false }) activeTab: ElementRef<HTMLElement>;
  @Output() openSidebar = new EventEmitter();
  // activeTab = 0;
  loginForm: FormGroup;
  registerForm: FormGroup;
  hide = true;
  mode = 0;
  loggingIn: boolean;
  registering: boolean;
  constructor(public authservice: AuthService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private emitterService: EventEmittersService) { }

  ngOnInit() {
    this.initialiseForm();
    this.initialiseRegForm();
    if (this.emitterService.subsVar === undefined) {
      this.emitterService.subsVar = this.emitterService.invokeLoginFunction.subscribe((selectedindex) => {
        this.openThisModal(selectedindex);
      });
    }
  }

  initialiseForm() {
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }
  initialiseRegForm() {
    this.registerForm = this.formbuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }
  get LoggedIn() {
    return this.authservice.isLoggedIn;
  }
  togglePwd() {
    this.hide = !this.hide;
  }

  register(formvalue) {
    this.registering = true;
    const { username, email, password } = formvalue;
    this.authservice.createUser(username, email, password).then(() => {
      this.registering = false;
      this.closeModal();
      this.registerForm.reset();
    }).catch(error => {
      console.log(error);
      this.registering = false;
      this.toastr.error(error);
    });
  }

  login(formvalue) {
    this.loggingIn = true;
    this.authservice.signIn(formvalue.email, formvalue.password).then((value: any) => {
      if (value.user) {
        this.loggingIn = false;
        this.closeModal();
      }
    }).catch((error) => {
      this.loggingIn = false;
      this.toastr.error(error.message);
    });
  }

  openThisModal(selectedindex) {
    this.openModal.nativeElement.classList.add('open');
    this.mode = selectedindex;
  }
  closeModal() {
    this.openModal.nativeElement.classList.remove('open');
  }

  openSiderBar() {
    this.openSidebar.emit();
  }

  selectIndex(index) {
    // this.activeTab.nativeElement.classList.add('active');
    if (index === 1) {
      this.mode = 1;
    } else {
      this.mode = 0;
    }
  }
}
