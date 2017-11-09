import { Injectable, OnInit } from '@angular/core';
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

    public cards:any = {
        id: [
            1,
            3,
            4,
            5,
            6
        ],
        quizzid: [
            1,
            1,
            1,
            1,
            1,
            2
        ],
        type: [
            "multiplechoice",
            "swipecard",
            "swipecard",
            "order",
            "association",
            "multiplechoice"
        ],
        instruction: [
            "Choix multiple: sélectionne toutes les réponses qui te correspondent",
            "",
            "",
            "",
            "",
            ""
        ],
        question: [
            "Je veux changer de métier et...",
            "",
            "",
            "",
            "",
            ""
        ],
        innerhtml: [
            "",
            "swipelement1",
            "",
            "",
            "",
            ""
        ],
        optioncaptions: [
            ['Travailler dans une entreprise',"Travailler dans une institution publique","Travailler dans une association / ONG","Devenir indépendant (sans employés)","Devenir entrepreneur (avec employés)","Reprendre une société avec des employés","Je ne suis pas encore sûr de mon choix"],
            "",
            "",
            "",
            "",
            ""
        ],
        optionids: [
            [1,2,3,4,5,6],
            0,
            0,
            0,
            0,
            0
        ]
    };

}