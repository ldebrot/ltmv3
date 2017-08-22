import { Injectable } from '@angular/core';

//Firebase
import * as firebase from 'firebase';

//Home-grown
import { ReadwriteService } from './readwrite.service';
import { DbuserinfoService } from './dbuserinfo.service';

@Injectable()
export class ReadwritebufferService {
    
    private buffer:any = {};

    constructor(
        public dbuserinfoservice: DbuserinfoService,
        public readwriteservice : ReadwriteService
    ) {}

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

    public transmitbuffer():void{
        let usersexperienceprefix:string = "users/"+ firebase.auth().currentUser.uid+"/experience/";
        let updates = {};
        for (let i = 0; i < Object.keys(this.buffer).length; i++) {
            //console.log(usersexperienceprefix+Object.keys(this.buffer)[i]);
            //console.log(this.buffer[Object.keys(this.buffer)[i]].value);
            if (this.buffer[Object.keys(this.buffer)[i]].value==="" || this.buffer[Object.keys(this.buffer)[i]].value===undefined){
                updates[usersexperienceprefix+Object.keys(this.buffer)[i]]=JSON.parse(JSON.stringify(""));
            } else {
                updates[usersexperienceprefix+Object.keys(this.buffer)[i]]=JSON.parse(JSON.stringify(this.buffer[Object.keys(this.buffer)[i]].value));
            }
        }
        console.log("updates");
        console.log(updates);
        firebase.database().ref().update(updates)
        .then( function() {
                console.log("transmitbuffer: worked just fine!");
                this.emptybuffer();//empty buffer now !
                this.readwriteservice.getcurrentuserinfo()//now refresh local dbuserinfo
                    .then ((userinfo)=> {
                        this.dbuserinfoService.integrate(userinfo)
                    });
        })
        .catch( function(error) {
                console.log("transmitbuffer error: "+error.message);
        });
    }

}

                /*
                //WE HAD TROUBLE WITH THE JSON PARSER, SHOULD BE FINE NOW
                //THIS WAS PART OF transmitbuffer()
                console.log(this.buffer[Object.keys(this.buffer)[i]].value);
                try {
                    JSON.parse(JSON.stringify(this.buffer[Object.keys(this.buffer)[i]].value));
                } catch (e) {
                    console.log("hell of an erreur!");
                    console.log(e);
                    console.log(this.buffer[Object.keys(this.buffer)[i]].value);
                }
                */
