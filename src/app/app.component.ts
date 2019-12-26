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
  @ViewChild('sidenav', { static: false }) sideNav;
  loginForm: FormGroup;
  registerForm: FormGroup;
  hide = true;
  loading = false;
  active = true;
  betslip;
  constructor(public authservice: AuthService,
              public dataservice: DataService) {
  }

  ngOnInit() {
    this.dataservice.viewBetSlip.subscribe(data => {
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
  get LoggedIn() {
    return this.authservice.isLoggedIn;
  }
  openSidebar() {
    this.sideNav.open();
  }
}
