import { Injectable } from '@angular/core';
import { DbuserinfoService } from './dbuserinfo.service';
//Firebase service
import * as firebase from 'firebase';

@Injectable()
export class ReadwriteService {

    constructor(
        public dbuserinfoservice: DbuserinfoService
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

    public simplyset(ref:string,value:any):any{
        return firebase.database().ref(ref).set(value);
    }

    public simplyonce (ref:string,type:string):any{
        return firebase.database().ref(ref).once(type)
        .then(function(this, snapshot) {
            return snapshot.val();
        });
    }

    public getcurrentusermeetings(status:string):any{
        //make a list of all meeting ids of the 
        let temp_meetings : object = {};
        let temp_meetinglist : string[] = [];
        let temp_promises : any[] = [];
        for (let i = 0; i < Object.keys(this.dbuserinfoservice.userinfo.meetings).length; i++){
            if (this.dbuserinfoservice.userinfo.meetings[Object.keys(this.dbuserinfoservice.userinfo.meetings)[i]].status===status){
                temp_meetinglist.push(Object.keys(this.dbuserinfoservice.userinfo.meetings)[i]);
            }
        };

        //prepare promises used for firebase operations
        for (let i:number = 0; i < temp_meetinglist.length;i++){
            temp_promises.push(this.simplyonce("/meetings/"+temp_meetinglist[i],'value'));
        }
        console.log("temp_promises");
        console.log(temp_promises);
        //Launch all firebase operations
        return Promise.all(temp_promises)
        .then((input)=>{
            //input holds firebase snapshot in an array
            console.log(input);
            console.log("done");
            return input;
        });
    }



}