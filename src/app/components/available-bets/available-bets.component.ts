import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-available-bets',
  templateUrl: './available-bets.component.html',
  styleUrls: ['./available-bets.component.scss']
})
export class AvailableBetsComponent implements OnInit {
  @Input() availableBets;
  @Input() errorMsg;
  @Input() showBetsMode;
  p = 1;
  constructor(private dataservice: DataService, private router: Router) {
    // router.events.subscribe((event: Event) => {
    //   if (event instanceof NavigationEnd) {
    //     console.log(event.url);
    //     if (event.url === '/available-bets') {
    //       this.showAllBets = false;
    //       console.log(this.showAllBets);
    //     }
    //   }
    // });
   }

  ngOnInit() {
    this.dataservice.toggleAllBets.subscribe(bool => {
      // console.log(bool);
      // this.showAllBets = bool;
    });
  }

}
