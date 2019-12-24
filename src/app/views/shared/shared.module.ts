import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtcDatePipe } from 'src/app/pipes/utc-date.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';

import {NgxPaginationModule} from 'ngx-pagination';
import { BetslipComponent } from './betslip/betslip.component';
import { LeagueComponent } from './league/league.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    UtcDatePipe,
    BetslipComponent,
    LeagueComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  exports: [
    UtcDatePipe,
    NgxPaginationModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    BetslipComponent,
    LeagueComponent
  ]
})
export class SharedModule { }
