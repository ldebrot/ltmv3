import { QuizzService } from './../../../services/quizz.service';
import { CardsetItem } from './cardset/cardset-item';
import { Component, OnInit } from '@angular/core';

//Quizzcomponent shows the cardsets according to the cardset service

@Component({
    selector: 'app-quizz',
    templateUrl: './quizz.component.html',
    styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
    CardsetcontainerComponent: any;
    QuizzComponent: any;

    cardsets: CardsetItem[];
    
    constructor(
        private quizzservice : QuizzService
    ) {}
    
    public clickme(id:number){
        this.quizzservice.changecurrentquizzid(id);
    }

    ngOnInit() {
    }

}
