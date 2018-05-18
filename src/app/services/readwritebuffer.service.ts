
import { Subscription } from 'rxjs/Rx';
import { Injectable, OnDestroy } from '@angular/core';

//Firebase
import * as firebase from 'firebase/app';

//Home-grown
import { ReadwriteService } from './readwrite.service';
import { DbuserinfoService } from './dbuserinfo.service';
import { FirebaseauthService } from './firebaseauth.service';

@Injectable()
export class ReadwritebufferService implements OnDestroy {
    public firebaseitemsubscription : Subscription;
    public buffer:any = {};

    constructor(
        public dbuserinfoservice: DbuserinfoService,
        public readwriteservice : ReadwriteService,
        public firebaseauthservice: FirebaseauthService
    ) {}

    ngOnDestroy() {
        if (this.firebaseitemsubscription!==undefined){
            this.firebaseitemsubscription.unsubscribe();
        }
    }

    public updatebuffer(objectname,value, command):void {
        if (command==="update") {
            if (this.buffer[objectname]===undefined){
                this.buffer[objectname]={};
            };
            this.buffer[objectname].value = value;
            this.buffer[objectname].command = command;
            console.log("updated buffer");
            console.log(this.buffer);
        }
    }

    public emptybuffer():void{
        this.buffer = {};
    }

    public transmitbuffer():any{
        console.log("transmitbuffer// this.buffer:");
        console.log(this.buffer);

        let ref_prefix : string = "/users/"+this.firebaseauthservice.angularfireauth.auth.currentUser.uid+"/experience/";
        let temp_object : object = {};

        for (let i = 0; i < Object.keys(this.buffer).length;i++){
            let command = this.buffer[Object.keys(this.buffer)[i]].command;
            if (command === "update") {
                temp_object[Object.keys(this.buffer)[i]] = this.buffer[Object.keys(this.buffer)[i]].value;//add to temp_object, which will be passed on to Firebase
                this.dbuserinfoservice.userinfo.experience[Object.keys(this.buffer)[i]] = this.buffer[Object.keys(this.buffer)[i]].value;//update dbuserinfo automatically
            }
        }
        console.log("saved buffer in dbuserinfo!");

        let temp_promises : any;
        temp_promises = new Promise((resolve,reject)=>{
            this.readwriteservice.simplyupdate(ref_prefix, temp_object)
            .then(()=>{
                console.log("ref: "+ref_prefix);
                console.log(temp_object);
                resolve();
            });
        });
        
        return Promise.all(temp_promises)
        .then(()=>{
            console.log("transmitbuffer done!");
            this.buffer = {};//empty buffer now!
        });
    }

}
