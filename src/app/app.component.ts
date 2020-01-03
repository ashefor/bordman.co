import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './services/data.service';
import { FirebaseNotificationsService } from './services/firebase-notifications.service';
import { SportsService } from './services/sports.service';
import { EventEmittersService } from './services/event-emitters.service';
import { faHamburger, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'boardman';
  @ViewChild('openmodal', { static: false }) openModal: ElementRef<HTMLElement>;
  @ViewChild('tabGroup', { static: false }) tabGroup;
  @ViewChild('sidenav', { static: false }) sideNav;
  loginForm: FormGroup;
  registerForm: FormGroup;
  faHamburger = faBars;
  hide = true;
  loading = false;
  active = true;
  betslip;
  message: any;
  mode = 0;
  availableBets: Array<any>;
  errorMsg = false;
  showBetslip: boolean;
  constructor(public authservice: AuthService,
              public dataservice: DataService,
              private fs: FirebaseNotificationsService,
              private toastr: ToastrService,
              private formbuilder: FormBuilder,
              private sportservice: SportsService,
              private emitterService: EventEmittersService,
              ) {
                this.initialiseForm();
                this.initialiseRegForm();
  }

  ngOnInit() {
    this.fs.getPermission();
    this.fs.receiveMsg();
    this.message = this.fs.alert;
    this.loadAvailableBets();
    // if (this.message) {
    //   console.log(this.message)
    //   this.toastr.success('this.message.body');
    // }
    if (this.emitterService.subsVar === undefined) {
      this.emitterService.subsVar = this.emitterService.invokeLoginFunction.subscribe((selectedindex) => {
        this.openThisModal(selectedindex);
      });
    }
    // this.dataservice.viewBetSlip.subscribe(data => {
    //   if (data) {
    //     this.betslip = data;
    //   }
    //   const betslip = JSON.parse(localStorage.getItem('bordman-slip'));
    //   if (betslip) {
    //     this.betslip = betslip;
    //   } else {
    //     this.betslip = null;
    //   }
    // });
  }
  get LoggedIn() {
    return this.authservice.isLoggedIn;
  }
  openSidebar() {
    this.sideNav.open();
  }
  loadAvailableBets() {
    this.sportservice.getAllBetsDatas().subscribe(res => {
      this.availableBets = res;
    }, error => {
      this.errorMsg = true;
      this.toastr.error('An error has occured');
    });
  }

  openThisModal(selectedindex) {
    this.openModal.nativeElement.classList.add('open');
    this.mode = selectedindex;
  }
  closeModal() {
    this.openModal.nativeElement.classList.remove('open');
    this.registerForm.reset();
    this.loginForm.reset();
  }

  selectIndex(index) {
    if (index === 1) {
      this.mode = 1;
    } else {
      this.mode = 0;
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

  toggleBetslip() {
    this.showBetslip = ! this.showBetslip;
  }
}
