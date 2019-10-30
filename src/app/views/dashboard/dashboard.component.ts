import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SportsService } from 'src/app/services/sports.service';
import { DataService } from 'src/app/services/data.service';
import { AppComponent } from 'src/app/app.component';
declare var swal: any
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  betslip;
  leaguename;
  multi: boolean = false;
  allSchedules: Array<any>;
  constructor(private router: Router,
    private authservice: AuthService,
    private sportservice: SportsService,
    private dataservice: DataService,
    private route: ActivatedRoute,
    public appcomponent: AppComponent) {
  }
  ngOnInit() {
    this.dataservice.betSlip.subscribe(data => {
      if (data) {
        this.betslip = data
      }
      const betslip = JSON.parse(localStorage.getItem('bordman-slip'))
      if (betslip) {
        this.betslip = betslip
      }
    })
  }

  clicked(event, evnt) {
    const matchevent = {
      match: evnt,
      outcome: event._elementRef.nativeElement.value
    }
    localStorage.setItem('bordman-slip', JSON.stringify(matchevent))
    this.dataservice.viewBetslip(matchevent)
  }

  addToslip(slip) {
    if (this.authservice.isLoggedIn) {
      slip.createdAt = Date.now();
      this.sportservice.addBets(slip).then(res => {
        this.removeBet()
      })
    } else {
      swal("You need to be signed in for that", {
        icon: "info",
        buttons: {
          cancel: true,
          confirm: 'Login',
        },
      }).then(data => {
        if (data) {
          this.appcomponent.openThisModal()
        }
      })
    }
  }
  removeBet() {
    this.betslip = null
    localStorage.removeItem('bordman-slip')
    this.dataservice.viewBetslip(null)
  }
}
