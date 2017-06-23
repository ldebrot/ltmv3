import * as firebase from 'firebase';

export class AuthService {

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
            error => console.log(error)//this is what happens in case of an error.
        );
    }

}
