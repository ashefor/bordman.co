import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  
  {
    path: '', loadChildren: ()=> import('./views/landing/landing.module').then((m)=> m.LandingModule)
  },
  {
    path: 'sports', loadChildren: ()=> import('./views/sports/sports.module').then((m)=>m.SportsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
