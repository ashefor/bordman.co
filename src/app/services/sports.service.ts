import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  constructor(public http: HttpClient, private db: AngularFireDatabase, private firestore: AngularFirestore) { }

  // postData(){
  //   return this.http.get('https://bord-manbets.firebaseio.com/allbets')
  // }
  // getSports(){
  //   return this.http.get(`${environment.sportsDB}search_all_leagues.php?c=spain`)
  // }
  getSchedules(leagueId){
    return this.http.get(`${environment.sportsDB}eventsnextleague.php?id=${leagueId}`)
  }

  addBets(betslip){
    const userid = JSON.parse(localStorage.getItem('user'))
    return this.db.list(`/allbets/${userid.uid}`).push(betslip)
  }
  // getAllBetsDatas(){
  //   const userid = JSON.parse(localStorage.getItem('user'))
  //   return this.db.list(`/allbets/${userid.uid}`).snapshotChanges()
  // }
  getAllBets(){
    const userid = JSON.parse(localStorage.getItem('user'))
    return this.db.list(`/allbets/${userid.uid}`).valueChanges()
  }
  // getAllCompetitions(){
  //   return this.http.get('http://api.football-data.org/v2/competitions/2021/matches?status=SCHEDULED&dateFrom=2019-10-19&dateTo=2019-10-21')
  // }
}
