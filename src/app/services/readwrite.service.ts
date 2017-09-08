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

    public registercurrentuser():any {
        //save stuff locally
        this.dbuserinfoservice.userinfo.privateinfo.email = this.firebaseauthservice.angularfireauth.auth.currentUser.email;
        //prepare for creating a new user on Firebase
        let temp_value : any = {};
        let temp_ref:string = "/users/"+this.firebaseauthservice.angularfireauth.auth.currentUser.uid;
        temp_value = this.dbuserinfoservice.userinfo;
        console.log(temp_value);
        console.log(temp_ref);
        return this.simplyset(temp_ref,temp_value);
    }

    public simplyset(ref:string,value:any):any{
        this.firebaseitem = this.firebaseauthservice.angularfiredatabase.object(ref);
        return this.firebaseitem.set(value)
        .then((response)=>{
            console.log("simplyset response:");
            console.log(response);
        })
        .catch((error)=>{
            console.log("simplyset error:");
            console.log(error.message);
            console.log(error);
        });
    }

    public simplyupdate(ref:string,value:any):any{
        this.firebaseitem = this.firebaseauthservice.angularfiredatabase.object(ref);
        return this.firebaseitem.update(value)
        .then((response)=>{
            console.log("simplyupdate response:");
            console.log(response);
        })
        .catch((error)=>{
            console.log("simplyupdate error:");
            console.log(error.message);
            console.log(error);
        });
    }

    public simplyget(ref:string):any{
        return this.firebaseauthservice.angularfiredatabase.object(ref)
    }

}