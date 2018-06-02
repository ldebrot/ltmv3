
import { Injectable } from '@angular/core';

//Home-grown
import { ReadwriteService } from './readwrite.service';

@Injectable()
export class ReadwriteprescoreService {
    public buffer:any = {};

    constructor(
        public readwriteservice : ReadwriteService
    ) {}

    public prescorebuffer = {};

    public emptyprescorebuffer():void{
        this.prescorebuffer = {};
    }

    public addtoprescorebuffer(prescorename, userid, value):void{
        if (prescorename == null || userid == null || value == null) {
            console.log("addtoprescorebuffer: error: prescorename, userid or value is null, did not update buffer");
        } else {
            let temp_item = {};
            temp_item["userid"] = userid;
            temp_item["value"] = value;
            this.prescorebuffer[prescorename] = temp_item;
        }
    }

    public removeprescorenamefromprescorebuffer(prescorename):void{
        this.prescorebuffer[prescorename] = null;
    }

    public transmitprescorebuffer():any{
        //prepare array of buffer keys with values to be transmitted
        let temp_bufferkeys : any = [];
        Object.keys(this.prescorebuffer).forEach ((value,index)=>{
            if (this.prescorebuffer[value] != null){
                temp_bufferkeys.push(value);
            }
        });

        //prepare array of promises to be resolved
        let temp_promises_tpb : any = [];
        temp_bufferkeys.forEach((value, index) => {
            temp_promises_tpb[index] = new Promise((resolve_tpb,reject)=>{
                this.saveprescore(value, this.prescorebuffer[value]["userid"], this.prescorebuffer[value]["value"])
                .then(()=>{
                    resolve_tpb();
                });
            });
        });

        //return promise when all resolved
        return Promise.all(temp_promises_tpb)
        .then(()=>{
            console.log("transmitprescorebuffer: we're done!");
        });

    }

    public saveprescore(prescorename, userid, value):any {
        if (prescorename == null || userid == null || value == null) {
            console.log("saveprescore: error: prescorename, userid or value is null, did not update buffer");
        } else {
            let ref_prefix : string = "prescores/"+prescorename;
            let temp_object : object = {};
            temp_object[userid] = value;

            console.log("saveprescore: Saving prescore:")
            console.log(ref_prefix);
            console.log(temp_object);

            let temp_promise_saveprescore = new Promise((resolve_saveprescore,reject)=>{
                this.readwriteservice.simplyupdate(ref_prefix, temp_object)
                .then(()=>{
                    resolve_saveprescore();
                });
            });
            
            return Promise.all([temp_promise_saveprescore])
            .then(()=>{
                console.log("updatebuffer/prescores: prescore saved!");
            });
    
        }
    }

    public getprescores(callback):any{
        return this.readwriteservice.simplygetsnapshot("prescores", callback);
    }

}
