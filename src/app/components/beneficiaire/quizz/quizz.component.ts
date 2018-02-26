import { QuizzService } from './../../../services/quizz.service';
import { CardsetItem } from './cardset/cardset-item';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

//Quizzcomponent shows the cardsets according to the cardset service

@Component({
    selector: 'app-quizz',
    templateUrl: './quizz.component.html',
    styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit{
    CardsetcontainerComponent: any;
    QuizzComponent: any;
    cardsets: CardsetItem[];
    
    constructor(
        private quizzservice : QuizzService,
        private location : Location
    ) {}
    
    ngOnInit (){
        if (!this.quizzservice.checkifquizzloaded()) {
            console.log("quizz not loaded, return to previous");
            this.location.back();
        }
    }

}
