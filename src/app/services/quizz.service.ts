import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CardsetItem } from './../components/beneficiaire/quizz/cardset/cardset-item';

//ReactiveX
import "rxjs/Rx";
import { Subject } from "rxjs/Subject";

//This service handles the meetings based on dbuserinfo

//Firebase service

//Built-in stuff:

//Hand-made

//Firebase


@Injectable()
export class QuizzService implements OnInit{
    
    constructor(
    ) {
    }

    ngOnInit() {
    }

    public currentcardsubject : Subject<number> = new Subject();;
    public currentquizzset = {//this holds position and id of current quizz
        position : 0,
        quizzid : 0
    };//
    public currentquizzobject : any = {};//this holds the current quizz object
    public currentcardset = {
        position : [],
        cardid : []
    };//this holds positions and ids of cards belonging to current quizz
    public currentcardobject : any = {};//this holds the current card object
    public currentcarditem : number = 0;//this is the position of the current card in the currentcardset


    //initiates quizz and cardset change, launches load of first card
    public changecurrentquizzid(quizzid){
        this.currentquizzset.quizzid = quizzid;//updates current quizz id
        this.updatecurrentquizzposition(quizzid);//updates current quizz position
        this.updatecurrentquizzobject();//updates current quizz object
        this.updatecurrentcardset();//updates current card set (holding ids and positions)
        this.currentcarditem = 0;//resets current card item to first item
        this.updatecurrentcardobject();//updates current card object
//        this.currentcardsubject.next(this.currentcardobject.parameters.cardcomponentname);
        this.currentcardsubject.next(this.currentcardset.position[this.currentcarditem]);
    }

    public updatecurrentquizzposition(quizzid){
        for (let item = 0; item < this.quizzes.parameters.length; item++) {
            if (quizzid == this.quizzes.parameters[item].quizzid){
                this.currentquizzset.position = item;
            }
        }
    }

    public updatecurrentquizzobject() {
        let temp_currentquizz:any = {};
        temp_currentquizz.parameters = this.quizzes.parameters[this.currentquizzset.position];
        this.currentquizzobject = temp_currentquizz;
    }

    public updatecurrentcardset() {
        this.currentcardset.position = [];
        this.currentcardset.cardid = [];
        for (let item = 0; item < this.cards.parameters.length; item++) {
            if (this.cards.parameters[item].quizzid == this.currentquizzset.quizzid){
                this.currentcardset.position.push(item);
                this.currentcardset.cardid.push(this.cards.parameters[item].cardid);
            }
        }
        console.log("updated current card set, based on quizz number "+this.currentquizzset.quizzid);
    }

    public updatecurrentcardobject() {
        //gets current card based on current card item
        this.currentcardobject = this.getcardobjectbyposition(this.currentcardset.position[this.currentcarditem]);
        console.log(this.currentcardobject);
    }

    //provides current cardset parameters and options
    public getcardobjectbyposition(cardposition) : any {
        let temp_number : number = 0;
        let currentcardset:any = {};
        currentcardset.parameters = this.cards.parameters[temp_number];
        currentcardset.optional = this.cards.optional[temp_number];
        currentcardset.options = this.cards.options[temp_number];
        return currentcardset;
    }

public cards:any = {
    parameters:[
        {
            cardid:1, quizzid:1, 
            cardtype:"multiplechoice_multiple", 
            instruction:"Choix multiple: sélectionne toutes les réponses qui te correspondent", 
            questioncaption: "Je veux changer de métier et...",
            cardcomponentname: "CsMultipleChoiceComponent"
        }
    ],
    optional : [
        {innerhtml:""}
    ],
    options: [//captions of options
        [
            {id:1, caption:'Travailler dans une entreprise', class:"randombackgroundcolor1 csmultiplechoice_buttonitem"},
            {id:2, caption:'Travailler dans une institution publique', class:"randombackgroundcolor2 csmultiplechoice_buttonitem"},
            {id:3, caption:'Travailler dans une association / ONG', class:"randombackgroundcolor3 csmultiplechoice_buttonitem"},
            {id:4, caption:'Devenir indépendant (sans employés)', class:"randombackgroundcolor4 csmultiplechoice_buttonitem"},
            {id:5, caption:'Devenir entrepreneur (avec employés)', class:"randombackgroundcolor5 csmultiplechoice_buttonitem"},
            {id:6, caption:'Reprendre une société avec des employés', class:"randombackgroundcolor6 csmultiplechoice_buttonitem"},
            {id:7, caption:'Je ne suis pas encore sûr de mon choix', class:"randombackgroundcolor7 csmultiplechoice_buttonitem"},
        ]
    ]
};

public quizzes:any = {
    parameters:[
        {
            quizzid:1,
            quizzcaption:""              
        }
    ]            
}
}