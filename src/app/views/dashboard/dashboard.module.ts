import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BetHistoryComponent } from './bet-history/bet-history.component';



@NgModule({
  declarations: [
    BetHistoryComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: 'bet-history', component: BetHistoryComponent
      }
    ])
  ]
})
export class DashboardModule { }
