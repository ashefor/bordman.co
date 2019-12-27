import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SportsService } from 'src/app/services/sports.service';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { EventEmittersService } from 'src/app/services/event-emitters.service';
import { DataService } from 'src/app/services/data.service';
import { AngularFireDatabase } from '@angular/fire/database';

declare var swal: any;
@Component({
  selector: 'app-betslip',
  templateUrl: './betslip.component.html',
  styleUrls: ['./betslip.component.scss']
})

export class BetslipComponent implements OnInit {
  betSlip: any;
  invalidamt = false;
  disabled: boolean;
  @ViewChild('navbar', { static: false }) navbar: NavbarComponent;
  @ViewChild('stakeamount', { static: false }) stakeamount;
  constructor(
    private authservice: AuthService,
    private sportservice: SportsService,
    private emitterService: EventEmittersService,
    private dataservice: DataService,
    private db: AngularFireDatabase) { }

  ngOnInit() {
    this.dataservice.viewBetSlip.subscribe(data => {
      if (data) {
        this.betSlip = data;
      }
    });
  }

  getTicketId = () => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 7; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  addToslip(slip) {
    const amount = this.stakeamount.nativeElement.value;
    if (amount < 1000) {
      this.invalidamt = true;
      this.disabled = true;
    } else {
      if (this.authservice.isLoggedIn) {
        slip.createdAt = Date.now();
        slip.stake = amount;
        console.log(slip);
        this.sportservice.addBets(slip).then(() => {
          this.removeBet();
        });
      } else {
        swal('You need to be signed in for that', {
          icon: 'info',
          buttons: {
            cancel: true,
            confirm: 'Login',
          },
        }).then((data: any) => {
          if (data) {
            this.emitterService.openLoginModal(0);
          }
        });
      }
    }
  }
  removeBet() {
    this.betSlip = null;
  }
  showInput(event) {
    this.invalidamt = false;
    this.disabled = false;
  }
}
