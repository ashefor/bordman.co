import { Component, OnInit, ViewChild } from '@angular/core';
import { SportsService } from 'src/app/services/sports.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from 'src/app/app.component';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { betslip } from 'src/app/models/betslip';
import { FirebaseNotificationsService } from 'src/app/services/firebase-notifications.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
declare var swal: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    loop: true,
    arrows: false,
    autoplay: true,
    infinite: false,
  };

  loginForm: FormGroup;
  registerForm: FormGroup;
  betslip;
  nobetslip;
  matchEvent: betslip;
  slip: Observable<any>;
  multi = true;
  allSchedules: Array<any>;
  errorMsg = false;
  loading = true;
  allMatches: Array<any>;
  availableBets: Array<any>;
  allEplSchedules: Array<any>;
  allLigue1Schedules: Array<any>;
  allBundesligaSchedules: Array<any>;
  allSerieASchedules: Array<any>;
  allLaLigaSchedules: Array<any>;
  message;
  // activeLeague = true;
  selectedLeagueIndex = 0;
  constructor(private router: Router,
              private sportservice: SportsService,
              private dataservice: DataService,
              private authservice: AuthService,
              public appcomponent: AppComponent,
              title: Title,
              private fs: FirebaseNotificationsService,
              private toastr: ToastrService,
              private formbuilder: FormBuilder) {
    title.setTitle('BordmanBets');
    this.initialiseForm();
    this.initialiseRegForm();
  }

  ngOnInit() {
    // this.fs.getPermission();
    // this.fs.receiveMsg();
    // this.message = this.fs.alert;
    // this.dataservice.viewBetSlip.subscribe(data => {
    //   if (data) {
    //     this.betslip = data;
    //   }
    //   const betslip = JSON.parse(localStorage.getItem('bordman-slip'));
    //   if (betslip) {
    //     this.betslip = betslip;
    //   }
    // });
    // this.getNext15Schedules();
    // this.getLigue1Next15Schedules();
    // this.getBundesligaNext15Schedules();
    // this.getSerieANext15Schedules();
    // this.getLigue1Next15Schedules();
    // this.getLaLigaNext15Schedules();
    this.sportservice.getAllBetsDatas().subscribe(res => {
      this.availableBets = res;
    }, error => {
      this.toastr.error('An error has occured');
    });
    this.sportservice.getSchedule().subscribe(results => {
      if (results) {
        this.allMatches = results;
        this.allSchedules = this.allMatches[1].events;
      }
    }, error => {
      this.errorMsg = true;
      this.toastr.error('An error has occured');
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
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }
  clicked(event, evnt) {
    this.matchEvent = {
      match: evnt,
      outcome: event._elementRef.nativeElement.value
    };
    localStorage.setItem('bordman-slip', JSON.stringify(this.matchEvent));
    this.dataservice.shareBetslip(this.matchEvent);
  }
  onValChange(eev) {
    this.selectedLeagueIndex = eev;
    if (this.allMatches) {
      switch (eev) {
        case 0:
          this.allSchedules = this.allMatches[1].events;
          break;
        case 1:
          this.allSchedules = this.allMatches[0].events;
          break;
        case 2:
          this.allSchedules = this.allMatches[4].events;
          break;
        case 3:
          this.allSchedules = this.allMatches[2].events;
          break;
        case 4:
          this.allSchedules = this.allMatches[3].events;
          break;
      }
    }
  }
  // addToslip(slip) {
  //   if (this.authservice.isLoggedIn) {
  //     slip.createdAt = Date.now();
  //     this.sportservice.addBets(slip).then(res => {
  //       this.removeBet();
  //     });
  //   } else {
  //     swal('You need to be signed in for that', {
  //       icon: 'info',
  //       buttons: {
  //         cancel: true,
  //         confirm: 'Login',
  //       },
  //     }).then(data => {
  //       if (data) {
  //         this.appcomponent.openThisModal();
  //       }
  //     });
  //   }
  // }
  // removeBet() {
  //   this.betslip = null;
  //   localStorage.removeItem('bordman-slip');
  //   this.dataservice.viewBetslip(null);
  // }
}
