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

  postData(){
    return this.http.get('https://bord-manbets.firebaseio.com/allbets')
  }
  getSports(){
    return this.http.get(`${environment.sportsDB}search_all_leagues.php?c=spain`)
  }
  getSchedules(leagueId){
    return this.http.get(`${environment.sportsDB}eventsnextleague.php?id=${leagueId}`)
  }
  getRet(){
    return this.http.get('https://www.thesportsdb.com/api/v1/json/1/lookupevent.php?id=441613')
  }

  addBets(betslip){
    return this.db.list('/allbets').push(betslip).then((data)=>{
      console.log(data)
    })
  }
  // addBets(betslip){
  //   return this.firestore.collection('allbets').add(betslip).then(data=>console.log(data),err=>console.log(err))
  // }
  getDatas(){
    return this.db.list('/allbets').valueChanges()
  }
  getData(){
    return this.firestore.collection('/allbets').snapshotChanges()
  }
}
