import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BetslipComponent } from './views/betslip/betslip.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { AuthGuard } from './guards/auth.guard';
import { TicketsComponent } from './views/tickets/tickets.component';
import { AvailableBetsComponent } from './components/available-bets/available-bets.component';
import { AllAvailableBetsComponent } from './views/all-available-bets/all-available-bets.component';


const routes: Routes = [

  {
    path: '', loadChildren: () => import('./views/landing/landing.module').then((m) => m.LandingModule)
  },
  {
    path: 'sports', loadChildren: () => import('./views/sports/sports.module').then((m) => m.SportsModule)
  },
  {
    path: 'auth', loadChildren: () => import('./views/users/users.module').then((m) => m.UsersModule),
    canActivate: [LoggedInGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'bet-slip', component: BetslipComponent
  },
  {
    path: 'tickets/:id', component: TicketsComponent
  },
  {
    path: 'available-bets', component: AllAvailableBetsComponent
  },
  {
    path: '**', loadChildren: () => import('./views/pagenotfound/pagenotfound.module').then((m) => m.PagenotfoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
