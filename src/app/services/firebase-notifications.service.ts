import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class FirebaseNotificationsService {

  messaging = firebase.messaging();
  alert = new BehaviorSubject(null);
  constructor(private afMessaging: AngularFireMessaging, private db: AngularFireDatabase, private afAuth: AngularFireAuth,
              private toastr: ToastrService) {
    // this.messaging.usePublicVapidKey('BFk4uyW_nqtuv746odkEWQIzjv5PiBRcwMw3W-Nr7tR05E6zFwBSiSPJr6jrdJ4_ZKJG8ec1MxJ3nI3nqtKSJjE');

    // this.afMessaging.messages.subscribe((messages: any) => {
    //   messages.onMessage = messages.onMessage.bind(messages);
    //   messages.onTokenRefresh = messages.onTokenRefresh.bind(messages);
    // });
  }

  requestPerm() {
    Notification.requestPermission().then(() => {
      console.log('Permission Granted');
    }, error => {
      console.log('error occured');
    });
  }

  updateToken(token) {
    this.afAuth.authState.pipe(take(1)).subscribe((user) => {
      if (!user) {
        return;
      } else {
        const data = { [user.uid]: token};
        this.db.object('fcmTokens').update(data);
      }
    });
  }

  getPermission() {
    Notification.requestPermission().then(() => {
      return this.messaging.getToken();
    }).then((token) => {
      console.log(token);
      this.updateToken(token);
    }).catch((err) => {
      console.log('Unable to get permission to notify.', err);
    });
    // this.afMessaging.requestToken.subscribe(token=> {
    //   console.log(token);
    //   this.updateToken(token);
    // },err => {
    //   console.log('Unable to get permission to notify.', err);
    // })
  }

  receiveMsg() {
    this.messaging.onMessage(payload => {
      console.log('message sent', payload);
      this.alert.next(payload);
      this.toastr.success(payload.notification.body);
    });
    // this.afMessaging.messages.subscribe((payload) => {
    //   console.log('new message', payload);
    //   this.alert.next(payload);
    // })
  }
}
