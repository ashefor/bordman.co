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
import { ComponentsModule } from 'src/app/components/components.module';
import { TimeAgoPipe } from 'src/app/pipes/time-ago.pipe';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    UtcDatePipe,
    TimeAgoPipe
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    FontAwesomeModule,
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
    SlickCarouselModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
