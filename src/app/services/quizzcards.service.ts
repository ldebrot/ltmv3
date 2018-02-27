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
                instruction:"Pour répondre à la question, déplacez le curseur selon votre situation.",
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
            option1: {id:1, caption:"...ma famille", unselectedclass:"unselected1", selectedclass:"selectednew1"},
            option2: {id:2, caption:"...des amis", unselectedclass:"unselected2", selectedclass:"selectednew2"},
            option3: {id:3, caption:"...des collègues", unselectedclass:"unselected3", selectedclass:"selectednew3"},
            option4: {id:4, caption:"...des supérieurs et RH", unselectedclass:"unselected4", selectedclass:"selectednew4"}
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
                text:"Les prochaines cartes te demanderont si tu connais déjà des personnes qui pourraient t'aider à avancer sur différents points de ton projet. Lis bien les cartes avant de swiper à gauche pour dire OUI, ou à droite pour dire NON.",
                timer:true,
                autotime:true,
                time:0//in milliseconds
            }
        },
        card45 : {
            parameters:{
                cardtype:"Swipecards",
                instruction:"Jeu de cartes: fais glisser les cartes à gauche pour répondre par oui ou à droite pour répondre par non",
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
                time:0//in milliseconds
            }
        },
        card47 : {
            parameters:{
                cardtype:"Swipecards",
                instruction:"Jeu de cartes: fais glisser les cartes à gauche pour répondre par oui ou à droite pour répondre par non",
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
            option5: {id:1, caption:"...fait un tour dans un salon professionnel.", backgroundclass:"swipecard_1 background_5", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-calendar-text gradient5 swipecardicon"},
            option6: {id:2, caption:"...utilisé une application de mise en relation (hors lunchtime).", backgroundclass:"swipecard_1 background_6", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-cellphone gradient6 swipecardicon"},
            option7: {id:3, caption:"...pris contact avec des fédérations professionnelles.", backgroundclass:"swipecard_1 background_7", 
            image:"", iconcontainerclass:"iconcontainer", iconclass:"mdi mdi-domain gradient7 swipecardicon"},
            option8: {id:4, caption:"...contacté des organismes publics pour m'accompagner.", backgroundclass:"swipecard_1 background_8", 
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
                text:"Changer de métier, c'est d'abord une démache intérieure consistant à mieux se connaître. Connais-tu bien ta propre personnalité, tes forces et faiblesses, tes envies et motivations ? Découvre les différentes démarches à entreprendre dans ce quizz.",
                timer:true,
                autotime:true,
                time:0//in milliseconds
            }
        },
    }
}
