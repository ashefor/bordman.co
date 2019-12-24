import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SportsService } from 'src/app/services/sports.service';
import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from 'src/app/app.component';
declare var swal: any;

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss']
})
export class SportsComponent implements OnInit {
  betslip;
  leagueName;
  multi = false;
  allSchedules: Array<any>;
  constructor(private router: Router,
              private authservice: AuthService,
              private sportservice: SportsService,
              private dataservice: DataService,
              private route: ActivatedRoute,
              public appcomponent: AppComponent) {
  }
  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.getFixtures(data.category);
    });
    this.dataservice.viewBetSlip.subscribe(data => {
      if (data) {
        this.betslip = data;
      }
      const betslip = JSON.parse(localStorage.getItem('bordman-slip'));
      if (betslip) {
        this.betslip = betslip;
      }
    });
  }

  getFixtures(leagueid) {
    this.sportservice.getSchedules(leagueid).then((data: any) => {
      this.allSchedules = data.events;
      console.log(this.allSchedules);
      if (this.allSchedules === null) {
        this.leagueName = 'Fixtures';
      } else {
        this.allSchedules.forEach(elem => {
          this.leagueName = elem.strLeague;
        });
      }
    });
  }

  getBetSlip() {

  }
  clicked(event, evnt) {
    const matchevent = {
      match: evnt,
      outcome: event._elementRef.nativeElement.value
    };
    localStorage.setItem('bordman-slip', JSON.stringify(matchevent));
    this.dataservice.shareBetslip(matchevent);
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
    this.dataservice.shareBetslip(null);
  }

}
