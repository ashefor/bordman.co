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

import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    UtcDatePipe
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
    MatButtonToggleModule
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
    MatButtonToggleModule
  ]
})
export class SharedModule { }
