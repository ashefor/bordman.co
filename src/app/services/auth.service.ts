import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  loggedInUser: Observable<any>;
  redirectUrl: string;
  constructor(public auth: AngularFireAuth, private router: Router, private toastr: ToastrService, private db: AngularFireDatabase) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        console.log(this.user);
        this.getLoggedInUserDetails(user.uid);
        localStorage.setItem('userId', JSON.stringify(this.user.uid));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  signUp(email, password) {
    return this.auth.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email, password) {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  getLoggedInUserDetails(userid) {
    this.loggedInUser  = this.db.object(`userProfiles/${userid}`).valueChanges();
  }

  logUser() {
    return this.loggedInUser;
  }
  signOut() {
    return this.auth.auth.signOut().then(() => {
      this.user = null;
      console.log(this.user);
      localStorage.setItem('userId', null);
      localStorage.removeItem('userId');
    });
  }

  createUser(username, email, password) {
    return new Promise((resolve, reject) => {
      this.db.database.ref('userProfiles').orderByChild('displayName').equalTo(username).once('value').then((snapshot) => {
        const data = snapshot.val();
        if (data === null) {
          this.signUp(email, password).then(value => {
            const user = value.user;
            const newUser = {
              displayName: username,
              userId: user.uid,
              userEmail: user.email
            };
            this.db.list('userProfiles').set(user.uid, newUser).then(() =>
              resolve(value));
          }).catch(err => {
            reject(err);
          });
        } else {
          reject('username is unavailable');
        }
      });
    });
  }

  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('userId'));
    return user != null;
  }
}
