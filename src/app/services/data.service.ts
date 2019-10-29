import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public betSlip = new BehaviorSubject(null)

  // getBetslip = this.betSlip.asObservable()
  constructor() { }

  viewBetslip(data: any){
    this.betSlip.next(data)
  }
}
