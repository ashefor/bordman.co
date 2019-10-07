import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SportsService } from 'src/app/services/sports.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.scss']
})
export class SportsComponent implements OnInit {
  betslip: any = {};
  nobetslip;
  leagues = [];
  leaguename;
  multi: boolean = true;
  allSchedules = [];
  constructor(private router: Router,
    private sportservice: SportsService,
    private dataservice: DataService,
    private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.sportservice.getRet().subscribe(data => console.log(data))
    this.sportservice.getSports().subscribe((data: any) => {
      this.leagues = data.countrys
      // console.log(this.leagues)
      this.leagues.forEach(elem => {
        // console.log(elem)
        if (Object.values(elem).includes('Soccer')) {
          // console.log(elem)
        }
      })
    });
    this.route.queryParams.subscribe(data => {
      console.log(data['category'])
      this.getFixtures(data['category'])
    })
    this.dataservice.getBetslip.subscribe(data => {
      this.betslip = JSON.parse(localStorage.getItem('betslip'));
      if (Object.keys(this.betslip).length === 0) {
        this.nobetslip = true
      } else {
        this.nobetslip = false
      }
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

  addToslip(slip) {
    this.sportservice.addBets(slip).then(res => {
      this.removeBet()
    })
  }
  removeBet() {
    this.betslip = {}
    localStorage.setItem('betslip', JSON.stringify(this.betslip))
    this.dataservice.viewBetslip(localStorage.setItem('betslip', JSON.stringify(this.betslip)))
  }

  getFixtures(leagueid) {
    this.sportservice.getSchedules(leagueid).subscribe((data: any) => {
      this.allSchedules = data.events;
      if (this.allSchedules === null) {
        this.leaguename = 'Fixtures'
      } else {
        this.allSchedules.forEach(elem => {
          this.leaguename = elem.strLeague
        })
      }
      console.log(this.allSchedules)
    })
  }
}
