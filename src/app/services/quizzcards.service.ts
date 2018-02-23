import { Injectable } from '@angular/core';

@Injectable()
export class QuizzcardsService {
    
    constructor() { }
    
    public cards : any = {
        card1 : {
            parameters:{
                cardtype:"multiplechoice_multiple", 
                instruction:"Choix multiple: sélectionne toutes les réponses qui te correspondent", 
                questioncaption: "Quelles citations te correspondent ?",
                titlecaption: "Je veux changer de situation pour...",
                cardcomponentname: "CsMultipleChoiceComponent",
                options:[1,2,3,4,5,6,7],
                minselected:1
            },
            optional : {
            },
            option1: {id:1, caption:'...travailler dans une entreprise', unselectedclass:"unselected1", selectedclass:"selected1"},
            option2: {id:2, caption:'...travailler dans une institution publique', unselectedclass:"unselected2", selectedclass:"selected2"},
            option3: {id:3, caption:'...travailler dans une association / ONG', unselectedclass:"unselected3", selectedclass:"selected3"},
            option4: {id:4, caption:'...devenir indépendant (sans employés)', unselectedclass:"unselected4", selectedclass:"selected4"},
            option5: {id:5, caption:'...devenir entrepreneur (avec employés)', unselectedclass:"unselected5", selectedclass:"selected5"},
            option6: {id:6, caption:'...reprendre une société avec des employés', unselectedclass:"unselected6", selectedclass:"selected6"},
            option7: {id:7, caption:'...je ne suis pas encore sûr de mon choix', unselectedclass:"unselected7", selectedclass:"selected7"}
        },
        card2 : {
            parameters:{
                cardtype:"Swipecards",
                instruction:"Jeu de cartes: fais glisser les cartes à gauche pour répondre par oui ou à droite pour répondre par non",
                questioncaption: "Ce que je sais sur mon projet de reconversion",
                cardcomponentname: "CsSwipecardComponent",
                options:[1,2,3,4,5],
                maxselected:2
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
        card20 : {
            parameters:{
                cardtype:"info",
                instruction:"Ceci est une carte d'information. Lis-la attentivement et appuie sur le bouton vert quand tu as terminé.",
                questioncaption: "A quoi sert ce quizz ?",
                cardcomponentname: "CsInfoComponent"
            },
            optional : {
                imageurl:"",
                videourl:"",
                text:"Ce quizz initial te permettra de te situer par rapport à la reconversion professionnelle. Essaie de répondre le mieux possible à chaque question.",
                timer:true,
                autotime:true,
                time:0//in milliseconds
            }
        },
        card21 : {
            parameters:{
                cardtype:"info",
                instruction:"Ceci est une carte d'information. Lis-la attentivement et appuie sur le bouton vert quand tu as terminé.",
                questioncaption: "Choix multiples",
                cardcomponentname: "CsInfoComponent"
            },
            optional : {
                imageurl:"",
                videourl:"",
                text:"Les premières cartes sont des questions à choix multiple. Sélectionne toutes les réponses qui te correspondent.",
                timer:true,
                autotime:true,
                time:0//in milliseconds
            }
        },
        card22 : {
            parameters:{
                cardtype:"multiplechoice_multiple", 
                instruction:"Choix multiple: sélectionne toutes les réponses qui te correspondent.", 
                questioncaption: "Qu'est-ce qui m'amène à changer de métier ?",
                cardcomponentname: "CsMultipleChoiceComponent",
                options:[1,2,3,4,5],
                minselected:1,
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
        card23 : {
            parameters:{
                cardtype:"multiplechoice_multiple", 
                instruction:"Choix multiple: sélectionne toutes les réponses qui te correspondent", 
                questioncaption: "Qu'est-ce que j'attends de Lunchtime ?",
                cardcomponentname: "CsMultipleChoiceComponent",
                options:[1,2,3,4,5,6],
                minselected:1,
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
        card24 : {
            parameters:{
                cardtype:"info",
                instruction:"Ceci est une carte d'information. Lis-la attentivement et appuie sur le bouton vert quand tu as terminé.",
                questioncaption: "Placement de curseur",
                cardcomponentname: "CsInfoComponent"
            },
            optional : {
                imageurl:"",
                videourl:"",
                text:"Les prochaines cartes te demanderont de déplacer le curseur horizontal selon ta situation, en le tirant avec la souris ou ton doigt vers la gauche ou la droite.",
                timer:true,
                autotime:true,
                time:0//in milliseconds
            }
        },
        card25 : {
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
        card26 : {
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
        card27 : {
            parameters:{
                cardtype:"info",
                instruction:"Ceci est une carte d'information. Lis-la attentivement et appuie sur le bouton vert quand tu as terminé.",
                questioncaption: "Réarranger les éléments",
                cardcomponentname: "CsInfoComponent"
            },
            optional : {
                imageurl:"",
                videourl:"",
                text:"Sur la prochaine carte, il va falloir mettre de l'ordre ! Range les éléments dans le bon ordre. Tu peux les déplacer vers le haut ou le bas avec la souris ou ton doigt.",
                timer:true,
                autotime:true,
                time:0//in milliseconds
            }
        },
        card28 : {
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
        card29 : {
            parameters:{
                cardtype:"multiplechoice_multiple", 
                instruction:"Choix multiple: sélectionne toutes les réponses qui te correspondent", 
                questioncaption: "A quelle étape correspond ma situation ?",
                cardcomponentname: "CsMultipleChoiceComponent",
                options:[1,2,3,4,5,6],
                minselected:1,
                maxselected:1
            },
            optional : {
            },
            option1: {id:1, caption:"Réflexion : pas encore sûr de vouloir changer de métier.", unselectedclass:"unselectednew1", selectedclass:"selectednew1"},
            option2: {id:2, caption:"Préparation : je cherche activement mon nouveau métier.", unselectedclass:"unselectednew2", selectedclass:"selectednew2"},
            option3: {id:3, caption:"Formation : j'ai trouvé mon métier et cherche une formation.", unselectedclass:"unselectednew3", selectedclass:"selectednew3"},
            option4: {id:4, caption:"Insertion : je cherche un emploi dans mon nouveau métier.", unselectedclass:"unselectednew4", selectedclass:"selectednew4"},
            option5: {id:5, caption:"Nouvelle vie : je m'installe dans mon nouveau métier.", unselectedclass:"unselectednew5", selectedclass:"selectednew5"},
            option6: {id:6, caption:"Je ne sais pas vraiment.", unselectedclass:"unselectednew6", selectedclass:"selectednew6"}
        },
        card30 : {
            parameters:{
                cardtype:"info",
                instruction:"Ceci est une carte d'information. Lis-la attentivement et appuie sur le bouton vert quand tu as terminé.",
                questioncaption: "Cartes à swiper !",
                cardcomponentname: "CsInfoComponent"
            },
            optional : {
                imageurl:"",
                videourl:"",
                text:"Pour la partie finale de ce quizz, tu peux 'swiper' à GAUCHE les cartes qui te correspondent et à DROITE celles qui ne te correspondent pas. Lis bien la question et le texte avant de faire ton choix.",
                timer:true,
                autotime:true,
                time:0//in milliseconds
            }
        },
        card31 : {
            parameters:{
                cardtype:"Swipecards",
                instruction:"Jeu de cartes: fais glisser les cartes à gauche pour répondre par oui ou à droite pour répondre par non",
                questioncaption: "Quand je pense à mon projet de reconversion...",
                cardcomponentname: "CsSwipecardComponent",
                options:[1,2,3,4,5],
                maxselected:5
            },
            optional : {
            },
            option1: {id:1, caption:"...je me sens perdu(e).", backgroundclass:"swipecard_1 background_1", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-comment-question-outline gradient1 swipecardicon"},
            option2: {id:2, caption:"...je me sens excité(e).", backgroundclass:"swipecard_1 background_2", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-heart-pulse gradient2 swipecardicon"},
            option3: {id:3, caption:"...je me sens démoralisé(e).", backgroundclass:"swipecard_1 background_3", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-battery-alert gradient3 swipecardicon"},
            option4: {id:4, caption:"...je me sens abandonné(e) par les autres.", backgroundclass:"swipecard_1 background_4", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-human-handsdown gradient4 swipecardicon"},
            option5: {id:5, caption:"...je me sens incompris(e).",backgroundclass:"swipecard_1 background_5", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-comment-remove-outline gradient5 swipecardicon"}
        }  
    }
    
}
