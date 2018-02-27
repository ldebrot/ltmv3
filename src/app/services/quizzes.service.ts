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
            iconclass: "mdi mdi-dice-1 quizzseletion_icons gradientnew1",
            followupaction: {command : "navigate", route: "quizzselection", delay:0}
        },
        quizz3 : {
            caption:"Comment activer mon réseau pro ?",
            description:"A travers ce quizz, évalue ta capacité à faire appel à tes connaissances pour avancer sur ton projet de reconversion !",
            cardids : [40,41,42,43,44,45,46,47,48],
            conditionvisible: false,
            conditionenabled: false,
            iconclass: "mdi mdi-dice-2 quizzseletion_icons gradientnew2",
            followupaction: {command : "navigate", route: "quizzselection", delay:0}
        },
        quizz4 : {
            caption:"Est-ce que je me connais bien ?",
            description:"Connais-tu bien ta propre personnalité, tes forces et faiblesses, tes envies et motivations ? Découvre les différentes démarches à entreprendre dans ce quizz.",
            cardids : [60],
            conditionvisible: false,
            conditionenabled: false,
            iconclass: "mdi mdi-dice-3 quizzseletion_icons gradientnew3",
            followupaction: {command : "navigate", route: "quizzselection", delay:0}
        },
        quizz99 : {
            caption:"Test quizz",
            description:"Ceci est un quizz de test. Il te permettra de mieux tester l'application.",
            cardids : [1,2,3,4,5,6],
            conditionvisible: [{experience:"1-1-1",value:true, compulsory:false}],
            conditionenabled: [{experience:"1-1-1",value:true, compulsory:true}],
            iconclass: "mdi mdi-dice-multiple quizzseletion_icons gradientnew1"
        },
        quizz98 : {
            caption:"Direct Test",
            description:"C'est juste pour tester des cartes",
            cardids : [48],
            conditionvisible: false,
            conditionenabled: false,
            iconclass: "mdi mdi-dice-multiple quizzseletion_icons gradientnew3",
            followupaction: {command : "navigate", route: "quizzselection", delay:0}
        }
        
    }
    
}
