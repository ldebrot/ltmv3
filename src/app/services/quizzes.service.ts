import { Injectable } from '@angular/core';

@Injectable()
export class QuizzesService {
    
    constructor() { }
    
    public quizzes : any = {
        quizz2 : {
            caption:"Mon premier quizz",
            description:"Ce quizz initial te permettra de te situer par rapport à la reconversion professionnelle. Parfait pour démarrer !",
            cardids : [20,21,22,23,24,25,26,27,28,29,30,31],
            conditionvisible: false,
            conditionenabled: false,
            iconclass: "mdi mdi-dice-1 quizzseletion_icons gradientnew2",
            followupaction: {command : "navigate", route: "quizzselection", delay:0}
        },
        quizz3 : {
            caption:"Test quizz",
            description:"Ceci est un quizz de test. Il te permettra de mieux tester l'application.",
            cardids : [1,2,3,4,5,6],
            conditionvisible: [{experience:"1-1-1",value:true, compulsory:false}],
            conditionenabled: [{experience:"1-1-1",value:true, compulsory:true}],
            iconclass: "mdi mdi-dice-multiple quizzseletion_icons gradientnew1"
        },
        quizz4 : {
            caption:"Direct Test",
            description:"C'est juste pour tester des cartes",
            cardids : [31],
            conditionvisible: false,
            conditionenabled: false,
            iconclass: "mdi mdi-dice-2 quizzseletion_icons gradientnew3",
            followupaction: {command : "navigate", route: "quizzselection", delay:0}
        }
        
    }
    
}
