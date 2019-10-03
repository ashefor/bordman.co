import { Component, OnInit } from '@angular/core';
import { SportsService } from 'src/app/services/sports.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  betslip:object = {};
  nobetslip;
  constructor(private router: Router, private sportservice: SportsService, private dataservice: DataService) { 
    this.dataservice.getBetslip.subscribe(data => {
      this.betslip = data;
      if(Object.keys(this.betslip).length === 0){
        this.nobetslip = true
      }else{
        this.nobetslip = false
      }
    })
  }

  ngOnInit() {
    this.sportservice.getSports().subscribe(data => console.log(data));
    this.router.navigateByUrl('landing/premier-league', {skipLocationChange: true})
  }
  removeBet(){
    this.betslip = {}
    this.dataservice.viewBetslip(this.betslip)
  }
}
