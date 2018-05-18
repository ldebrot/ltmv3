
import { Subscription } from 'rxjs/Rx';
import { Injectable, OnDestroy } from '@angular/core';

//Home-grown
import { ReadwriteService } from './readwrite.service';

@Injectable()
export class ReadwriteprescoreService implements OnDestroy {
    public buffer:any = {};

    constructor(
        public readwriteservice : ReadwriteService
    ) {}

    ngOnDestroy() {
    }

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
        let temp_promises : any = [];
        temp_bufferkeys.forEach((value, index) => {
            let temp_promise = new Promise((resolve,reject)=>{
                this.saveprescore(value, this.prescorebuffer[value]["userid"], this.prescorebuffer[value]["value"])
                .then(()=>{
                    resolve();
                });
            });
            temp_promises.push(temp_promise)
        });

        //return promise when all resolved
        return Promise.all(temp_promises)
        .then(()=>{
            console.log("transmitprescorebuffer: we're done!");
        });

    }

    public saveprescore(prescorename, userid, value):any {
        if (prescorename == null || userid == null || value == null) {
            console.log("updatebuffer/prescores: error: prescorename, userid or value is null, did not update buffer");
        } else {
            let ref_prefix : string = "prescores/"+prescorename;
            let temp_object : object = {};
            temp_object[userid] = value;

            console.log("shit happens here?")
            console.log(ref_prefix);
            console.log(temp_object);

            let temp_promises : any;
            temp_promises = new Promise((resolve,reject)=>{
                this.readwriteservice.simplyupdate(ref_prefix, temp_object)
                .then(()=>{
                    console.log("saveprescore ref: "+ref_prefix);
                    console.log(temp_object);
                    resolve();
                });
            });
            
            return Promise.all(temp_promises)
            .then(()=>{
                console.log("updatebuffer/prescores: prescore saved!");
            });
    
        }
    }

}
