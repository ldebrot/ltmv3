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
        private quizzservice : QuizzService
    ) {}
    
    ngOnInit() {
        //temporary starter
        this.quizzservice.changecurrentquizzid(1,4);        
    }

    ngAfterViewInit () {
    }

}
