import { Component, OnInit, ViewChild } from '@angular/core';
import { SportsService } from 'src/app/services/sports.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from 'src/app/app.component';
import { Title } from '@angular/platform-browser';
declare var swal: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  betslip;
  nobetslip;
  slip: Observable<any>;
  multi = true;
  allSchedules: Array<any>;
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
    title: Title) {
    title.setTitle('BordmanBets');
  }

  ngOnInit() {
    this.dataservice.betSlip.subscribe(data => {
      if (data) {
        this.betslip = data;
      }
      const betslip = JSON.parse(localStorage.getItem('bordman-slip'));
      if (betslip) {
        this.betslip = betslip;
      }
    });
    this.router.navigateByUrl('premier-league', { skipLocationChange: true });
    this.getNext15Schedules();
    this.getLigue1Next15Schedules();
    this.getBundesligaNext15Schedules();
    this.getSerieANext15Schedules();
    this.getLigue1Next15Schedules();
    this.getLaLigaNext15Schedules();
  }

  getNext15Schedules() {
    this.sportservice.getSchedules('4328').subscribe((data: any) => {
      this.allEplSchedules = data.events;
      this.allSchedules = this.allEplSchedules;
    });
  }
  getLigue1Next15Schedules() {
    this.sportservice.getSchedules('4334').subscribe((data: any) => {
      this.allLigue1Schedules = data.events;
    });
  }
  getBundesligaNext15Schedules() {
    this.sportservice.getSchedules('4331').subscribe((data: any) => {
      this.allBundesligaSchedules = data.events;
    });
  }
  getSerieANext15Schedules() {
    this.sportservice.getSchedules('4332').subscribe((data: any) => {
      this.allSerieASchedules = data.events;
    });
  }
  getLaLigaNext15Schedules() {
    this.sportservice.getSchedules('4335').subscribe((data: any) => {
      this.allLaLigaSchedules = data.events;
    });
  }
  clicked(event, evnt) {
    const matchevent = {
      match: evnt,
      outcome: event._elementRef.nativeElement.value
    };
    localStorage.setItem('bordman-slip', JSON.stringify(matchevent));
    this.dataservice.viewBetslip(matchevent);
  }
  onValChange(eev) {
    console.log(eev);
    switch (eev) {
      case 'epl':
        this.allSchedules = this.allEplSchedules;
        break;
      case 'ligue-1':
        this.allSchedules = this.allLigue1Schedules;
        break;
      case 'la-liga':
        this.allSchedules = this.allLaLigaSchedules;
        break;
      case 'bundesliga':
        this.allSchedules = this.allBundesligaSchedules;
        break;
      case 'serie-a':
        this.allSchedules = this.allSerieASchedules;
        break;
    }
  }
  addToslip(slip) {
    if (this.authservice.isLoggedIn) {
      slip.createdAt = Date.now();
      this.sportservice.addBets(slip).then(res => {
        this.removeBet();
      });
    } else {
      swal('You need to be signed in for that', {
        icon: 'info',
        buttons: {
          cancel: true,
          confirm: 'Login',
        },
      }).then(data => {
        if (data) {
          this.appcomponent.openThisModal();
        }
      });
    }
  }
  removeBet() {
    this.betslip = null;
    localStorage.removeItem('bordman-slip');
    this.dataservice.viewBetslip(null);
  }
}
