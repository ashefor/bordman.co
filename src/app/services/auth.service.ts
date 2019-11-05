import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  redirectUrl: string;
  constructor(public auth: AngularFireAuth, private router: Router, private toastr: ToastrService) {
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

  signUp(username, email, password) {
    return this.auth.auth.createUserWithEmailAndPassword(email, password)
      .then((value) => {
        if (value) {
          console.log(value);
          this.router.navigateByUrl('/');
          return value.user.updateProfile({
            displayName: username
          });
        }
      }).catch((err: any) => {
        console.log(err.message);
        this.toastr.error(err.message);
      });
  }

  signIn(email, password) {
    return this.auth.auth.signInWithEmailAndPassword(email, password)
      .catch((err: any) => {
        console.log(err.message);
        this.toastr.error(err.message);
      });
  }
  signOut() {
    return this.auth.auth.signOut().then(() => {
      localStorage.setItem('user', JSON.stringify(null));
      localStorage.removeItem('user');
      this.router.navigateByUrl('');
    });
  }

  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user != null;
  }
}
