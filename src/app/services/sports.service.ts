import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  constructor(public http: HttpClient) { }

  getSports(){
    return this.http.get(`${environment.sportsDB}search_all_leagues.php?c=spain`)
  }
  getSchedules(leagueId){
    return this.http.get(`${environment.sportsDB}eventsnextleague.php?id=${leagueId}`)
  }
  getRet(){
    return this.http.get('https://www.thesportsdb.com/api/v1/json/1/lookupevent.php?id=441613')
  }
}
