import { Component, OnInit, Input } from '@angular/core';
import { SportsService } from 'src/app/services/sports.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-available-bets',
  templateUrl: './all-available-bets.component.html',
  styleUrls: ['./all-available-bets.component.scss']
})
export class AllAvailableBetsComponent implements OnInit {

  availableBets: any;
  showBetsMode = 1;
  errorMsg: boolean;
  constructor(private sportservice: SportsService,
              private toastr: ToastrService, ) { }

  ngOnInit() {
    this.loadAvailableBets();
  }

  loadAvailableBets() {
    this.sportservice.availableBets.subscribe(res => {
      this.availableBets = res;
    }, err => {
      this.errorMsg = true;
      this.toastr.error('Failure to load Bets');
    });
  }

}
