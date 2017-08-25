//This service checks whether the route path is accessible according to the current auth state (whether the user is connected and if so, as a temoin or a benficiaire )

//Built-in stuff:
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

//Hand-made
import { DbuserinfoService } from './dbuserinfo.service';

//Firebase
import * as firebase from 'firebase';


@Injectable()
export class CheckauthService implements OnInit{
    
    constructor(
        private dbuserinfoservice : DbuserinfoService,
        private activatedroute : ActivatedRoute
    ) {
        
    }

    public currentauthstate : string;

    //There are three available options: "not-connectd", "temoin" and "beneficiaire"
    //There can be only one value per path (because of the lack of IndexOf on IE...)
    public paths:any = { 
        notconnected : ["","signinup","decouvrirlunchtime","lesactus","quisommesnous","introuvable"],
        beneficiaire : ["beneficiaire","monplanning","jefaislepoint","jeconstruismonprojet","jeconstruismonprojet/:step","jeconsultemonbilan","jeprendsrendezvous","jepreparemarencontre","jefaislesuivi"]
    };
    

    loggedIn : boolean= true;

    public updatecurrentauthstate ():void {
        if (this.dbuserinfoservice.userinfo.publicinfo.status !== "") {
            //console.log("connected: ");
            this.currentauthstate = this.dbuserinfoservice.userinfo.publicinfo.status;
        }else{
            //console.log("not connected");
            this.currentauthstate = "notconnected";
        }
        console.log("currentauthstate: "+ this.currentauthstate);
    }

    isAuthenticated (route) {
        //console.log("this.activatedroute");
        //console.log(this.activatedroute.toString());
        //console.log("route.parent");
        //console.log(route);

        const promise = new Promise(
            (resolve, reject) => {
                let allow : boolean=false;
                
                this.updatecurrentauthstate ();
                //console.log("route: "+route.replace("/",""));                
                //console.log("this.paths[route]: "+this.paths[route]);
                console.log("route");
                console.log(route);

                for (let i = 0; i < this.paths[this.currentauthstate].length;i++) {
                    if (this.paths[this.currentauthstate][i]===route) {allow = true;}                    
                }
                
                /*TEMPORARY WITHOUT INTERNET
                allow = true;
                */
                resolve(allow);
            }
        )
        return promise;
    }

    ngOnInit() {
        this.currentauthstate = "notconnected";
    }

}