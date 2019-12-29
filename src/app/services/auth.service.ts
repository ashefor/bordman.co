import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
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
  constructor(public auth: AngularFireAuth, private db: AngularFireDatabase, private router: Router, private toastr: ToastrService) {
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
      // this.router.navigateByUrl('');
    });
  }

  createUser(username, email, password) {
    return new Promise((resolve, reject) => {
      this.db.list('userProfiles', ref => ref.orderByChild('displayName')
        .equalTo(username)).valueChanges().subscribe(data => {
          if (data.length) {
            reject('username exists already');
          } else {
            console.log('nothing');
            this.signUp(email, password).then(value => {
              const user = value.user;
              const newUser = {
                displayName: username,
                userId: user.uid,
                userEmail: user.email
              };
              this.db.list('userProfiles').set(user.uid, newUser).then(() =>
                resolve(data));
            }).catch(err => {
              reject(err);
            });
          }
        }, err => {
          reject(err);
        });
    });
  }

  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user != null;
  }
}
