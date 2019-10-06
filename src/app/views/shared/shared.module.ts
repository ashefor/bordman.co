import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtcDatePipe } from 'src/app/pipes/utc-date.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [
    UtcDatePipe
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCardModule
  ],
  exports: [
    UtcDatePipe,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCardModule
  ]
})
export class SharedModule { }
