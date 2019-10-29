import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User
  constructor(public auth: AngularFireAuth, private router: Router) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        console.log(this.user)
        localStorage.setItem('user', JSON.stringify(this.user))
      } else {
        localStorage.setItem('user', null)
      }
    })
  }

  signUp(username, email, password) {
    this.auth.auth.createUserWithEmailAndPassword(email, password).then((value) => {
      if (value) {
        console.log(value)
        this.router.navigateByUrl('/')
        return value.user.updateProfile({
          displayName: username
        })
      }
    }).catch((err: HttpErrorResponse) => {
      console.log(err.message)
    })
  }

  signIn(email, password) {
    this.auth.auth.signInWithEmailAndPassword(email, password).then((value) => {
      console.log(value)
    }).catch((err) => {
      console.log(err.message)
    })
  }
  signOut() {
    this.auth.auth.signOut();
    this.user = null;
  }

  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user != null;
  }
}
