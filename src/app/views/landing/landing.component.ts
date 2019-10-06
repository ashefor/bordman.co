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
  betslip:any = {};
  nobetslip;
  multi: boolean = true;
  constructor(private router: Router, private dataservice: DataService) { 
    this.dataservice.getBetslip.subscribe(data => {
      this.betslip = JSON.parse(localStorage.getItem('betslip'));
      if(Object.keys(this.betslip).length === 0){
        this.nobetslip = true
      }else{
        this.nobetslip = false
      }
    })
  }

  ngOnInit() {
    this.router.navigateByUrl('premier-league', {skipLocationChange: true})
  }
  removeBet(){
    this.betslip = {}
    localStorage.setItem('betslip', JSON.stringify(this.betslip))
    this.dataservice.viewBetslip(localStorage.setItem('betslip', JSON.stringify(this.betslip)))
  }
}
