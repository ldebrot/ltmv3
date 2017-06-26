import * as firebase from 'firebase';

export class AuthService {

    signupUser(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);//promise is returned to component which uses method
    }

    signinUser(email:string, password:string) {
        return firebase.auth().signInWithEmailAndPassword(email, password);//promise is returned to component which uses method
    }
}
