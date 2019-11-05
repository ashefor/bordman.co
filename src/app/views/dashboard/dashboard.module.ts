import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BetHistoryComponent } from './bet-history/bet-history.component';
import { DashboardComponent } from './dashboard.component';
import { DepositComponent } from './deposit/deposit.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { AuthGuard } from 'src/app/guards/auth.guard';



@NgModule({
  declarations: [
    BetHistoryComponent,
    DashboardComponent,
    DepositComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '', component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'bet-history', component: BetHistoryComponent
          },
          {
            path: 'deposit', component: DepositComponent
          }
        ]
      }
    ])
  ]
})
export class DashboardModule { }
