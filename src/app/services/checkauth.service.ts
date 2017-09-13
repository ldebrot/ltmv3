import { Router } from '@angular/router';
//This service checks whether the route path is accessible according to the current auth state (whether the user is connected and if so, as a temoin or a benficiaire )

//Built-in stuff:
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

//Hand-made
import { DbuserinfoService } from './dbuserinfo.service';


@Injectable()
export class CheckauthService implements OnInit{
    
    constructor(
        private dbuserinfoservice : DbuserinfoService,
        private activatedroute : ActivatedRoute,
        private router:Router
    ) {
        
    }

    public currentauthstate : string;

    //There are three available options: "not-connectd", "temoin" and "beneficiaire"
    //There can be only one value per path (because of the lack of IndexOf on IE...)
    public paths:any = { 
        notconnected : ["","signinup","decouvrirlunchtime","lesactus","quisommesnous","introuvable"],
        beneficiaire : [
            "beneficiaire","monplanning",
            "jefaislepoint",
            "jeconstruismonprojet","jeconstruismonprojet/:step",
            "jetrouvedesideesdemetier","jetrouvedesideesdemetier/:step",
            "jechoisismonnouveaumetier","jechoisismonnouveaumetier/:step",
            "jemerenseignesurmonmetier","jemerenseignesurmonmetier/:step",
            "jedeveloppeetactivemonreseau","jedeveloppeetactivemonreseau/:step",
            "jidentifiemessoutiens","jidentifiemessoutiens/:step",
            "jemeprepareetmelance","jemeprepareetmelance/:step",
            "jeconsultemonbilan","jeconsultemonbilan/:etape",
            "jeprendsrendezvous","jeconsultemesinvitations","jenvoieuneinvitation","invitationsdashboard",
            "jepreparemarencontre","jefaislesuivi","jedeviensunpro"]
    };
    
    loggedIn : boolean= true;

    public updatecurrentauthstate ():void {
        //console.log("this.dbuserinfoservice.userinfo.publicinfo.status");
        //console.log(this.dbuserinfoservice.userinfo.publicinfo.status);
        if (this.dbuserinfoservice.userinfo.publicinfo.status !== "") {
            //console.log("connected: ");
            this.currentauthstate = this.dbuserinfoservice.userinfo.publicinfo.status;
        }else{
            //console.log("not connected");
            this.currentauthstate = "notconnected";
        }
        //console.log("currentauthstate: "+ this.currentauthstate);
    }

    isAuthenticated (route) {
        const promise = new Promise(
            (resolve, reject) => {
                let allow : boolean=false;
                
                this.updatecurrentauthstate ();
                //console.log("route");
                //console.log(route);

                for (let i = 0; i < this.paths[this.currentauthstate].length;i++) {
                    if (this.paths[this.currentauthstate][i]===route) {
                        allow = true;
                        //console.log("route allowed !");
                    }              
                }
                
                resolve(allow);
                if (!allow) {
                    //console.log("not allowed reroute !");
                    setTimeout(()=>{this.router.navigate(['/'+this.paths[this.currentauthstate]]);},1000);                        
                }
            }
        )
        return promise;
    }

    ngOnInit() {
        this.currentauthstate = "notconnected";
    }

}