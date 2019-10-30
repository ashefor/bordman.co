import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public betSlip = new BehaviorSubject(null);
  public betHistory = new BehaviorSubject(null)
  constructor() { }

  viewBetslip(data: any){
    this.betSlip.next(data)
  }

  viewBetHistory(history: Array<any>){
    this.betHistory.next(history)
  }
}
