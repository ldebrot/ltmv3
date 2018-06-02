
import { Injectable } from '@angular/core';

//Home-grown
import { ReadwriteService } from './readwrite.service';

@Injectable()
export class DbotherusersService {
    public buffer:any = {};
    
    constructor(
        public readwriteservice : ReadwriteService
    ) {}

    public getpublicinfovalue_fromdb(userid:string, variablename:string):any {
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
                        console.log("resolve promise:getpublicinfovalue_fromfirebase"+index)
                        resolvegpivffb("getpublicinfovalue_fromfirebase");
                    });
                });    
        });

        return Promise.all(temp_promises_gpivffb)
        .then(()=>{
            console.log("resolve promise:getpublicinfovalue_fromfirebase END")
        });
    }

    public integratepublicinfo(userid:string, publicinfo:any):void {
        //updates other users only if not already in local DB
        if (!Object.keys(this.dbotherusers).includes(userid)){
            this.dbotherusers[userid] = {};
            this.dbotherusers[userid].publicinfo = publicinfo;
        }
    }

    public dbotherusers = {};

}
