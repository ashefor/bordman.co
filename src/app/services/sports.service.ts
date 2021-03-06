import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, BehaviorSubject } from 'rxjs';
import { userProfile } from '../models/userProfile';
import { tickets } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class SportsService {
  public availableBets = new BehaviorSubject(null);
  constructor(public http: HttpClient,
              private db: AngularFireDatabase, private toastr: ToastrService) { 
                this.getAllBetsDatas();
              }

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
    // const userid = JSON.parse(localStorage.getItem('userId'));
    const pushId = this.db.createPushId();
    const ticket = {...betslip,  id: pushId};
    ticket.player1.ticketId = pushId;
    return this.db.list('tickets').set(ticket.id, ticket);
  }

  addUserToBet(betslip, betOutcome) {
    const user: userProfile = JSON.parse(localStorage.getItem('userDetails'));
    const ticket = {
      outcome: betOutcome,
      stake: betslip.openingStake,
      userId: user.userId,
      userEmail: user.userEmail,
      userName: user.displayName,
      createdAt: Date.now(),
      ticketId: betslip.id
    };
    return this.db.list(`triggers/JOINBETS/`).set(user.userId, {...ticket});
  }

  getAllBetsDatas() {
    const userid = JSON.parse(localStorage.getItem('userId'));
    return new Promise((resolve, reject) => {
      this.db.list('tickets').valueChanges().subscribe(data => {
        if (data) {
          this.availableBets.next(data);
          resolve(data);
        } else {
          reject(data);
        }
      }, error => {
        reject(error);
      });
    });
    // return this.db.list('tickets').valueChanges()
    // return new Promise((resolve, reject) => {
    //   this.db.list('tickets').snapshotChanges(['child_added']).subscribe(actions => {
    //     const newarr = actions.map(action => action.payload.val());
    //     resolve(newarr);
    // });
    // });
  }
  viewSingleTicket(ticketId) {
    return this.db.object(`tickets/${ticketId}`).valueChanges();
  }
  getAllBets() {
    const userid = JSON.parse(localStorage.getItem('user'));
    return this.db.list(`/allbets/${userid.uid}`).valueChanges();
  }
  // getAllCompetitions(){
  //   return this.http.get('http://api.football-data.org/v2/competitions/2021/matches?status=SCHEDULED&dateFrom=2019-10-19&dateTo=2019-10-21')
  // }
}
