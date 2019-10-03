import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  constructor(public http: HttpClient) { }

  getSports(){
    return this.http.get(`${environment.sportsDB}all_leagues.php`)
  }
  getSchedules(leagueId){
    return this.http.get(`${environment.sportsDB}eventsnextleague.php?id=${leagueId}`)
  }
}
