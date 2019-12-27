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
import { MatchEventComponent } from './match-event/match-event.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { TimeAgoPipe } from 'src/app/pipes/time-ago.pipe';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
    UtcDatePipe,
    BetslipComponent,
    MatchEventComponent,
    TimeAgoPipe
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
    MatToolbarModule,
    SlickCarouselModule
  ],
  exports: [
    UtcDatePipe,
    TimeAgoPipe,
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
    MatchEventComponent,
    SlickCarouselModule
  ]
})
export class SharedModule { }
