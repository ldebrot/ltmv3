import { Injectable } from '@angular/core';

@Injectable()
export class QuizzcardsService {
    
    constructor() { }
    
    public cards : any = {
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
                textanimation:true,
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
                textanimation:true,
                time:0//in milliseconds
            }
        },
        card22 : {
            parameters:{
                cardtype:"multiplechoice_multiple", 
                instruction:"Choix multiple: sélectionne toutes les réponses qui te correspondent.", 
                questioncaption: "Qu'est-ce qui t'amène à changer de métier ?",
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
                questioncaption: "Qu'est-ce que tu attends de Lunchtime ?",
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
                textanimation:true,
                time:0//in milliseconds
            }
        },
        card25 : {
            parameters:{
                cardtype:"Placement simple",
                instruction:"Pour répondre à la question, déplace le curseur selon ta situation.",
                questioncaption: "Tu es sûr(e) de vouloir changer de métier",
                cardcomponentname: "CsPlacementsimpleComponent",
                step :1,//min = 1
                min: 0,
                max: 100,
                options: [1,2],
                cursorcaption:"toi"
            },
            optional : {
            },
            options : {
                option1 : {
                    id:1,
                    left:"0%",
                    stepposition : 0,
                    bulletcaption:"1",
                    bulletclass:"csplacementsimple_bullet_green",
                    caption:"Absolument !",
                    captionclass:"csplacementsimple_caption_green"
                },
                option2 : {
                    id:2,
                    left:"100%",
                    stepposition : 100,
                    bulletcaption:"2",
                    bulletclass:"csplacementsimple_bullet_red",
                    caption:"Pas du tout !",
                    captionclass:"csplacementsimple_caption_red"
                }
            }
        },
        card26 : {
            parameters:{
                cardtype:"Placement simple",
                instruction:"Pour répondre à la question, déplace le curseur selon ta situation.",
                questioncaption: "Tu es sûr(e) que tu vas réussir à changer de métier",
                cardcomponentname: "CsPlacementsimpleComponent",
                step :1,//min = 1
                min: 0,
                max: 100,
                options: [1,2],
                cursorcaption:"toi"
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
                textanimation:true,
                time:0//in milliseconds
            }
        },
        card28 : {
            parameters:{
                cardtype:"orderregular",
                instruction:"Mets les étapes dans l'ordre qui te semble correct.",
                questioncaption: "Mets les étapes de la reconversion dans le bon ordre",
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
                text:"Pour la partie finale de ce quizz, tu peux 'swiper' à DROITE les cartes qui te correspondent et à GAUCHE celles qui ne te correspondent pas. <nl> Lis bien la question et le texte avant de faire ton choix.",
                timer:true,
                autotime:true,
                textanimation:true,
                time:0//in milliseconds
            }
        },
        card31 : {
            parameters:{
                cardtype:"Swipecards",
                instruction:"Jeu de cartes: fais glisser les cartes à droite pour répondre par oui et à gauche pour répondre par non",
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
        },
        card40 : {
            parameters:{
                cardtype:"info",
                instruction:"Ceci est une carte d'information. Lis-la attentivement et appuie sur le bouton vert quand tu as terminé.",
                questioncaption: "A quoi sert ce quizz ?",
                cardcomponentname: "CsInfoComponent"
            },
            optional : {
                imageurl:"",
                videourl:"",
                text:"A travers ce quizz, évalue ta capacité à faire appel à tes connaissances pour avancer sur ton projet de reconversion !",
                timer:true,
                autotime:true,
                textanimation:true,
                time:0//in milliseconds
            }
        },
        card41 : {
            parameters:{
                cardtype:"multiplechoice_multiple", 
                instruction:"Choix multiple: sélectionne toutes les réponses qui te correspondent", 
                questioncaption: "A qui as-tu déjà présenté ton projet de reconversion?",
                titlecaption: "J'en ai parlé à...",
                cardcomponentname: "CsMultipleChoiceComponent",
                options:[1,2,3,4],
                minselected:0,
                maxselected:4
            },
            optional : {
            },
            option1: {id:1, caption:"...ma famille", unselectedclass:"unselectednew2", selectedclass:"selectednew2"},
            option2: {id:2, caption:"...mes amis", unselectedclass:"unselectednew5", selectedclass:"selectednew5"},
            option3: {id:3, caption:"...mes collègues", unselectedclass:"unselectednew3", selectedclass:"selectednew3"},
            option4: {id:4, caption:"...mes supérieurs et RH", unselectedclass:"unselectednew4", selectedclass:"selectednew4"}
        },  
        card42 : {
            parameters:{
                cardtype:"Placement simple",
                instruction:"Pour répondre à la question, déplacez le curseur selon votre situation.",
                questioncaption: "Est-ce que tu te sens bien soutenu(e) dans ton projet de reconversion ?",
                cardcomponentname: "CsPlacementsimpleComponent",
                step :50,//min = 1
                min: 0,
                max: 100,
                options: [1,2,3],
                cursorcaption:"toi"
            },
            optional : {
            },
            options : {
                option1 : {
                    id:1,
                    left:"0%",
                    stepposition : 0,
                    bulletcaption:"1",
                    bulletclass:"csplacementsimple_bullet_green",
                    caption:"Totalement soutenu(e) par mon entourage",
                    captionclass:"csplacementsimple_caption_green"
                },
                option2 : {
                    id:2,
                    left:"50%",
                    stepposition : 50,
                    bulletcaption:"2",
                    bulletclass:"csplacementsimple_bullet_yellow",
                    caption:"Partiellement soutenu(e), par quelques personnes.",
                    captionclass:"csplacementsimple_caption_yellow"
                },
                option3 : {
                    id:3,
                    left:"100%",
                    stepposition : 100,
                    bulletcaption:"3",
                    bulletclass:"csplacementsimple_bullet_red",
                    caption:"Pas du tout soutenu(e).",
                    captionclass:"csplacementsimple_caption_red"
                }
            }
        },  
        card43 : {
            parameters:{
                cardtype:"multiplechoice_multiple", 
                instruction:"Choix multiple: sélectionne toutes les réponses qui te correspondent", 
                questioncaption: "Qui te soutient dans ton projet ?",
                titlecaption: "Parmi celles et ceux qui te soutiennent, il y a...",
                cardcomponentname: "CsMultipleChoiceComponent",
                options:[1,2,3,4],
                minselected:0,
                maxselected:4
            },
            optional : {
            },
            option1: {id:1, caption:"...ma famille", unselectedclass:"unselectednew1", selectedclass:"selectednew1"},
            option2: {id:2, caption:"...des amis", unselectedclass:"unselectednew2", selectedclass:"selectednew2"},
            option3: {id:3, caption:"...des collègues", unselectedclass:"unselectednew3", selectedclass:"selectednew3"},
            option4: {id:4, caption:"...des supérieurs et RH", unselectedclass:"unselectednew4", selectedclass:"selectednew4"}
        },
        card44 : {
            parameters:{
                cardtype:"info",
                instruction:"Ceci est une carte d'information. A vous de lire ou de regarder attentivement. ",
                questioncaption: "Nouvelle série de cartes à swiper !",
                cardcomponentname: "CsInfoComponent"
            },
            optional : {
                imageurl:"",
                videourl:"",
                text:"Les prochaines cartes te demanderont si tu connais déjà des personnes qui pourraient t'aider à avancer sur différents points de ton projet. Lis bien les cartes avant de swiper à gauche pour dire NON, ou à droite pour dire OUI.",
                timer:true,
                autotime:true,
                textanimation:true,
                time:0//in milliseconds
            }
        },
        card45 : {
            parameters:{
                cardtype:"Swipecards",
                instruction:"Jeu de cartes: fais glisser les cartes à gauche pour répondre par non ou à droite pour répondre par oui",
                questioncaption: "Tu connais quelqu'un qui...",
                cardcomponentname: "CsSwipecardComponent",
                options:[1,2,3,4],
                maxselected:4
            },
            optional : {
            },
            option1: {id:1, caption:"...travaille dans le secteur qui m'intéresse.", backgroundclass:"swipecard_1 background_5", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-arrow-collapse-all gradient5 swipecardicon"},
            option2: {id:2, caption:"...exerce le métier qui m'intéresse.", backgroundclass:"swipecard_1 background_6", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-android-studio gradient6 swipecardicon"},
            option3: {id:3, caption:"...semble épanoui dans son travail.", backgroundclass:"swipecard_1 background_7", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-flower gradient7 swipecardicon"},
            option4: {id:4, caption:"...a déjà changé de métier et pourrait m'en parler.", backgroundclass:"swipecard_1 background_8", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-autorenew gradient8 swipecardicon"},
        },
        card46 : {
            parameters:{
                cardtype:"info",
                instruction:"Ceci est une carte d'information. A vous de lire ou de regarder attentivement. ",
                questioncaption: "Encore une petite série !",
                cardcomponentname: "CsInfoComponent"
            },
            optional : {
                imageurl:"",
                videourl:"",
                text:"Les prochaines cartes te demanderont ce que tu as fait jusque-là pour élargir ton réseau professionnel.",
                timer:true,
                autotime:true,
                textanimation:true,
                time:0//in milliseconds
            }
        },
        card47 : {
            parameters:{
                cardtype:"Swipecards",
                instruction:"Jeu de cartes: fais glisser les cartes à droite pour répondre par oui et à gauche pour répondre par non",
                questioncaption: "Pour élargir mon réseau professionnel, tu as...",
                cardcomponentname: "CsSwipecardComponent",
                options:[1,2,3,4,5,6,7,8],
                maxselected:8
            },
            optional : {
            },
            option1: {id:1, caption:"...contacté des gens sur des réseaux sociaux professionnels.", backgroundclass:"swipecard_1 background_1", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-linkedin-box gradient1 swipecardicon"},
            option2: {id:2, caption:"...participé à des événements permettant de réseauter.", backgroundclass:"swipecard_1 background_2", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-martini gradient2 swipecardicon"},
            option3: {id:3, caption:"...pris contact avec une association d'anciens élèves.", backgroundclass:"swipecard_1 background_3", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-school gradient3 swipecardicon"},
            option4: {id:4, caption:"...participé à des journées portes ouvertes.", backgroundclass:"swipecard_1 background_4", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-door-open gradient4 swipecardicon"},
            option5: {id:5, caption:"...fait un tour dans un salon professionnel.", backgroundclass:"swipecard_1 background_5", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-calendar-text gradient5 swipecardicon"},
            option6: {id:6, caption:"...utilisé une application de mise en relation (hors lunchtime).", backgroundclass:"swipecard_1 background_6", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-cellphone gradient6 swipecardicon"},
            option7: {id:7, caption:"...pris contact avec des fédérations professionnelles.", backgroundclass:"swipecard_1 background_7", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-domain gradient7 swipecardicon"},
            option8: {id:8, caption:"...contacté des organismes publics pour m'accompagner.", backgroundclass:"swipecard_1 background_8", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-bank gradient8 swipecardicon"},
        },
        card48 : {
            parameters:{
                cardtype:"Placement simple",
                instruction:"Pour répondre à la question, déplacez le curseur selon votre situation.",
                questioncaption: "Pour toi, partir à la rencontre de nouvelles personnes, c'est plutôt...",
                cardcomponentname: "CsPlacementsimpleComponent",
                step :10,//min = 1
                min: 0,
                max: 100,
                options: [1,2],
                cursorcaption:"toi"
            },
            optional : {
            },
            options : {
                option1 : {
                    id:1,
                    left:"0%",
                    stepposition : 0,
                    bulletcaption:"1",
                    bulletclass:"csplacementsimple_bullet_green",
                    caption:"...simple !",
                    captionclass:"csplacementsimple_caption_green"
                },
                option2 : {
                    id:2,
                    left:"100%",
                    stepposition : 100,
                    bulletcaption:"2",
                    bulletclass:"csplacementsimple_bullet_red",
                    caption:"...difficile !",
                    captionclass:"csplacementsimple_caption_red"
                }
            }
        },
        card60 : {
            parameters:{
                cardtype:"info",
                instruction:"Ceci est une carte d'information. Lis-la attentivement et appuie sur le bouton vert quand tu as terminé.",
                questioncaption: "A quoi sert ce quizz ?",
                cardcomponentname: "CsInfoComponent"
            },
            optional : {
                imageurl:"",
                videourl:"",
                text:"Changer de métier, c'est d'abord une démache intérieure consistant à mieux se connaître. <nl> Connais-tu bien ta propre personnalité, tes forces et faiblesses, tes envies et motivations ? <nl> <nl> Découvre les différentes démarches à entreprendre dans ce quizz.",
                timer:true,
                autotime:true,
                textanimation:true,
                time:0//in milliseconds
            }
        },
        card61 : {
            parameters:{
                cardtype:"multiplechoice_multiple", 
                instruction:"Choix multiple: sélectionne la réponse qui te correspond", 
                questioncaption: "Sais-tu ce que c'est qu'un test de personnalité ?",
                cardcomponentname: "CsMultipleChoiceComponent",
                options:[1,2],
                minselected:1,
                maxselected:1
            },
            optional : {
            },
            option1: {id:1, caption:'OUI', unselectedclass:"unselected5", selectedclass:"selected5"},
            option2: {id:2, caption:'NON', unselectedclass:"unselected4", selectedclass:"selected4"}
        },
        card62 : {
            parameters:{
                cardtype:"multiplechoice_multiple", 
                instruction:"Choix multiple: sélectionne la réponse qui te correspond", 
                questioncaption: "As-tu déjà fait un test de personnalité ?",
                cardcomponentname: "CsMultipleChoiceComponent",
                options:[1,2],
                minselected:1,
                maxselected:1
            },
            optional : {
                condition: [{experience:"4-61-1",value:true, compulsory:true}],//this means that this card is not necessarily shown
            },
            option1: {id:1, caption:'OUI', unselectedclass:"unselected5", selectedclass:"selected5"},
            option2: {id:2, caption:'NON', unselectedclass:"unselected4", selectedclass:"selected4"}
        },
        card63 : {
            parameters:{
                cardtype:"info",
                instruction:"Ceci est une carte d'information. Lis-la attentivement et appuie sur le bouton vert quand tu as terminé.",
                questioncaption: "A quoi sert un test de personnalité ?",
                cardcomponentname: "CsInfoComponent"
            },
            optional : {
                condition: [{experience:"4-61-2",value:true, compulsory:true}],//this means that this card is not necessarily shown
                imageurl:"",
                videourl:"",
                text:"Les tests de personnalité sont un outil intéressant pour mieux se connaître, savoir quels sont ses talents, ses points forts et aussi ses points de vigilance. <nl> <nl> C'est aussi particulièrement utile pour trouver le bon poste ou le bon métier.",
                timer:true,
                autotime:true,
                textanimation:true,
                time:0//in milliseconds
            }
        },
        card64 : {
            parameters:{
                cardtype:"multiplechoice_multiple", 
                instruction:"Choix multiple: sélectionne la réponse qui te correspond", 
                questioncaption: "Que penses-tu des tests de personnalité ?",
                cardcomponentname: "CsMultipleChoiceComponent",
                options:[1,2,3,4],
                minselected:1,
                maxselected:4
            },
            optional : {
                condition: [{experience:"4-62-1",value:true, compulsory:true}],//this means that this card is not necessarily shown
            },
            option1: {id:1, caption:"Ils m'ont aidé à mieux me connaître.", unselectedclass:"unselectednew1", selectedclass:"selectednew1"},
            option2: {id:2, caption:"Je ne sais pas trop que faire avec mon profil.", unselectedclass:"unselectednew2", selectedclass:"selectednew2"},
            option3: {id:3, caption:"Je ne me reconnaît pas dans les résultats.", unselectedclass:"unselectednew3", selectedclass:"selectednew3"},
            option4: {id:4, caption:"Je ne vois pas vraiment à quoi ça sert.", unselectedclass:"unselectednew4", selectedclass:"selectednew4"}
        },
        card65 : {
            parameters:{
                cardtype:"info",
                instruction:"Ceci est une carte d'information. Lis-la attentivement et appuie sur le bouton vert quand tu as terminé.",
                questioncaption: "Presque terminé !",
                cardcomponentname: "CsInfoComponent"
            },
            optional : {
                imageurl:"",
                videourl:"",
                text:"Et pour la fin de ce quizz, une petite série de questions pour mieux situer ton besoin !",
                timer:true,
                autotime:true,
                textanimation:true,
                time:0//in milliseconds
            }
        },
        card66 : {
            parameters:{
                cardtype:"Placement simple",
                instruction:"Pour répondre à la question, déplace le curseur selon ta situation.",
                questioncaption: "Te connais-tu bien ?",
                cardcomponentname: "CsPlacementsimpleComponent",
                step :10,//min = 1
                min: 0,
                max: 100,
                options: [1,2,3],
                cursorcaption:"toi"
            },
            optional : {
            },
            options : {
                option1 : {
                    id:1,
                    left:"0%",
                    stepposition : 0,
                    bulletcaption:"+",
                    bulletclass:"csplacementsimple_bullet_green",
                    caption:"Oui, je me connais assez bien.",
                    captionclass:"csplacementsimple_caption_green"
                },
                option2 : {
                    id:2,
                    left:"50%",
                    stepposition : 50,
                    bulletcaption:"=",
                    bulletclass:"csplacementsimple_bullet_yellow",
                    caption:"Oui, mais peut-être pas assez.",
                    captionclass:"csplacementsimple_caption_yellow"
                },
                option3 : {
                    id:2,
                    left:"100%",
                    stepposition : 100,
                    bulletcaption:"-",
                    bulletclass:"csplacementsimple_bullet_red",
                    caption:"Non, je ne me connais pas assez.",
                    captionclass:"csplacementsimple_caption_red"
                }
            }
        },
        card67 : {
            parameters:{
                cardtype:"Placement simple",
                instruction:"Pour répondre à la question, déplace le curseur selon ta situation.",
                questioncaption: "Sais-tu ce que tu sais faire ?",
                cardcomponentname: "CsPlacementsimpleComponent",
                step :10,//min = 1
                min: 0,
                max: 100,
                options: [1,2],
                cursorcaption:"toi"
            },
            optional : {
            },
            options : {
                option1 : {
                    id:1,
                    left:"0%",
                    stepposition : 0,
                    bulletcaption:"+",
                    bulletclass:"csplacementsimple_bullet_green",
                    caption:"Oui, je connais bien mes compétences.",
                    captionclass:"csplacementsimple_caption_green"
                },
                option2 : {
                    id:2,
                    left:"100%",
                    stepposition : 100,
                    bulletcaption:"-",
                    bulletclass:"csplacementsimple_bullet_red",
                    caption:"Non, je ne connais pas assez mes compétences.",
                    captionclass:"csplacementsimple_caption_red"
                }
            }
        },
        card68 : {
            parameters:{
                cardtype:"Placement simple",
                instruction:"Pour répondre à la question, déplace le curseur selon ta situation.",
                questioncaption: "Sais-tu ce qui te fait réellement plaisir au travail ?",
                cardcomponentname: "CsPlacementsimpleComponent",
                step :10,//min = 1
                min: 0,
                max: 100,
                options: [1,2],
                cursorcaption:"toi"
            },
            optional : {
            },
            options : {
                option1 : {
                    id:1,
                    left:"0%",
                    stepposition : 0,
                    bulletcaption:"+",
                    bulletclass:"csplacementsimple_bullet_green",
                    caption:"Oui, je sais ce qui me plaît au travail.",
                    captionclass:"csplacementsimple_caption_green"
                },
                option2 : {
                    id:2,
                    left:"100%",
                    stepposition : 100,
                    bulletcaption:"-",
                    bulletclass:"csplacementsimple_bullet_red",
                    caption:"Non, je ne le sais pas assez.",
                    captionclass:"csplacementsimple_caption_red"
                }
            }
        },
        card80 : {
            parameters:{
                cardtype:"info",
                instruction:"Ceci est une carte d'information. Lis-la attentivement et appuie sur le bouton vert quand tu as terminé.",
                questioncaption: "A quoi sert ce quizz ?",
                cardcomponentname: "CsInfoComponent"
            },
            optional : {
                imageurl:"",
                videourl:"",
                text:"Ce quizz te guide à travers les questions portant sur ta future profession ! <nl>",
                timer:true,
                autotime:true,
                textanimation:true,
                time:0//in milliseconds
            }
        },
        card81 : {
            parameters:{
                cardtype:"Placement simple",
                instruction:"Pour répondre à la question, déplace le curseur selon ta situation.",
                questioncaption: "As-tu besoin d'aide pour choisir ton nouveau métier ?",
                cardcomponentname: "CsPlacementsimpleComponent",
                step :10,//min = 1
                min: 0,
                max: 100,
                options: [1,2],
                cursorcaption:"toi"
            },
            optional : {
            },
            options : {
                option1 : {
                    id:1,
                    left:"0%",
                    stepposition : 0,
                    bulletcaption:"+",
                    bulletclass:"csplacementsimple_bullet_green",
                    caption:"Oui, j'ai besoin d'aide !",
                    captionclass:"csplacementsimple_caption_green"
                },
                option2 : {
                    id:2,
                    left:"100%",
                    stepposition : 100,
                    bulletcaption:"-",
                    bulletclass:"csplacementsimple_bullet_red",
                    caption:"Non merci. J'ai ce qu'il faut !",
                    captionclass:"csplacementsimple_caption_red"
                }
            }
        },
        card82 : {
            parameters:{
                cardtype:"multiplechoice_multiple", 
                instruction:"Choix multiple: sélectionne la réponse qui te correspond", 
                questioncaption: "As-tu trouvé ton métier de rêve ?",
                cardcomponentname: "CsMultipleChoiceComponent",
                options:[1,2],
                minselected:1,
                maxselected:1
            },
            optional : {
            },
            option1: {id:1, caption:"NON", unselectedclass:"unselectednew8", selectedclass:"selectednew8"},
            option2: {id:2, caption:"OUI", unselectedclass:"unselectednew9", selectedclass:"selectednew9"},
        },
        card83 : {
            parameters:{
                cardtype:"orderrelative",
                instruction:"Distribution de points : distribue les 10 points selon ce qui correspond le plus à ta situation en cliquant sur les différents champs.",
                questioncaption: "Quelles situations te correspondent le plus ?",
                cardcomponentname: "CsOrderrelativeComponent",
                maxpoints: 10,
                options:[1,2,3,4]
            },
            optional : {
                condition: [{experience:"5-82-1",value:true, compulsory:true}],//this means that this card is not necessarily shown
            },
            option1: {id:1, caption:"Je n'arrive pas à trouver de nouveau métier.", optionvalue:0, basicclass:"unselectednew9", actionclass:"action1"},
            option2: {id:2, caption:"Je ne trouve pas de métier qui m'intéresse vraiment.", optionvalue:0, basicclass:"unselectednew8", actionclass:"action2"},
            option3: {id:3, caption:"J'ai trouvé un ou plusieurs métiers dont je ne suis pas sûr.", optionvalue:0, basicclass:"unselectednew7", actionclass:"action3"},
            option4: {id:4, caption:"Il y a trop de métiers qui m'intéressent.", optionvalue:0, basicclass:"unselectednew6", actionclass:"action4"},
        },
        card84 : {
            parameters:{
                cardtype:"info",
                instruction:"Ceci est une carte d'information. Lis-la attentivement et appuie sur le bouton vert quand tu as terminé.",
                questioncaption: "Cartes à swiper !",
                cardcomponentname: "CsInfoComponent"
            },
            optional : {
                condition: [{experience:"5-82-2",value:true, compulsory:true}],//this means that this card is not necessarily shown
                imageurl:"",
                videourl:"",
                text:"Et maintenant une série de questions fermées oui/non sur ton métier de rêve ! <nl> Lis bien la question avant de 'swiper' à gauche pour dire NON et à droite pour dire OUI.",
                timer:true,
                autotime:true,
                textanimation:true,
                time:0//in milliseconds
            }
        },
        card85 : {
            parameters:{
                cardtype:"Swipecards",
                instruction:"Jeu de cartes: fais glisser les cartes à droite pour répondre par oui et à gauche pour répondre par non",
                questioncaption: "A propos de ton métier de rêve",
                cardcomponentname: "CsSwipecardComponent",
                options:[1,2,3,4,5,6,7],
                maxselected:8
            },
            optional : {
                condition: [{experience:"5-82-2",value:true, compulsory:true}],//this means that this card is not necessarily shown
            },
            option1: {id:1, caption:"Je pense que j'ai trouvé un métier réaliste.", backgroundclass:"swipecard_1 background_1", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-thumb-up gradientnew1 swipecardicon"},
            option2: {id:2, caption:"Je sais quelles compétences sont nécessaires pour pratiquer ce métier.", backgroundclass:"swipecard_1 background_2", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-auto-fix gradientnew2 swipecardicon"},
            option3: {id:3, caption:"Je sais dans quelles organisations je peux exercer ce métier.", backgroundclass:"swipecard_1 background_3", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-factory gradientnew3 swipecardicon"},
            option4: {id:4, caption:"Je sais s'il y a des offres d'emploi dans ce métier.", backgroundclass:"swipecard_1 background_4", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-star-circle gradientnew4 swipecardicon"},
            option5: {id:5, caption:"Je connais les formations qui me seront utiles.", backgroundclass:"swipecard_1 background_5", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-school gradientnew5 swipecardicon"},
            option6: {id:6, caption:"Je connais quelqu'un qui exerce ce métier.", backgroundclass:"swipecard_1 background_6", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-wechat gradientnew6 swipecardicon"},
            option7: {id:7, caption:"Je suis fait pour ce métier !", backgroundclass:"swipecard_1 background_7", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-emoticon-cool gradientnew7 swipecardicon"},
            option8: {id:8, caption:"Je sais s'il y a des opportunités dans ma région.", backgroundclass:"swipecard_1 background_8", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-earth gradientnew8 swipecardicon"},
            option9: {id:9, caption:"J'ai déjà pris contact avec des employeurs potentiels.", backgroundclass:"swipecard_1 background_9", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-contact-mail gradientnew9 swipecardicon"}
        },
        card86 : {
            parameters:{
                cardtype:"multiplechoice_multiple", 
                instruction:"Choix multiple: sélectionne toutes les réponses qui te correspondent", 
                questioncaption: "Quelles citations te correspondent ?",
                titlecaption: "Mon métier, je veux l'exercer...",
                cardcomponentname: "CsMultipleChoiceComponent",
                options:[1,2,3,4,5,6,7],
                minselected:1
            },
            optional : {
            },
            option1: {id:1, caption:"...dans une entreprise privée.", unselectedclass:"unselected1", selectedclass:"selected1"},
            option2: {id:2, caption:"...dans une institution publique.", unselectedclass:"unselected2", selectedclass:"selected2"},
            option3: {id:3, caption:"...dans une association / ONG.", unselectedclass:"unselected3", selectedclass:"selected3"},
            option4: {id:4, caption:"...en tant qu'entrepreneur(e)", unselectedclass:"unselected4", selectedclass:"selected4"},
            option5: {id:5, caption:"...en tant que professionnel(le) indépendant(e)", unselectedclass:"unselected5", selectedclass:"selected5"},
            option6: {id:6, caption:"...en reprenant une société avec des employés", unselectedclass:"unselected6", selectedclass:"selected6"},
            option7: {id:7, caption:"...n'importe où. Aucune idée.", unselectedclass:"unselected7", selectedclass:"selected7"}
        },
        card100 : {
            parameters:{
                cardtype:"info",
                instruction:"Ceci est une carte d'information. Lis-la attentivement et appuie sur le bouton vert quand tu as terminé.",
                questioncaption: "Quels secteurs t'intéressent ?",
                cardcomponentname: "CsInfoComponent"
            },
            optional : {
                condition: false,
                imageurl:"",
                videourl:"",
                text:"Dans ce quizz, fais le point sur ton choix de secteur avant de parcourir différentes suggestions.",
                timer:true,
                autotime:true,
                textanimation:true,
                time:0//in milliseconds
            }
        },
        card101 : {
            parameters:{
                cardtype:"Placement simple",
                instruction:"Pour répondre à la question, déplace le curseur selon ta situation.",
                questioncaption: "Sais-tu dans quel(s) secteur(s) tu souhaites travailler ?",
                cardcomponentname: "CsPlacementsimpleComponent",
                step :10,//min = 1
                min: 0,
                max: 100,
                options: [1,2],
                cursorcaption:"toi"
            },
            optional : {
            },
            options : {
                option1 : {
                    id:1,
                    left:"0%",
                    stepposition : 0,
                    bulletcaption:"+",
                    bulletclass:"csplacementsimple_bullet_green",
                    caption:"Oui, absolument !",
                    captionclass:"csplacementsimple_caption_green"
                },
                option2 : {
                    id:2,
                    left:"100%",
                    stepposition : 100,
                    bulletcaption:"-",
                    bulletclass:"csplacementsimple_bullet_red",
                    caption:"Non, pas du tout !",
                    captionclass:"csplacementsimple_caption_red"
                }
            }
        },        
        card102 : {
            parameters:{
                cardtype:"multiplechoice_multiple", 
                instruction:"Choix multiple: sélectionne toutes les réponses qui te correspondent", 
                questioncaption: "Quelles citations correspondent à ta situation ?",
                titlecaption: "",
                cardcomponentname: "CsMultipleChoiceComponent",
                options:[1,2,3,4],
                minselected:0
            },
            optional : {
            },
            option1: {id:1, caption:"Je voudrais découvrir de nouveaux secteurs.", unselectedclass:"unselected2", selectedclass:"selected2"},
            option2: {id:2, caption:"J'ai du mal à choisir un secteur en particulier.", unselectedclass:"unselected3", selectedclass:"selected3"},
            option3: {id:3, caption:"Je sais quelles causes m'intéressent.", unselectedclass:"unselected4", selectedclass:"selected4"},
            option4: {id:4, caption:"Je veux rencontrer un professionnel d'un secteur.", unselectedclass:"unselected5", selectedclass:"selected5"}
        },
        card103 : {
            parameters:{
                cardtype:"Placement simple",
                instruction:"Pour répondre à la question, déplace le curseur selon ta situation.",
                questioncaption: "As-tu besoin d'aide pour découvrir des secteurs d'activité ?",
                cardcomponentname: "CsPlacementsimpleComponent",
                step :10,//min = 1
                min: 0,
                max: 100,
                options: [1,2],
                cursorcaption:"toi"
            },
            optional : {
                condition: [{experience:"6-102-1",value:true, compulsory:true}],//this means that this card is not necessarily shown
            },
            options : {
                option1 : {
                    id:1,
                    left:"0%",
                    stepposition : 0,
                    bulletcaption:"+",
                    bulletclass:"csplacementsimple_bullet_green",
                    caption:"Oui, j'ai besoin d'aide !",
                    captionclass:"csplacementsimple_caption_green"
                },
                option2 : {
                    id:2,
                    left:"100%",
                    stepposition : 100,
                    bulletcaption:"-",
                    bulletclass:"csplacementsimple_bullet_red",
                    caption:"Non merci. J'ai ce qu'il faut !",
                    captionclass:"csplacementsimple_caption_red"
                }
            }
        },
        card104 : {
            parameters:{
                cardtype:"Placement simple",
                instruction:"Pour répondre à la question, déplace le curseur selon ta situation.",
                questioncaption: "Est-ce important pour toi de travailler dans le bon secteur ?",
                cardcomponentname: "CsPlacementsimpleComponent",
                step :10,//min = 1
                min: 0,
                max: 100,
                options: [1,2],
                cursorcaption:"toi"
            },
            optional : {
            },
            options : {
                option1 : {
                    id:1,
                    left:"0%",
                    stepposition : 0,
                    bulletcaption:"+",
                    bulletclass:"csplacementsimple_bullet_green",
                    caption:"Oui, le secteur est très important !",
                    captionclass:"csplacementsimple_caption_green"
                },
                option2 : {
                    id:2,
                    left:"100%",
                    stepposition : 100,
                    bulletcaption:"-",
                    bulletclass:"csplacementsimple_bullet_red",
                    caption:"Non, le secteur est secondaire.",
                    captionclass:"csplacementsimple_caption_red"
                }
            }
        },
        card105 : {
            parameters:{
                cardtype:"info",
                instruction:"Ceci est une carte d'information. Lis-la attentivement et appuie sur le bouton vert quand tu as terminé.",
                questioncaption: "Cartes à swiper !",
                cardcomponentname: "CsInfoComponent"
            },
            optional : {
                condition: false,
                imageurl:"",
                videourl:"",
                text:"Pour terminer, une série de cartes à swiper. <nl> Sur chaque carte, un secteur. <nl> Si le secteur t'intéresse, swipe la carte à droite. <nl> Sinon, swipe-la à gauche.",
                timer:true,
                autotime:true,
                textanimation:true,
                time:0//in milliseconds
            }
        },          
        card106 : {
            parameters:{
                cardtype:"Swipecards",
                instruction:"Jeu de cartes: fais glisser les cartes à droite pour répondre par oui et à gauche pour répondre par non",
                questioncaption: "A propos de ton métier de rêve",
                cardcomponentname: "CsSwipecardComponent",
                options:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19]
            },
            optional : {
            },
            option1: {id:1, caption:"Agroalimentaire", backgroundclass:"swipecard_1 backgroundnew_1", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-corn gradientnew1 swipecardicon"},
            option2: {id:2, caption:"Banque & assurance", backgroundclass:"swipecard_1 backgroundnew_2", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-cash-multiple gradientnew2 swipecardicon"},
            option3: {id:3, caption:"Bois / Papier / Carton / Imprimerie", backgroundclass:"swipecard_1 backgroundnew_3", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-paper-cut-vertical gradientnew3 swipecardicon"},
            option4: {id:4, caption:"BTP / Matériaux de construction", backgroundclass:"swipecard_1 backgroundnew_4", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-worker gradientnew4 swipecardicon"},
            option5: {id:5, caption:"Chimie / Parachimie", backgroundclass:"swipecard_1 backgroundnew_5", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-test-tube gradientnew5 swipecardicon"},
            option6: {id:6, caption:"Commerce / Négoce / Distribution", backgroundclass:"swipecard_1 backgroundnew_6", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-store gradientnew6 swipecardicon"},
            option7: {id:7, caption:"Edition / Communication / Multimédia", backgroundclass:"swipecard_1 backgroundnew_7", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-television-classic gradientnew7 swipecardicon"},
            option8: {id:8, caption:"Electronique / Electricité", backgroundclass:"swipecard_1 backgroundnew_8", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-flash gradientnew8 swipecardicon"},
            option9: {id:9, caption:"Etudes & conseils", backgroundclass:"swipecard_1 backgroundnew_9", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-book-open gradientnew9 swipecardicon"},
            option10: {id:10, caption:"Industrie pharmaceutique", backgroundclass:"swipecard_1 backgroundnew_1", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-pharmacy gradientnew1 swipecardicon"},
            option11: {id:11, caption:"Informatique / Télécoms", backgroundclass:"swipecard_1 backgroundnew_2", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-desktop-classic gradientnew2 swipecardicon"},
            option12: {id:12, caption:"Machines et équipements / Automobile", backgroundclass:"swipecard_1 backgroundnew_3", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-settings gradientnew3 swipecardicon"},
            option13: {id:13, caption:"Métallurgie / Travail du métal", backgroundclass:"swipecard_1 backgroundnew_4", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-factory gradientnew4 swipecardicon"},
            option14: {id:14, caption:"Plastique / Caoutchouc", backgroundclass:"swipecard_1 backgroundnew_5", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-eraser gradientnew5 swipecardicon"},
            option15: {id:15, caption:"Services aux entreprises", backgroundclass:"swipecard_1 backgroundnew_6", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-blur gradientnew6 swipecardicon"},
            option16: {id:16, caption:"Textile / Habillement / Chaussure", backgroundclass:"swipecard_1 backgroundnew_7", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-tshirt-crew gradientnew7 swipecardicon"},
            option17: {id:17, caption:"Transports / Logistique", backgroundclass:"swipecard_1 backgroundnew_8", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-truck-fast gradientnew8 swipecardicon"},
            option18: {id:18, caption:"Education / Recherche", backgroundclass:"swipecard_1 backgroundnew_9", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-school gradientnew9 swipecardicon"},
            option19: {id:19, caption:"Santé / Médecine", backgroundclass:"swipecard_1 backgroundnew_1", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-medical-bag gradientnew1 swipecardicon"}
        },
        card120 : {
            parameters:{
                cardtype:"info",
                instruction:"Ceci est une carte d'information. Lis-la attentivement et appuie sur le bouton vert quand tu as terminé.",
                questioncaption: "Top départ pour l'insertion !",
                cardcomponentname: "CsInfoComponent"
            },
            optional : {
                condition: false,
                imageurl:"",
                videourl:"",
                text:"De quoi as-tu besoin pour ton insertion ? <nl> Commençons par une série de cartes à swiper pour faire le point ! <nl> droite = oui <nl> gauche = non",
                timer:true,
                autotime:true,
                textanimation:true,
                time:0//in milliseconds
            }
        },
        card121 : {
            parameters:{
                cardtype:"Swipecards",
                instruction:"Jeu de cartes: fais glisser les cartes à droite pour répondre par oui et à gauche pour répondre par non",
                questioncaption: "As-tu besoin d'aide pour...",
                cardcomponentname: "CsSwipecardComponent",
                options:[1,2,3,4,5,6,7,8,9,10,11,12,13]
            },
            optional : {
            },
            option1: {id:1, caption:"...trouver des entreprises à contacter ?", backgroundclass:"swipecard_1 backgroundnew_1", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-account-search gradientnew1 swipecardicon"},
            option2: {id:2, caption:"...trouver des annonces d'emploi ?", backgroundclass:"swipecard_1 backgroundnew_2", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-search-web gradientnew2 swipecardicon"},
            option3: {id:3, caption:"...t'inscrire dans une agence intérim ?", backgroundclass:"swipecard_1 backgroundnew_3", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-lead-pencil gradientnew3 swipecardicon"},
            option4: {id:4, caption:"...te renseigner sur des opportunités dans ton réseau ?", backgroundclass:"swipecard_1 backgroundnew_4", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-account-network gradientnew4 swipecardicon"},
            option5: {id:5, caption:"...appeler spontanément des employeurs potentiels ?", backgroundclass:"swipecard_1 backgroundnew_5", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-phone-classic gradientnew5 swipecardicon"},
            option6: {id:6, caption:"...créer ton profil LinkedIn ou Viadeo ?", backgroundclass:"swipecard_1 backgroundnew_6", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-linkedin-box gradientnew6 swipecardicon"},
            option7: {id:7, caption:"...actualiser ton cv ?", backgroundclass:"swipecard_1 backgroundnew_7", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-account-card-details gradientnew7 swipecardicon"},
            option8: {id:8, caption:"...rédiger ta lettre de motivation pour une annonce ?", backgroundclass:"swipecard_1 backgroundnew_8", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-pen gradientnew8 swipecardicon"},
            option9: {id:9, caption:"...rédiger des e-mails professionnels ?", backgroundclass:"swipecard_1 backgroundnew_9", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-email gradientnew9 swipecardicon"},
            option10: {id:10, caption:"...te préparer aux entretiens d'embauche ?", backgroundclass:"swipecard_1 backgroundnew_1", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-bullseye gradientnew1 swipecardicon"},
            option11: {id:11, caption:"...être plus à l'aise dans un entretien physique ?", backgroundclass:"swipecard_1 backgroundnew_2", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-message gradientnew2 swipecardicon"},
            option12: {id:12, caption:"...être plus à l'aise dans un entretien par téléphone ?", backgroundclass:"swipecard_1 backgroundnew_3", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-phone-classic gradientnew3 swipecardicon"},
            option13: {id:13, caption:"...mieux présenter ton parcours ?", backgroundclass:"swipecard_1 backgroundnew_4", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-map gradientnew4 swipecardicon"}
        },
        card122 : {
            parameters:{
                cardtype:"Placement simple",
                instruction:"Pour répondre à la question, déplace le curseur selon ta situation.",
                questioncaption: "Sais-tu évaluer tes chances d'obtenir un travail dans le métier que tu as choisi ?",
                cardcomponentname: "CsPlacementsimpleComponent",
                step :10,//min = 1
                min: 0,
                max: 100,
                options: [1,2],
                cursorcaption:"toi"
            },
            optional : {
            },
            options : {
                option1 : {
                    id:1,
                    left:"0%",
                    stepposition : 0,
                    bulletcaption:"+",
                    bulletclass:"csplacementsimple_bullet_green",
                    caption:"Oui, absolument !",
                    captionclass:"csplacementsimple_caption_green"
                },
                option2 : {
                    id:2,
                    left:"100%",
                    stepposition : 100,
                    bulletcaption:"-",
                    bulletclass:"csplacementsimple_bullet_red",
                    caption:"Pas du tout !",
                    captionclass:"csplacementsimple_caption_red"
                }
            }
        }
    }
}
