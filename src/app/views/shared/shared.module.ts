import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtcDatePipe } from 'src/app/pipes/utc-date.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
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
  ],
  exports: [
    UtcDatePipe,
    NgxPaginationModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCardModule,
    MatTabsModule,
  ]
})
export class SharedModule { }
