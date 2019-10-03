import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { RouterModule } from '@angular/router';
import { GerLeageComponent } from './ger-leage/ger-leage.component';
import { FrenchLeageComponent } from './french-leage/french-leage.component';
import { SpainLeageComponent } from './spain-leage/spain-leage.component';
import { ItalyLeageComponent } from './italy-leage/italy-leage.component';
import { EngLeageComponent } from './eng-leage/eng-leage.component';
import { UtcDatePipe } from 'src/app/pipes/utc-date.pipe';



@NgModule({
  declarations: [EngLeageComponent, 
    LandingComponent, 
    GerLeageComponent, 
    FrenchLeageComponent, 
    SpainLeageComponent, 
    ItalyLeageComponent,
    UtcDatePipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: LandingComponent,
        children: [
          // {
          //   path: '', redirectTo: 'premier-league', pathMatch: 'full'
          // },
          {
            path: 'premier-league', component: EngLeageComponent
          },
          {
            path: 'la-liga', component: SpainLeageComponent
          },
          {
            path: 'bundesliga', component: GerLeageComponent
          },
          {
            path: 'ligue-1', component: FrenchLeageComponent
          },
          {
            path: 'serie-a', component: ItalyLeageComponent
          },
        ]
      }
    ])
  ]
})
export class LandingModule { }
