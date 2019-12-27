import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SportsService {

  constructor(public http: HttpClient,
              private db: AngularFireDatabase, private firestore: AngularFirestore, private toastr: ToastrService) { }

  // postData(){
  //   return this.http.get('https://bord-manbets.firebaseio.com/allbets')
  // }
  // getSports(){
  //   return this.http.get(`${environment.sportsDB}search_all_leagues.php?c=spain`)
  // }
  getSchedules(leagueId) {
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.sportsDB}eventsnextleague.php?id=${leagueId}`).subscribe((data) => {
        if (data) {
          resolve(data);
        } else {
          reject(data);
        }
      }, error => {
        reject(error);
        this.toastr.error('An errror has occured');
      });
    });
  }
  getSchedule() {
    return forkJoin([this.http.get(`${environment.sportsDB}eventsnextleague.php?id=4334`),
    this.http.get(`${environment.sportsDB}eventsnextleague.php?id=4328`),
    this.http.get(`${environment.sportsDB}eventsnextleague.php?id=4331`),
    this.http.get(`${environment.sportsDB}eventsnextleague.php?id=4332`),
    this.http.get(`${environment.sportsDB}eventsnextleague.php?id=4335`)]);
  }

  getReference = () => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 7; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  addBets(betslip) {
    const userid = JSON.parse(localStorage.getItem('user'));
    const pushId = this.db.createPushId();
    // const item = {...betslip, id: pushId};
    const ticket = {
      id: pushId,
      match: betslip.match,
      outcome: betslip.outcome,
      stake: betslip.stake,
      creatorId: userid.uid,
      createdAt: betslip.createdAt
    };
    const userticket = {
      ticketId: pushId,
      outcome: betslip.outcome,
      stake: betslip.stake,
      createdAt: betslip.createdAt
    };
    // return this.db.list(`usertickets/${userid.uid}`).push(betslip).then(res => console.log(res));
    // return this.db.list('tickets').push(betslip).then(res => {
    //   return this.db.list(`usertickets/${userid.uid}`).set(res.key, {ticketID: res.key});
    //   // return this.db.list(`usertickets/${userid.uid}`).set('.', res.key);
    // });
    return this.db.list('tickets').set(ticket.id, ticket).then(() => {
      return this.db.list(`usertickets/${userid.uid}`).set(ticket.id, {...userticket});
    });
    // return this.db.object('tickets').set(betslip);
  }
  // addBets(betslip){
  //   const userid = JSON.parse(localStorage.getItem('user'));
  //   return this.firestore.collection('tickets').doc(userid.uuid).collection('').add(betslip);
  // }
  getAllBetsDatas() {
    const userid = JSON.parse(localStorage.getItem('user'));
    return this.db.list('tickets').valueChanges();
  }
  getAllBets() {
    const userid = JSON.parse(localStorage.getItem('user'));
    return this.db.list(`/allbets/${userid.uid}`).valueChanges();
  }
  // getAllCompetitions(){
  //   return this.http.get('http://api.football-data.org/v2/competitions/2021/matches?status=SCHEDULED&dateFrom=2019-10-19&dateTo=2019-10-21')
  // }
}
