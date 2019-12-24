import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EventEmittersService } from 'src/app/services/event-emitters.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('openmodal', { static: false }) openModal: ElementRef<HTMLElement>;
  @ViewChild('tabGroup', { static: false }) tabGroup;
  @Output() openSidebar = new EventEmitter();
  activeTab = 0;
  loginForm: FormGroup;
  registerForm: FormGroup;
  hide = true;
  loading = false;
  constructor(public authservice: AuthService,
              private formbuilder: FormBuilder,
              private toastr: ToastrService,
              private emitterService: EventEmittersService) { }

  ngOnInit() {
    this.initialiseForm();
    this.initialiseRegForm();
    if (this.emitterService.subsVar === undefined) {
      this.emitterService.subsVar = this.emitterService.invokeLoginFunction.subscribe(() => {
        this.openThisModal(0);
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

  openThisModal(selectedindex) {
    this.openModal.nativeElement.classList.add('open');
    this.activeTab = selectedindex;
  }
  closeModal() {
    this.openModal.nativeElement.classList.remove('open');
  }

  openSiderBar() {
    this.openSidebar.emit();
  }
}
