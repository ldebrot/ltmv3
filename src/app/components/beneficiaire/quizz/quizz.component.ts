import { ConnectService } from './../../../services/connect.service';
import { QuizzService } from './../../../services/quizz.service';
import { CardsetItem } from './cardset/cardset-item';
import { Component, OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

//Quizzcomponent shows the cardsets according to the cardset service

@Component({
    selector: 'app-quizz',
    templateUrl: './quizz.component.html',
    styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit, AfterViewInit {
    CardsetcontainerComponent: any;
    QuizzComponent: any;
    cardsets: CardsetItem[];
    
    constructor(
        private quizzservice : QuizzService,
        private connectservice : ConnectService
    ) {}
    
    ngOnInit() {
        //temporary starter
        this.connectservice.signin("mc@mc.com", "mcmcmcmc");
        this.quizzservice.chargequizzbyid(1);
        this.quizzservice.chargecardbyposition(2);     
    }

    ngAfterViewInit () {
    }

}
