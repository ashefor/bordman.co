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
    this.dataservice.getBetslip.subscribe(data => {
      this.cart = data;
    })
  }

  ngOnInit() {
    this.getNext15Schedules()
  }
  getNext15Schedules(){
    this.sportservice.getSchedules(this.leagueId).subscribe((data: any)=>{
      this.allSchedules = data.events;
    })
  }
  clicked(e, evnt){
    const matchevent = {
      match: evnt,
      outcome: e.target.value
    }
    this.dataservice.viewBetslip(matchevent)
    // console.log(e.target.value, evnt)
  }
}
