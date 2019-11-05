import { Component, OnInit } from '@angular/core';
import { SportsService } from 'src/app/services/sports.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-eng-leage',
  templateUrl: './eng-leage.component.html',
  styleUrls: ['./eng-leage.component.scss']
})
export class EngLeageComponent implements OnInit {
  allSchedules = [];
  leagueId = 4328;
  constructor(private sportservice: SportsService, private dataservice: DataService) {
  }

  ngOnInit() {
    this.getNext15Schedules();
  }
  getNext15Schedules() {
    this.sportservice.getSchedules(this.leagueId).then((data: any) => {
      this.allSchedules = data.events;
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
}
