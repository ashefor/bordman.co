import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportsComponent } from './sports.component';
import { RouterModule } from '@angular/router';
import { UtcDatePipe } from 'src/app/pipes/utc-date.pipe';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    SportsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    ComponentsModule,
    RouterModule.forChild([
      {
        path: '', redirectTo: 'football', pathMatch: 'full'
      },
      {
        path: 'football', component: SportsComponent
      }
    ])
  ]
})
export class SportsModule { }
