import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  redirectUrl: string;
  constructor(public auth: AngularFireAuth, private router: Router, private toastr: ToastrService, private db: AngularFireDatabase) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        console.log(this.user);
        localStorage.setItem('user', JSON.stringify(this.user));
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
  signOut() {
    return this.auth.auth.signOut().then(() => {
      localStorage.setItem('user', JSON.stringify(null));
      localStorage.removeItem('user');
      this.router.navigateByUrl('');
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
    const user = JSON.parse(localStorage.getItem('user'));
    return user != null;
  }
}
