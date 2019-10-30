import { Component, OnInit, ViewChild } from '@angular/core';
import { SportsService } from 'src/app/services/sports.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from 'src/app/app.component';
declare var swal: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  betslip;
  nobetslip;
  slip: Observable<any>
  multi: boolean = true;
  constructor(private router: Router, private sportservice: SportsService, private dataservice: DataService, private authservice: AuthService, public appcomponent: AppComponent) {

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
    this.router.navigateByUrl('premier-league', { skipLocationChange: true })
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
