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
    
    constructor(
        public quizzservice : QuizzService,
        private connectservice : ConnectService,
        private router : Router
    ) { }
    
    ngOnInit() {
        this.connectservice.signin("mc@mc.com", "mcmcmcmc");
        this.quizzservice.createquizzselection();
    }

    public gotoquizz(quizzid:string):void{
        this.quizzservice.chargequizzbyid(Number(quizzid));
        this.quizzservice.chargecardbyposition(0);
        this.router.navigate(['/quizz']);
    }
    
}
