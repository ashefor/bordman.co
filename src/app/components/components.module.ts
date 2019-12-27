import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../views/shared/shared.module';
import { RouterModule } from '@angular/router';
import { LeaguesComponent } from './leagues/leagues.component';
import { AvailableBetsComponent } from './available-bets/available-bets.component';
import { BetslipComponent } from './betslip/betslip.component';
import { MatchEventComponent } from './match-event/match-event.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    LeaguesComponent,
    AvailableBetsComponent,
    BetslipComponent,
    MatchEventComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    LeaguesComponent,
    BetslipComponent,
    MatchEventComponent,
    AvailableBetsComponent
  ]
})
export class ComponentsModule { }
