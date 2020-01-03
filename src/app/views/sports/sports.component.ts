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
  errorMsg = false;
  loading = true;
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
    this.allSchedules = null;
    this.sportservice.getSchedules(leagueid).then((data: any) => {
      this.loading = false;
      this.allSchedules = data.events;
      if (this.allSchedules === null) {
        this.leagueName = 'Fixtures';
      } else {
        this.allSchedules.forEach(elem => {
          this.leagueName = elem.strLeague;
        });
      }
    }).catch(error => {
      this.errorMsg = true;
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


}
