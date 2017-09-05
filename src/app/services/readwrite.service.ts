import { Subscription } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { DbuserinfoService } from './dbuserinfo.service';

//Firebase service
import * as firebase from 'firebase/app';
import { FirebaseObjectObservable } from "angularfire2/database";
import { FirebaseauthService } from './firebaseauth.service';


@Injectable()
export class ReadwriteService {

    public firebaseitem : FirebaseObjectObservable<any>;
    public firebaseitemsubscription : Subscription;

    constructor(
        public dbuserinfoservice: DbuserinfoService,
        public firebaseauthservice : FirebaseauthService
    ) {}


    public getcurrentuserinfo():any{
        let ref:string = "/users/"+ this.firebaseauthservice.angularfireauth.auth.currentUser.uid+"/";
        console.log("//getcurrentuserinfo// userprefix:" + ref);
        this.firebaseitem = this.firebaseauthservice.angularfiredatabase.object(ref);
    }

    public tryme():any{
    }

    public registercurrentuser(firstname:string,surname:string):any {
        //save stuff locally
        this.dbuserinfoservice.empty();
        this.dbuserinfoservice.setstartvalues();
        this.dbuserinfoservice.userinfo.publicinfo.firstname = firstname;
        this.dbuserinfoservice.userinfo.publicinfo.surname = surname;
        this.dbuserinfoservice.userinfo.privateinfo.email = this.firebaseauthservice.angularfireauth.auth.currentUser.email;
        //prepare for creating a new user on Firebase
        let temp_value : any = {};
        let temp_ref:string = "/users/";
        temp_value[this.firebaseauthservice.angularfireauth.auth.currentUser.uid] = this.dbuserinfoservice.userinfo;
        console.log(temp_value);
        console.log(temp_ref);
        //CANNOT USE ANGULARFIRE2
        return this.simplyupdate(temp_ref,JSON.parse(JSON.stringify({momo:{momo:"123",momoomo:"13545"}})))
//        return this.simplyupdate(temp_ref,temp_value)
        .then(()=>{
            console.log("readwrite: registered user");
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    public simplyonce (ref:string,type:string):any{
        this.firebaseitem = this.firebaseauthservice.angularfiredatabase.object(ref);
    }

    public simplyset(ref:string,value:any):any{
        this.firebaseitem = this.firebaseauthservice.angularfiredatabase.object(ref);
        return this.firebaseitem.set(value);
    }

    public simplyupdate(ref:string,value:any):any{
        this.firebaseitem = this.firebaseauthservice.angularfiredatabase.object(ref);
        return this.firebaseitem.update(value);
    }

    public massiveupdate(ref:string,value:any):any{
        /*
        return firebase.database().ref(ref).set(JSON.parse(JSON.stringify(value)))//stringify because 'value' is a JS object, not a JSON 
        .then( function() {
            console.log("readwrite: registered user");
        })
        .catch( function(error) {
            console.log("readwrite: error happened: "+error.message);
        });
        */
    }


}