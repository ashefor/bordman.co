import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SportsService } from 'src/app/services/sports.service';
import { DataService } from 'src/app/services/data.service';
import { betslip } from 'src/app/models/betslip';

@Component({
  selector: 'app-match-event',
  templateUrl: './match-event.component.html',
  styleUrls: ['./match-event.component.scss']
})
export class MatchEventComponent implements OnInit {
  @Input() schedules;
  @Input() leagueName;
  addToBetslip = new EventEmitter();
  matchEvent: betslip;
  constructor(
    private authservice: AuthService,
    private sportservice: SportsService,
    private dataservice: DataService, ) { }

  ngOnInit() {
  }


  clicked(event, evnt) {
    this.matchEvent = {
      match: evnt,
      outcome: event._elementRef.nativeElement.value
    };
    this.addToBetslip.emit(this.matchEvent);
    // localStorage.setItem('bordman-slip', JSON.stringify(this.matchEvent));
    this.dataservice.shareBetslip(this.matchEvent);
  }
}
