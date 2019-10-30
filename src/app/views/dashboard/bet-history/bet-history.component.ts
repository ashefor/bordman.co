import { Component, OnInit, OnDestroy } from '@angular/core';
import { SportsService } from 'src/app/services/sports.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
declare var swal: any
@Component({
  selector: 'app-bet-history',
  templateUrl: './bet-history.component.html',
  styleUrls: ['./bet-history.component.scss']
})
export class BetHistoryComponent implements OnInit, OnDestroy {
  allBets: Array<any>;
  subscription: Subscription;
  betslip;
  leaguename;
  multi: boolean = false;
  allSchedules: Array<any>;
  constructor(private sportservice: SportsService, private authservice: AuthService, private dataservice: DataService,
    private route: ActivatedRoute,
    public appcomponent: AppComponent) { }

  ngOnInit() {
    this.getBetHistory()
  }

  getBetHistory() {
    this.dataservice.betSlip.subscribe(data => {
      if (data) {
        this.betslip = data
      }
      const betslip = JSON.parse(localStorage.getItem('bordman-slip'))
      if (betslip) {
        this.betslip = betslip
      }
    })
    if (this.authservice.isLoggedIn) {
      this.subscription = this.sportservice.getAllBets().subscribe((data: any) => {
        this.allBets = data
        console.log(this.allBets)
      })
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
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
