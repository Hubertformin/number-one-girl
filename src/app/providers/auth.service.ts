import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }
  /*
  State getter
  * */
  get state() {
    return this.afAuth.authState;
  }
  /*
  * log out
  * */
  logOut() {
    this.afAuth.auth.signOut();
  }
}
