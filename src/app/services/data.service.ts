import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public viewBetSlip = new BehaviorSubject(null);
  public betHistory = new BehaviorSubject(null);
  constructor() { }

  shareBetslip(data: any) {
    this.viewBetSlip.next(data);
  }

  viewBetHistory(history: Array<any>) {
    this.betHistory.next(history);
  }
}
