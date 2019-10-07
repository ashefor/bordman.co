import { Component, OnInit } from '@angular/core';
import { SportsService } from 'src/app/services/sports.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  betslip:any = {};
  nobetslip;
  slip: Observable<any>
  multi: boolean = true;
  constructor(private router: Router, private sportservice: SportsService, private dataservice: DataService) { 
   
  }

  ngOnInit() {
    this.sportservice.getDatas().subscribe((res:any)=>{
      this.slip = res;
      console.log(this.slip)
    })
    this.dataservice.getBetslip.subscribe(data => {
      this.betslip = JSON.parse(localStorage.getItem('betslip'));
      if(Object.keys(this.betslip).length === 0){
        this.nobetslip = true
      }else{
        this.nobetslip = false
      }
    })
    this.router.navigateByUrl('premier-league', {skipLocationChange: true})
  }

  addToslip(slip){
    this.sportservice.addBets(slip).then(res=>{
      this.removeBet()
    })
  }
  removeBet(){
    this.betslip = {}
    localStorage.setItem('betslip', JSON.stringify(this.betslip))
    this.dataservice.viewBetslip(localStorage.setItem('betslip', JSON.stringify(this.betslip)))
  }
}
