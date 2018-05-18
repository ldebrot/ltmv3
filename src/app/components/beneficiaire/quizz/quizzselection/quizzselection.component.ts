import { Subscription } from 'rxjs/Rx';
import { DbuserinfoService } from './../../../../services/dbuserinfo.service';
import { Router } from '@angular/router';
import { ConnectService } from './../../../../services/connect.service';
import { QuizzService } from 'app/services/quizz.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-quizzselection',
    templateUrl: './quizzselection.component.html',
    styleUrls: ['./quizzselection.component.css']
})
export class QuizzselectionComponent implements OnInit, OnDestroy {

    public quizzdescription : string = "";
    public descriptionpanelhidden : boolean = true;
    public destinationquizz : number = -99;
    public userinfoloadedsubscription : Subscription;


    constructor(
        public quizzservice : QuizzService,
        private connectservice : ConnectService,
        private router : Router,
        private dbuserinfoservice :DbuserinfoService
    ) { }
    
    ngOnInit() {
        this.connectservice.signin("mc@mc.com", "mcmcmcmc");
        if (this.dbuserinfoservice.userinfo.loaded) {
            this.quizzservice.createquizzselection();
        }
        this.userinfoloadedsubscription = this.dbuserinfoservice.userinfoloadedobservable.subscribe(()=>{
            this.quizzservice.createquizzselection();
        });
    }

    ngOnDestroy(){
        this.userinfoloadedsubscription.unsubscribe();
    }

    public gotodestinationquizz():void{        
        this.descriptionpanelhidden=true;
        this.quizzservice.chargequizzbyid(this.destinationquizz);
        this.quizzservice.chargecardbyposition(0,false);
        this.router.navigate(['/quizz']);
    }

    public chosequizz(quizzid:string):void{
        this.setdestinationquizz(quizzid);
        this.descriptionpanelhidden=false;
    }

    public setdestinationquizz(quizzid:string):void{
        this.destinationquizz = Number(quizzid);
        this.quizzdescription = this.quizzservice.quizzes['quizz'+quizzid].description;
    }

}
