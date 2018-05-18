import { Subject } from 'rxjs';

//This service handles the local copy of the user information (copied from firebase)
import { OnInit, Injectable } from '@angular/core';

//Firebase service
import * as firebase from 'firebase/app';

@Injectable()
export class DbuserinfoService {

    public currentuserid : string;
    private meetings: object;
    private privateinfo: object;
    private publicinfo: object;
    private mobile:number;
    private email:string;
    private birthdate:string;
    private comment:string;
    private firstname:string;
    private surname:string;
    private twitter_followme:boolean;
    private twitter_id:string;
    private linkedin_followme:boolean;
    private linkedin_url:string;
    private status:string;
    public userinfoloadedobservable : Subject<boolean> = new Subject();

    constructor(
    ) {
    }

    //This gives a general structure, 
    public userinfo : any = {
        loaded : false,
        privateinfo : {
            email: "",
            mobile : "",
            birthdate: ""
        },
        publicinfo : {
            firstname : "",
            surname: "",
            twitter_followme : "",
            twitter_id: "",
            linkedin_followme : "",
            linkedin_url : "",
            status: ""
        },
        experience : {
        },
        meetings : {
        }
    }

    //This function cleans the userinfo, setting all values to ""
    public empty():void {
        for (var key in this.userinfo) {
            let userinfosublevel:object = this.userinfo[key];
            for (var subkey in userinfosublevel) {
                this.userinfo[key][subkey] = "";
                //console.log("key: "+key+" / subkey: "+ subkey+" cleaned!");
            }
        }
    }

    //This function sets the default (starting) values for newly registered users
    public setstartvalues():void {
    }

    //This function integrates the values passed in the inputobject into the userinfo object, which is available as a service. The inputobject usually comes from firebase.
    public integrate(inputobject:object):void {
        //loop through keys of userinfo object
        console.log("here I am!");
        console.log(inputobject);
        for (var key in this.userinfo) {
            if (
                this.userinfo.hasOwnProperty(key)
                && inputobject.hasOwnProperty(key)//check if inputobject has this key as well
            ) {
                //console.log("both have key '"+key+"'");
                //loop through subkeys of userinfo object
                let userinfosublevel:object = this.userinfo[key];//key as object
                let subkeycount:number = 0;
                for (var subkey in userinfosublevel) {
                    if (
                        userinfosublevel.hasOwnProperty(subkey)
                        && inputobject[key].hasOwnProperty(subkey)
                    ) {
                        //console.log("both have subkey '"+subkey+"'");
                        this.userinfo[key][subkey] = inputobject[key][subkey];
                        subkeycount++;
                    }
                }
                if(subkeycount===0) {//this means they only have the key in common (therefore no common subkey)
                    this.userinfo[key] = inputobject[key];
                } else {
                    //console.log("Saved "+subkeycount+" items in dbuserinfoservice!");
                }
            }
        }
        this.announceendofloading();
        console.log("this.userinfo is now :");
        console.log(this.userinfo);
    }

    public announceendofloading():void{
        this.userinfoloadedobservable.next(true);
        this.userinfo.loaded = true;
    }


}