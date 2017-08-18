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
        home : "not-connected",//=equivalent of www.blabla.com/"" or ""-path
        signinup : "not-connected",
        decouvrirlunchtime : "not-connected",
        lesactus : "not-connected",
        quisommesnous : "not-connected",
        introuvable : "not-connected",
        beneficiaire : "not-connected",
        monplanning : "beneficiaire",
        jefaislepoint : "beneficiaire",
        jeprendsrendezvous :"beneficiaire",
        jeprepapremarencontre: "beneficiaire",
        jefaislesuivi: "beneficiaire",
        jeconstruismonprojet: "not-connected"
    };

    loggedIn : boolean= true;

    public updatecurrentauthstate ():void {
        if (this.dbuserinfoservice.userinfo.publicinfo.status !== "") {
            //console.log("connected: ");
            this.currentauthstate = this.dbuserinfoservice.userinfo.publicinfo.status;
        }else{
            //console.log("not connected");
            this.currentauthstate = "not-connected";
        }
        console.log("currentauthstate: "+ this.currentauthstate);
    }

    isAuthenticated (route) {
        //console.log("this.activatedroute");
        //console.log(this.activatedroute.toString());
        //console.log("route.parent");
        //console.log(route);
        if (route === "") { route = "home"; }//if route is set to "", set the path to "home" (as there could be no empty value "" for this route)

        const promise = new Promise(
            (resolve, reject) => {
                let allow : boolean=false;
                
                this.updatecurrentauthstate ();
                //console.log("route: "+route.replace("/",""));                
                //console.log("this.paths[route]: "+this.paths[route]);
                allow = this.paths[route]===this.currentauthstate ? true : false
                
                /*TEMPORARY WITHOUT INTERNET
                allow = true;
                */
                resolve(allow);
            }
        )
        return promise;
    }

    ngOnInit() {
        this.currentauthstate = "not-connected";
    }

}