import { Component, OnInit } from '@angular/core';
import { SportsService } from 'src/app/services/sports.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-italy-leage',
  templateUrl: './italy-leage.component.html',
  styleUrls: ['./italy-leage.component.scss']
})
export class ItalyLeageComponent implements OnInit {
  allSchedules = [];
  leagueId = 4332;
  cart = []
  constructor(private sportservice: SportsService, private dataservice: DataService) {
  }

  ngOnInit() {
    this.getNext15Schedules()
  }
  getNext15Schedules() {
    this.sportservice.getSchedules(this.leagueId).subscribe((data: any) => {
      this.allSchedules = data.events;
    })
  }
  clicked(event, evnt) {
    const matchevent = {
      match: evnt,
      outcome: event._elementRef.nativeElement.value
    }
    localStorage.setItem('betslip', JSON.stringify(matchevent))
    this.dataservice.viewBetslip(localStorage.setItem('betslip', JSON.stringify(matchevent)))
  }
}
