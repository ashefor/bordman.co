import { Component, OnInit } from '@angular/core';
import { SportsService } from 'src/app/services/sports.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-french-leage',
  templateUrl: './french-leage.component.html',
  styleUrls: ['./french-leage.component.scss']
})
export class FrenchLeageComponent implements OnInit {
  allSchedules = [];
  leagueId = 4334;
  cart = [];
  constructor(private sportservice: SportsService, private dataservice: DataService) {
  }

  ngOnInit() {
    this.getNext15Schedules();
  }
  getNext15Schedules() {
    this.sportservice.getSchedules(this.leagueId).subscribe((data: any) => {
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
