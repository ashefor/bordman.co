import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { SportsService } from 'src/app/services/sports.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  ticketId: string;
  ticket: any;
  availableoptions = [];
  userId: string;
  newBetOutcome: string;
  disableSelect: boolean;
  constructor(private route: ActivatedRoute, private sportservice: SportsService, private authservice: AuthService) {
    if (this.authservice.isLoggedIn) {
      this.userId = JSON.parse(localStorage.getItem('user')).uid;
    }
  }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.ticketId = param.id;
      this.viewSingleTicketDetails(this.ticketId);
    });
  }

  viewSingleTicketDetails(ticketId) {
    this.sportservice.viewSingleTicket(ticketId).subscribe(res => {
      this.ticket = res;
      console.log(this.ticket);
      if (this.ticket.match.includes(this.ticket.outcome)) {
        const options = this.ticket.match.split(' vs ');
        this.availableoptions.push('draw', options[0], options[1]);
        this.availableoptions = this.availableoptions.filter(opt => opt !== this.ticket.outcome);
      } else if (this.ticket.outcome === 'draw') {
        const options = this.ticket.match.split(' vs ');
        this.availableoptions.push(options[0], options[1]);
      }
    });
  }

  counterOption(event) {
    console.log(event.target.value);
    this.newBetOutcome = event.target.value;
  }

  joinBet(ticket) {
    if (this.newBetOutcome) {
      this.sportservice.addUserToBet(ticket, this.newBetOutcome).then(() => {
        this.disableSelect = true;
      });
    }
  }
}
