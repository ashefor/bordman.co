import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SportsService } from 'src/app/services/sports.service';
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from 'src/app/app.component';
declare var swal: any;
@Component({
  selector: 'app-betslipp',
  templateUrl: './betslip.component.html',
  styleUrls: ['./betslip.component.scss']
})
export class BetslipComponent implements OnInit {
  betslip;

  constructor(private dataservice: DataService,
              private sportservice: SportsService, private authservice: AuthService, public appcomponent: AppComponent) { }

  ngOnInit() {
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
