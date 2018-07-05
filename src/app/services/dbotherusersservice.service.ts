
import { Injectable } from '@angular/core';

//Home-grown
import { ReadwriteService } from './readwrite.service';
import { AnonymousSubscription } from 'rxjs/Subscription';

@Injectable()
export class DbotherusersService {
    public buffer:any = {};
    
    constructor(
        public readwriteservice : ReadwriteService
    ) {}

    public getpublicinfovalue_fromlocaldb(userid:string, variablename?:string):any {
        let temp_response_object : any = {};
        let temp_response_value : any;
        if (typeof userid !== "undefined" && userid != "" && userid != null) {
            if (Object.keys(this.dbotherusers).includes(userid)){
                temp_response_object = {};
                Object.keys(this.dbotherusers[userid].publicinfo).forEach((currentkey)=>{
                    if (typeof variablename != "undefined" && variablename != "" && variablename != null){
/*
                        console.log("String(currentkey.trim()) == variablename.trim()");
                        console.log(String(currentkey.trim()) == variablename.trim());
                        console.log("currentkey");
                        console.log(currentkey);
                        console.log("variablename");
                        console.log(variablename);
                        console.log("typeof currentkey");
                        console.log(typeof currentkey);
                        console.log("typeof variablename");
                        console.log(typeof variablename);
*/
                        if (String(currentkey) == variablename){
                            temp_response_value = this.dbotherusers[userid].publicinfo[currentkey];
                        }
                    }
                    temp_response_object[currentkey] = this.dbotherusers[userid].publicinfo[currentkey];
                });
            } else{
                console.log("getpublicinfouser_fromlocaldb: ERROR, userid is not present in local user db!");
                temp_response_object = false;
            }
        } else {
            console.log("getpublicinfouser_fromlocaldb: ERROR, userid is empty!");
            temp_response_object = false;
        }
        if (typeof variablename != "undefined" && variablename != "" && variablename != null){
            return temp_response_value;            
        } else {
            return temp_response_object;            
        }
    }

    public getpublicinfovalue_fromfirebase(userids:string[]):any {
        let temp_promises_gpivffb = [];
        let temp_ref = "";

        userids.forEach((value_userid, index)=>{
            temp_promises_gpivffb[index] = new Promise(
                (resolvegpivffb, reject) => {
                    temp_ref = "users/" + value_userid + "/publicinfo"
                    this.readwriteservice.simplygetsnapshot(temp_ref, (publicinfoofuser)=>{
                        this.integratepublicinfo(value_userid,publicinfoofuser);
                        //console.log("resolve promise:getpublicinfovalue_fromfirebase"+index)
                        resolvegpivffb("getpublicinfovalue_fromfirebase");
                    });
                });    
        });

        return Promise.all(temp_promises_gpivffb)
        .then(()=>{
            console.log("resolve promise:getpublicinfovalue_fromfirebase END", userids)
        });
    }

    public integratepublicinfo(userid:string, publicinfo:any):void {
        //updates other users only if not already in local DB
        if (!Object.keys(this.dbotherusers).includes(userid)){
            this.dbotherusers[userid] = {};
            this.dbotherusers[userid].publicinfo = {};
            Object.keys(publicinfo).forEach((currentkey)=>{
                console.log("currentkey");
                console.log(currentkey);
                console.log("publicinfo[currentkey]");
                console.log(publicinfo[currentkey]);
                this.dbotherusers[userid].publicinfo[currentkey] = publicinfo[currentkey];
            });
        }
    }

    public dbotherusers = {};

}
