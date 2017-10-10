import { Component } from '@angular/core';
//import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: Observable<any>;
  itemsToAdd: AngularFireList<any>;
  name: any;
  msgVal: string = '';


  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.items = db.list('messages').valueChanges();
    this.itemsToAdd = db.list('messages');

    this.name = afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInAnonymously();
  }

  Send(desc: string) {
    this.itemsToAdd.push({ message: desc });
    this.msgVal = '';
  }
}