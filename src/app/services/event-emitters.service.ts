import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class EventEmittersService {

  invokeLoginFunction = new EventEmitter();
  invokeSidebarFunction = new EventEmitter();
  subsVar: Subscription;
  constructor() { }

  openLoginModal(selectedindex: number) {
    this.invokeLoginFunction.emit(selectedindex);
  }
}
