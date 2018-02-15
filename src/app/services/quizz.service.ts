import { QuizzComponent } from './../components/beneficiaire/quizz/quizz.component';
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

    //XXX problem here is that we mix up quizz id & position and cardset id & position and cards
    // 1) you load the quizz
    // 2) you load the card sequence : loads either a new cardset or a card

    public currentquizzid : number = 0;
    public currentquizzobject : any = {};//this holds the current quizz object
    public currentcardid : number = 0;
    public currentcardsubject : Subject<number> = new Subject();
    public currentcardobject : any = {};//this holds the current card object
    public currentcardposition : number = 0;//this is the position of the current card in the currentcardset


    //go to next card
    public gotonextcard(){
        if(this.setcurrentcardpositiontonext()){
            this.chargecardbyposition(this.currentcardposition, false);
        }
    }

    //initiates quizz
    public chargequizzbyid(quizzid:number, checkifchanged?:boolean){
        if (this.currentquizzid !== quizzid || checkifchanged==false) {
            this.currentquizzid = quizzid;//updates current quizz id
            this.updatecurrentquizzobject();//updates current quizz object
            console.log("quizzservice : loaded quizz id "+ this.currentquizzid);
        } else {
            console.log("quizzservice : quizz id did not change!")
        }
    }

    //set card position to the beginning
    public setcurrentcardpositiontofirst(){
        this.currentcardposition = 0;
        console.log("current card position set to"+this.currentcardposition);
    }

    //set card position to next
    public setcurrentcardpositiontonext():boolean{
        let temp_maxposition : number = this.currentquizzobject.cardids.length - 1;
        if (this.currentcardposition < temp_maxposition) {
            this.currentcardposition++;
            console.log("current card position set to"+this.currentcardposition);
            return true;
        } else {
            console.log("you reached the end of the quizz. Current card position remains at"+this.currentcardposition);
            return false;
        }
    }

    //launches card by specified position
    public chargecardbyposition(cardposition:number, checkifchanged?:boolean){
        if (this.currentcardposition !== cardposition || checkifchanged==false) {
            this.currentcardposition = cardposition;//updates current card position (which is not the card id!)
            this.updatecurrentcardobjectbyposition(this.currentcardposition);//updates current card object
            this.updatecurrentcardid(this.currentcardposition);
            console.log("quizzservice : loaded  card id "+ this.currentcardid);
            this.currentcardsubject.next(this.currentcardid);
        } else {
            console.log("quizzservice : card position did not change!")
        }
    }

    public updatecurrentquizzobject() {
        //gets current quizz object based on current quizz id
        this.currentquizzobject = this.quizzes["quizz"+String(this.currentquizzid)];
    }

    public updatecurrentcardobjectbyposition(cardposition : number) {
        //gets current card object based on current card position
        let temp_cardid = this.currentquizzobject.cardids[cardposition];
        this.currentcardobject = this.cards["card"+String(temp_cardid)]
        //console.log(this.currentcardobject);
    }

    public updatecurrentcardid(cardposition:number) {
        this.currentcardid = this.currentquizzobject.cardids[cardposition];
    }

    public cards:any = {
        card1 : {
            parameters:{
                cardtype:"multiplechoice_multiple", 
                instruction:"Choix multiple: sélectionne toutes les réponses qui te correspondent", 
                questioncaption: "Je veux changer de métier et...",
                cardcomponentname: "CsMultipleChoiceComponent",
                options:[1,2,3,4,5,6,7],
                maxselected:7
            },
            optional : {
            },
            option1: {id:1, caption:'Travailler dans une entreprise', unselectedclass:"unselected1", selectedclass:"selected1"},
            option2: {id:2, caption:'Travailler dans une institution publique', unselectedclass:"unselected2", selectedclass:"selected2"},
            option3: {id:3, caption:'Travailler dans une association / ONG', unselectedclass:"unselected3", selectedclass:"selected3"},
            option4: {id:4, caption:'Devenir indépendant (sans employés)', unselectedclass:"unselected4", selectedclass:"selected4"},
            option5: {id:5, caption:'Devenir entrepreneur (avec employés)', unselectedclass:"unselected5", selectedclass:"selected5"},
            option6: {id:6, caption:'Reprendre une société avec des employés', unselectedclass:"unselected6", selectedclass:"selected6"},
            option7: {id:7, caption:'Je ne suis pas encore sûr de mon choix', unselectedclass:"unselected7", selectedclass:"selected7"}
        },
        card2 : {
            parameters:{
                cardtype:"multiplechoice_multiple",
                instruction:"Jeu de cartes: fais glisser les cartes à gauche pour répondre par oui ou à droite pour répondre par non",
                questioncaption: "Ce que je sais sur mon projet de reconversion",
                cardcomponentname: "CsSwipecardComponent",
                options:[1,2,3,4,5],
                maxselected:5
            },
            optional : {
            },
            option1: {id:1, caption:"je sais ce que j'ai envie de faire", backgroundclass:"swipecard_1 background_1", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-human-handsup gradient1 swipecardicon"},
            option2: {id:2, caption:"Je sais identifier mes compétences", backgroundclass:"swipecard_1 background_2", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-human-handsup gradient2 swipecardicon"},
            option3: {id:3, caption:"Je sais quels secteurs d'activité m'intéressent", backgroundclass:"swipecard_1 background_3", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-human-handsup gradient3 swipecardicon"},
            option4: {id:4, caption:"Je sais quelles causes m'intéressent", backgroundclass:"swipecard_1 background_4", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-human-handsup gradient4 swipecardicon"},
            option5: {id:5, caption:"je sais quel type et quel niveau de responsabilité je souhaite assumer",backgroundclass:"swipecard_1 background_5", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-human-handsup gradient5 swipecardicon"},
        },
        card3 : {
            parameters:{
                cardtype:"orderrelative",
                instruction:"Distribution de points : distribue les 10 points selon ce qui correspond le plus à ta situation en cliquant sur les différents champs.",
                questioncaption: "Pourquoi je pense changer de métier ?",
                cardcomponentname: "CsOrderrelativeComponent",
                maxpoints: 10,
                options:[1,2,3,4,5]
            },
            optional : {
            },
            option1: {id:1, caption:"Je dois quitter mon poste.", optionvalue:0, basicclass:"unselected1", actionclass:"action1"},
            option2: {id:2, caption:"Je ne m'épanouis plus.", optionvalue:0, basicclass:"unselected2", actionclass:"action2"},
            option3: {id:3, caption:"Les conditions de travail ne me conviennent plus.", optionvalue:0, basicclass:"unselected3", actionclass:"action3"},
            option4: {id:4, caption:"Le salaire ne me suffit pas.", optionvalue:0, basicclass:"unselected4", actionclass:"action4"},
            option5: {id:5, caption:"je suis à un point mort dans ma carrière.", optionvalue:0, basicclass:"unselected5", actionclass:"action5"},
        },
        card4 : {
            parameters:{
                cardtype:"orderregular",
                instruction:"Mettez les étapes dans l'ordre qui vous semble ",
                questioncaption: "Mettez les étapes de la reconversion dans le bon ordre",
                cardcomponentname: "CsOrderregularComponent",
                csorderregularshuffle: true,
                options:[1,2,3,4,5]
            },
            optional : {
            },
            option1: {id:1, caption:"Réflexion", optionvalue:0, basicclass:"unselected1", actionclass:"action1"},
            option2: {id:2, caption:"Préparation", optionvalue:1, basicclass:"unselected2", actionclass:"action2"},
            option3: {id:3, caption:"Formation", optionvalue:2, basicclass:"unselected3", actionclass:"action3"},
            option4: {id:4, caption:"Insertion", optionvalue:3, basicclass:"unselected4", actionclass:"action4"},
            option5: {id:5, caption:"Nouvelle vie", optionvalue:4, basicclass:"unselected5", actionclass:"action5"},
        },
        card5 : {
            parameters:{
                cardtype:"info",
                instruction:"Ceci est une carte d'information. A vous de lire ou de regarder attentivement. ",
                questioncaption: "Ceci est une carte d'information.",
                cardcomponentname: "CsInfoComponent"
            },
            optional : {
                imageurl:"",
                videourl:"",
                text:"This is an important information text you have to read. This is an important information text you have to read. This is an important information text you have to read. ",
                timer:true,
                autotime:true,
                time:0//in milliseconds
            }
        },
        card6 : {
            parameters:{
                cardtype:"Placement simple",
                instruction:"Pour répondre à la question, déplacez le curseur selon votre situation.",
                questioncaption: "Je suis sûr(e) de vouloir changer de métier",
                cardcomponentname: "CsPlacementsimpleComponent",
                step :1,//min = 1
                min: 0,
                max: 100,
                options: [1,2]
            },
            optional : {
            },
            options : {
                option1 : {
                    id:1,
                    left:"0%",
                    bulletcaption:"1",
                    caption:"Absolument !",
                    class:"csplacementsimple_red"
                },
                option2 : {
                    id:2,
                    left:"100%",
                    bulletcaption:"2",
                    caption:"Je ne sais pas encore.",
                    class:"csplacementsimple_blue"
                }
            }
        },
        card7 : {
            parameters:{
                cardtype:"multiplechoice_multiple", 
                instruction:"Choix multiple: sélectionne toutes les réponses qui te correspondent", 
                questioncaption: "Qu'est-ce qui m'amène à changer de métier ?",
                cardcomponentname: "CsMultipleChoiceComponent",
                options:[1,2,3,4,5],
                maxselected:5
            },
            optional : {
            },
            option1: {id:1, caption:"Je dois quitter mon poste.", unselectedclass:"unselected1", selectedclass:"selected1"},
            option2: {id:2, caption:"Je ne m'épanouis pas.", unselectedclass:"unselected2", selectedclass:"selected2"},
            option3: {id:3, caption:"Les conditions de travail ne me conviennent pas.", unselectedclass:"unselected3", selectedclass:"selected3"},
            option4: {id:4, caption:"Le salaire ne me suffit pas.", unselectedclass:"unselected4", selectedclass:"selected4"},
            option5: {id:5, caption:"Je suis à un point mort de ma carrière.", unselectedclass:"unselected5", selectedclass:"selected5"}
        },
        card8 : {
            parameters:{
                cardtype:"multiplechoice_multiple", 
                instruction:"Choix multiple: sélectionne toutes les réponses qui te correspondent", 
                questioncaption: "Qu'est-ce que j'attends de Lunchtime ?",
                cardcomponentname: "CsMultipleChoiceComponent",
                options:[1,2,3,4,5,6],
                maxselected:6
            },
            optional : {
            },
            option1: {id:1, caption:"Découvrir la reconversion professionnelle.", unselectedclass:"unselected5", selectedclass:"selected5"},
            option2: {id:2, caption:"M'inspirer de l'expérience d'un grand témoin.", unselectedclass:"unselected1", selectedclass:"selected1"},
            option3: {id:3, caption:"Trouver un soutien pour ma démarche.", unselectedclass:"unselected4", selectedclass:"selected4"},
            option4: {id:4, caption:"Agrandir mon réseau professionnel.", unselectedclass:"unselected2", selectedclass:"selected2"},
            option5: {id:5, caption:"Trouver mon nouveau métier.", unselectedclass:"unselected5", selectedclass:"selected5"},
            option6: {id:6, caption:"Trouver un emploi dans mon nouveau métier.", unselectedclass:"unselected6", selectedclass:"selected6"}
        },
        card9 : {
            parameters:{
                cardtype:"Placement simple",
                instruction:"Pour répondre à la question, déplacez le curseur selon votre situation.",
                questioncaption: "Je suis sûr(e) de vouloir changer de métier",
                cardcomponentname: "CsPlacementsimpleComponent",
                step :1,//min = 1
                min: 0,
                max: 100,
                options: [1,2],
                cursorcaption:"vous"
            },
            optional : {
            },
            options : {
                option1 : {
                    id:1,
                    left:"0%",
                    bulletcaption:"1",
                    caption:"Absolument !",
                    class:"csplacementsimple_red"
                },
                option2 : {
                    id:2,
                    left:"100%",
                    bulletcaption:"2",
                    caption:"Pas du tout !",
                    class:"csplacementsimple_blue"
                }
            }
        },
        card10 : {
            parameters:{
                cardtype:"Placement simple",
                instruction:"Pour répondre à la question, déplacez le curseur selon votre situation.",
                questioncaption: "Je suis sûr(e) que je vais réussir à changer de métier",
                cardcomponentname: "CsPlacementsimpleComponent",
                step :1,//min = 1
                min: 0,
                max: 100,
                options: [1,2],
                cursorcaption:"vous"
            },
            optional : {
            },
            options : {
                option1 : {
                    id:1,
                    left:"0%",
                    bulletcaption:"1",
                    caption:"Absolument !",
                    class:"csplacementsimple_red"
                },
                option2 : {
                    id:2,
                    left:"100%",
                    bulletcaption:"2",
                    caption:"Pas du tout !",
                    class:"csplacementsimple_blue"
                }
            }
        },
        card11 : {
            parameters:{
                cardtype:"orderregular",
                instruction:"Mettez les étapes dans l'ordre qui vous semble ",
                questioncaption: "Mettez les étapes de la reconversion dans le bon ordre",
                cardcomponentname: "CsOrderregularComponent",
                csorderregularshuffle: true,
                options:[1,2,3,4,5]
            },
            optional : {
            },
            option1: {id:1, caption:"Réflexion", optionvalue:0, basicclass:"unselected1", actionclass:"action1"},
            option2: {id:2, caption:"Préparation", optionvalue:1, basicclass:"unselected2", actionclass:"action2"},
            option3: {id:3, caption:"Formation", optionvalue:2, basicclass:"unselected3", actionclass:"action3"},
            option4: {id:4, caption:"Insertion", optionvalue:3, basicclass:"unselected4", actionclass:"action4"},
            option5: {id:5, caption:"Nouvelle vie", optionvalue:4, basicclass:"unselected5", actionclass:"action5"},
        }
    }

    //XXXXXXXXXXXX XXX

    public quizzes:any = {
        quizz1 : {
            description:"Test quizz",
            cardids : [1,2,3,4,5,6]
        },
        quizz2 : {
            description:"Accueil",
            cardids : [7,8,9,10,11]
        }
    }

}