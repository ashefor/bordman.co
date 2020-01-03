import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-available-bets',
  templateUrl: './available-bets.component.html',
  styleUrls: ['./available-bets.component.scss']
})
export class AvailableBetsComponent implements OnInit {
  @Input() availableBets;
  @Input() errorMsg;
  constructor() { }

  ngOnInit() {
  }

}
