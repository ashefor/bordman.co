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
  betslip = []
  constructor(private sportservice: SportsService, private dataservice: DataService) { 
    // this.dataservice.getBetslip.subscribe(data => {
    //   this.cart = data;
    // })
    // this.cart = localStorage.getItem('betslip')
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
    localStorage.setItem('betslip', JSON.stringify(matchevent))
  }
}
