import * as firebase from 'firebase';

//Handles Firebase authentication 

export class FirebaseauthService {
    token : string = "";

    signupUser(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);//promise is returned to component which uses method
    }

    signinUser(email:string, password:string) {
        return firebase.auth().signInWithEmailAndPassword(email, password);//promise is returned to component which uses method
    }

    //Says if connected user there
    signOut() {
        firebase.auth().signOut();
        this.token = "";
    }

    //Saves the Firebase token
    setToken() {
        firebase.auth().currentUser.getIdToken()
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