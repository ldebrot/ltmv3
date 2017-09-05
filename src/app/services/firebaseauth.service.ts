//Handles Firebase authentication and more
import { Injectable } from '@angular/core';

//Firebase
import { AngularFireDatabase,  } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseauthService {
    token : string = "";

    constructor(
        public angularfiredatabase: AngularFireDatabase,
        public angularfireauth: AngularFireAuth
    ){
    }

    signupUser(email: string, password: string) {
        return this.angularfireauth.auth.createUserWithEmailAndPassword(email, password);//promise is returned to component which uses method
    }

    signinUser(email:string, password:string) {
        return this.angularfireauth.auth.signInWithEmailAndPassword(email, password);//promise is returned to component which uses method
    }

    //Says if connected user there
    signOut() {
        this.angularfireauth.auth.signOut();
        this.token = "";
    }

    //Saves the Firebase token
    setToken() {
        this.angularfireauth.auth.currentUser.getIdToken()
            .then(
                (token: string) => {
                    this.token = token;
                    //console.log("token set: "+token);
                }
            )
    }

    //Says if connected user there
    isAuthenticated() {
        return this.token != "";
    }

}
