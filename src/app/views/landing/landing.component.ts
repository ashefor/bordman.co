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
declare var swal: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  slides = [
    {img: 'http://placehold.it/350x150/777777'},
    {img: 'http://placehold.it/350x150/777777'},
    {img: 'http://placehold.it/350x150/777777'},
    {img: 'http://placehold.it/350x150/777777'},
    {img: 'http://placehold.it/350x150/777777'}
  ];
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    loop: true,
    autoplay: true,
    infinite: false,
  };
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
  constructor(private router: Router,
              private sportservice: SportsService,
              private dataservice: DataService,
              private authservice: AuthService,
              public appcomponent: AppComponent,
              title: Title,
              private toastr: ToastrService) {
    title.setTitle('BordmanBets');
  }

  ngOnInit() {
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

  // getNext15Schedules() {
  //   this.sportservice.getSchedules('4328').then((data: any) => {
  //     this.loading = false;
  //     this.allEplSchedules = data.events;
  //     this.allSchedules = this.allEplSchedules;
  //   }).catch((error: any) => {
  //     this.errorMsg = true;
  //     this.toastr.error('An errror has occured');
  //   });
  // }
  // getLigue1Next15Schedules() {
  //   this.sportservice.getSchedules('4334').then((data: any) => {
  //     this.allLigue1Schedules = data.events;
  //   }).catch((error: any) => {
  //       this.toastr.error('An errror has occured');
  //   });
  // }
  // getBundesligaNext15Schedules() {
  //   this.sportservice.getSchedules('4331').then((data: any) => {
  //     this.allBundesligaSchedules = data.events;
  //   }).catch((error: any) => {
  //       this.toastr.error('An errror has occured');
  //   });
  // }
  // getSerieANext15Schedules() {
  //   this.sportservice.getSchedules('4332').then((data: any) => {
  //     this.allSerieASchedules = data.events;
  //   }).catch((error: any) => {
  //       this.toastr.error('An errror has occured');
  //   });
  // }
  // getLaLigaNext15Schedules() {
  //   this.sportservice.getSchedules('4335').then((data: any) => {
  //     this.allLaLigaSchedules = data.events;
  //   }).catch((error: any) => {
  //       this.toastr.error('An errror has occured');
  //   });
  // }
  clicked(event, evnt) {
    this.matchEvent = {
      match: evnt,
      outcome: event._elementRef.nativeElement.value
    };
    localStorage.setItem('bordman-slip', JSON.stringify(this.matchEvent));
    this.dataservice.shareBetslip(this.matchEvent);
  }
  onValChange(eev) {
    if(this.allMatches) {
      switch (eev) {
        case 'epl':
          this.allSchedules = this.allMatches[1].events;
          break;
        case 'ligue-1':
          this.allSchedules = this.allMatches[0].events;
          break;
        case 'la-liga':
          this.allSchedules = this.allMatches[4].events;
          break;
        case 'bundesliga':
          this.allSchedules = this.allMatches[2].events;
          break;
        case 'serie-a':
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
