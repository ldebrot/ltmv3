import { Subscription } from 'rxjs/Rx';
import { Injectable, OnDestroy } from '@angular/core';
import { DbuserinfoService } from './dbuserinfo.service';

//Firebase service
import * as firebase from 'firebase/app';
import { FirebaseauthService } from './firebaseauth.service';
import { AngularFireObject } from 'angularfire2/database';


@Injectable()
export class ReadwriteService implements OnDestroy{


//    public firebaseitem : FirebaseObjectObservable<any>;
    public firebaseitem : AngularFireObject<any>;
    public firebaseitemsubscription : Subscription;
    public simplygetsubscription : Subscription;

    constructor(
        public dbuserinfoservice: DbuserinfoService,
        public firebaseauthservice : FirebaseauthService
    ) {}

    ngOnDestroy () {
        this.simplygetsubscription.unsubscribe();
    }

    public getcurrentuserinfo():any{
        let ref:string = "/users/"+ this.firebaseauthservice.angularfireauth.auth.currentUser.uid+"/";
        console.log("//getcurrentuserinfo// userprefix:" + ref);
        this.firebaseitem = this.firebaseauthservice.angularfiredatabase.object(ref);
    }

    public tryme():any{
    }

    public registercurrentuser(status:string):any {
        let temp_promises : any[]=[];
        //save stuff locally
        this.dbuserinfoservice.userinfo.privateinfo.email = this.firebaseauthservice.angularfireauth.auth.currentUser.email;
        //prepare for creating a new user on Firebase
        let temp_ref:string;
        let temp_value : any = {}
        console.log(temp_value);
        console.log(temp_ref);
        //register user in /users/ folder
        temp_promises[0] = new Promise ((resolve,reject)=>{
            temp_ref = "/users/"+this.firebaseauthservice.angularfireauth.auth.currentUser.uid;
            temp_value = this.dbuserinfoservice.userinfo;
            this.simplyset(temp_ref,temp_value)
            .then(()=>{
                resolve()
            })
            .catch((error)=>{
                console.log("registeruser - temp_promises 0 : error!");
                console.log(error);
            });
        }); 
        //register user in /users/userids folder
        temp_promises[1] = new Promise ((resolve,reject)=>{
            temp_ref = "/useruids/"+status;
            temp_value = {};
            temp_value[this.firebaseauthservice.angularfireauth.auth.currentUser.uid]="okay";
            this.simplyupdate(temp_ref,temp_value)
            .then(()=>{
                resolve()
            })
            .catch((error)=>{
                console.log("registeruser - temp_promises 1 : error!");
                console.log(error);
            });
        }); 
        
        return Promise.all(temp_promises).
        then(()=>{
            console.log("registercurrentuser : done!");
        });        
    }

    public simplyset(ref:string,value:any):any{
        this.firebaseitem = this.firebaseauthservice.angularfiredatabase.object(ref);
        return this.firebaseitem.set(value)
        .then((response)=>{
            if(response!==undefined){
                console.log("simplyset response:");
                console.log(response);
            }
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
            if(response!==undefined){
                console.log("simplyupdate response:");
                console.log(response);
            }
        })
        .catch((error)=>{
            console.log("simplyupdate error:");
            console.log(error.message);
            console.log(error);
        });
    }

    public simplygetsnapshot(ref:string, callback:any):any{
        this.firebaseitem = this.firebaseauthservice.angularfiredatabase.object(ref);
        return this.simplygetsubscription = this.firebaseitem.snapshotChanges().subscribe(snapshot=>{
            callback(snapshot.payload.val());
        });
    }

}