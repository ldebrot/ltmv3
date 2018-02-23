import { Router } from '@angular/router';
import { ConnectService } from './../../../../services/connect.service';
import { QuizzService } from 'app/services/quizz.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-quizzselection',
    templateUrl: './quizzselection.component.html',
    styleUrls: ['./quizzselection.component.css']
})
export class QuizzselectionComponent implements OnInit {

    public quizzdescription : string = "";
    public descriptionpanelhidden : boolean = true;
    public destinationquizz : number = -99;


    constructor(
        public quizzservice : QuizzService,
        private connectservice : ConnectService,
        private router : Router
    ) { }
    
    ngOnInit() {
        this.connectservice.signin("mc@mc.com", "mcmcmcmc");
        this.quizzservice.createquizzselection();
    }

    public gotodestinationquizz():void{        
        this.descriptionpanelhidden=true;
        this.quizzservice.chargequizzbyid(this.destinationquizz);
        this.quizzservice.chargecardbyposition(0);
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
