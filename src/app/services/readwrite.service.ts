import { Injectable } from '@angular/core';
import { DbuserinfoService } from './dbuserinfo.service';
//Firebase service
import * as firebase from 'firebase';

@Injectable()
export class ReadwriteService {
    
    constructor(
        private dbuserinfoservice: DbuserinfoService
    ) {}

    public getcurrentuserinfo():any{
        let ref:string = "users/"+ firebase.auth().currentUser.uid+"/";
        console.log("GETCURRENTUSERINFO");
        console.log("userprefix:" + ref);
        return firebase.database().ref(ref).once('value')
        .then(function(snapshot) {
            return snapshot.val();
        })
        .catch(function(error) {
            console.log("readcurrentuser error: "+error.message);
        });
    }

    public readcurrentuser(ref:string,child:string):any{
        let userprefix:string = "users/"+ firebase.auth().currentUser.uid+"/";
        console.log("READCURRENTUSER");
        console.log("userprefix + ref:" + userprefix + ref);
        console.log("child:" + child);
        return firebase.database().ref(userprefix + ref).once('value')
        .then(function(snapshot) {            
            if (child !== "") {
                console.log("get child...");
                console.log(snapshot.child(child).val());
                return snapshot.child(child).val();
            } else {
                console.log("get snapshot without the kids...");
                console.log(snapshot.val());
                return snapshot.val();
            }
        })
        .catch(function(error) {
            console.log("readcurrentuser error: "+error.message);
        });
    }

    public registercurrentuser(firstname:string,surname:string):void {
        let ref:string = "users/"+ firebase.auth().currentUser.uid;//get current uid from firebase
        this.dbuserinfoservice.empty();
        this.dbuserinfoservice.setstartvalues();
        this.dbuserinfoservice.userinfo.publicinfo.firstname = firstname;
        this.dbuserinfoservice.userinfo.publicinfo.surname = surname;
        this.dbuserinfoservice.userinfo.privateinfo.email = firebase.auth().currentUser.email;
        let value:any = this.dbuserinfoservice.userinfo;
        console.log("ref:" + ref);
        console.log("value:");
        console.log(value);
        firebase.database().ref(ref).set(JSON.parse(JSON.stringify(value)))//stringify because 'value' is a JS object, not a JSON 
        .then( function() {
            console.log("readwrite: registered user");
        })
        .catch( function(error) {
            console.log("readwrite: error happened: "+error.message);
        });
    }
}