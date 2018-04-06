import { Injectable } from '@angular/core';

@Injectable()
export class QuizzesService {
    
    constructor() { }
    
    public quizzes : any = {
        quizz1 : {
            caption:"Mon premier quizz",
            description:"Ce quizz initial te permettra de te situer par rapport à la reconversion professionnelle. Parfait pour démarrer !",
            cardids : [20,21,22,23,24,25,26,27,28,29,30,31],
            conditionvisible: false,
            conditionenabled: false,
            iconclass: "mdi mdi-dice-1 quizzseletion_icons gradientnew1",
            followupaction: {command : "navigate", route: "quizzselection", delay:0}
        },
        quizz2 : {
            caption:"J'en suis où ?",
            description:"Ce quizz te permettra de paramétrer ton profile pour que tu puisses rencontrer ou accueillir la bonne personne.",
            cardids : [141,142,143,144,145,146,147,148,149,150],
            conditionvisible: false,
            conditionenabled: false,
            iconclass: "mdi mdi-account-circle quizzseletion_icons gradientnew7",
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
            cardids : [60,61,62,63,64,65,66,67,68],
            conditionvisible: false,
            conditionenabled: false,
            iconclass: "mdi mdi-dice-3 quizzseletion_icons gradientnew3",
            followupaction: {command : "navigate", route: "quizzselection", delay:0}
        },
        quizz5 : {
            caption:"Je trouve mon nouveau métier !",
            description:"Ce quizz te guide à travers les questions portant sur ton nouveau métier.",
            cardids : [80,81,82,83,84,85,86],
            conditionvisible: false,
            conditionenabled: false,
            iconclass: "mdi mdi-dice-4 quizzseletion_icons gradientnew4",
            followupaction: {command : "navigate", route: "quizzselection", delay:0}
        },
        quizz6 : {
            caption:"Je trouve mon secteur !",
            description:"Dans ce quizz, fais le point sur les secteurs qui t'intéressent.",
            cardids : [100,101,102,103,104,105,106],
            conditionvisible: false,
            conditionenabled: false,
            iconclass: "mdi mdi-dice-5 quizzseletion_icons gradientnew5",
            followupaction: {command : "navigate", route: "quizzselection", delay:0}
        },
        quizz7 : {
            caption:"Je trouve mon job !",
            description:"Ce quizz te permet d'évaluer si tu as besoin d'aide pour t'insérer dans ton nouveau métier.",
            cardids : [120,121,122],
            conditionvisible: false,
            conditionenabled: false,
            iconclass: "mdi mdi-dice-6 quizzseletion_icons gradientnew6",
            followupaction: {command : "navigate", route: "quizzselection", delay:0}
        },
        quizz98 : {
            caption:"Direct Test",
            description:"C'est juste pour tester des cartes",
            cardids : [106],
            conditionvisible: false,
            conditionenabled: false,
            iconclass: "mdi mdi-dice-multiple quizzseletion_icons gradientnew3",
            followupaction: {command : "navigate", route: "quizzselection", delay:0}
        }
        
    }
    
}
