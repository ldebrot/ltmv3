import * as firebase from 'firebase';

export class AuthService {

    signupUser(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }

}
