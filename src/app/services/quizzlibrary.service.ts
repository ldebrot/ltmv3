import { Injectable, OnInit } from '@angular/core';
import { CardsetItem } from './../components/beneficiaire/quizz/cardset/cardset-item';


//This service handles the meetings based on dbuserinfo

//Firebase service

//Built-in stuff:

//Hand-made

//Firebase


@Injectable()
export class QuizzlibraryService implements OnInit{
    
    constructor(
    ) {
        console.log("quizzlibrary service");        
    }

    ngOnInit() {
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
                {id:1, caption:'Travailler dans une entreprise'},
                {id:2, caption:'Travailler dans une institution publique'},
                {id:3, caption:'Travailler dans une association / ONG'},
                {id:4, caption:'Devenir indépendant (sans employés)'},
                {id:5, caption:'Devenir entrepreneur (avec employés)'},
                {id:6, caption:'Reprendre une société avec des employés'},
                {id:7, caption:'Je ne suis pas encore sûr de mon choix'},
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