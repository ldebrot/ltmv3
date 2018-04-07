import { Injectable } from '@angular/core';

//This service evaluates the experience saved in dbuserinfo Service
@Injectable()
export class ScoringevaluateService {
    
    constructor() { }

    //VALUE CREATION CYCLE :
    // User creates experience values --> stored in profile (correspond to cards)
    // Pre-scoring cycles trough prescoring items to process experience values created by user --> stored in new experience ids (which do not correspond to cards)
    // Guide cycles trough score items, using experience values created during pre-scoring process --> stored results in guideresult
    //
    //SCORING : A Two-step process:
    //  1) A pre-scoring process creates values for each profile, which are stored in the profile
    //      The outcome of the pre-scoring process is a set of values which can be analyzed during the matching process by proximity_discrete, proximity_continuous, distance_discrete or distance_continuous 
    //      Preprocessing sets valuetype, experienceids, options, span and weighing of each score item
    //  2) A matching process based on pre-scoring values sorts out different user profiles 
    //
    //Let's take a complicated example: metiers matching, which is a three-level discrete_distance evaluation process involving the following variables of the metiers library : "grand domaine", "intitulé" and "libelle_appelation_court"
    //      During the pre-scoring process, the system calculates the user coefficient of the item (from 0 to 1)
    //      During the matching process, the system evaluates the probability of matching X out of Y items for each level (domaine, intitule, appelation court). 
    //      After going through this calculation, it sums up the matching score according to the indicated sumup mode

    //Pre-scoring process:
    //1) It takes the preprocessingids from scoreitem (which can be "x-xxx-x" for specific values or "-xxx-" for a set of values)
    //2) it checks whether these are discrete (true/false, arrays) or continuous (number, float) values (mixing discrete and continuous is not allowed)
    //3) discrete values : it sets up a lists of cards involved, it sums up the number of available options (MultipleChoice, Swipecards), then sets options
    //   continuous values : it normalises each value and takes the average (Orderrelative, Orderregular), then sets span

    //This function calculates all scoring items and saves it into a publicly accessible matrix
    public prescoringactiveuser(userid:string):void {

    }

    //This function compares the values of the active user to 
    public useguide(guideid:number):void{

    }

    //This guideresult stores the result of past guide evaluations
    public guideresults : any = {
        guideids : [1],
        guide1 : {
            userids : [123,456,789,321,654],
            lastevaluationdate : "07/04/2018-12h00",
            user123 : {
                username : "Marie",
                pictureurl : "Marie",
                scoreitemids : [2,3,6,20,21],
                values : [0.7,0.6,0.3,0.25,0.2],
            },
            user456 : {
                username : "Jean-Pierre",
                pictureurl : "Marie",
                scoreitemids : [6,7,21,20,31],
                values : [1,0.75,0.5,0.3,0.1],
            },
            user789 : {
                username : "Lucien",
                pictureurl : "Marie",
                scoreitemids : [1,10,6,20,21],
                values : [0.8,0.6,0.3,0.25,0.2],
            }
        }
    }

    //guides contains different guide settings in an array
    //evaluationmodes : 
    //      proximity_continuous = distance between values (3 - 2 = 1) over value span (5) : 1/5 = 20% -->  then reversed (1 - 20% = 80%)
    //      proximity_discrete = probability of matching over one (For instance, 3 options out of 6 are matching. Probability of 3/6 matching = 0.83% * 20 = 16%) --> then reversed and logarithmic value
    //      distance_continuous = proximity_continuous reversed
    //      proximity_discrete = proximity_discrete reversed
    //
    //sumupmodes : 
    //      "none" : no sum up required
    //      "average" : takes the average value of all scores as final score
    //      "weighing" : uses an array in storeitems which holds values totalling 1 and calculates final score by weighing each individual score accordingly  
    public guides : any = {
        guideids : [1],
        guide1 : {
            name:"Guide 1",
            description:"Evaluates individual experiences",
            maxitems:5,//show the first 5 of items
            scoreitems: [
                {id:1, evaluationmode:"proximity_continuous", coefficientmax:10, coefficientmin:0, usercoefficient:"xxx-xx-x", sumupmode:"none"},
                {id:2, evaluationmode:"proximity_discrete", coefficientmax:10, coefficientmin:0, usercoefficient:"xxx-xx-x", sumupmode:"weighing"}
            ]  
        }
    }

    //instructions for individual preprocessing
    public prescoringitems : any[] = [
        {id:0, name:"Dummy", description:"Dummy here", inputexperienceids: ["xxx-xx-x"], outputexperienceid: "xxx-xx-x"}
        //empty score item
    ]

    //instructions for score items used by guide
    public scoreitems : any[] = [
        {id:0, name:"Dummy", description:"Dummy here", experienceids: ["xxx-xx-x"]},
        //empty score item
        {id:1, name:"Séniorité", 
        description:"Années d'expérience professionnelle", 
        valuetype:"continuous", 
        experienceids:["xxx-xx-x"],
        options:[0], span:[0], weighing:[0]},
        //séniorité : une seule option possible, distance quantifiable
        //la valeur est une interprétation directe de la séniorité (0-3 ans -> 1, 4-6 ans -> 2, etc.)
        {id:2, name:"Métiers pré-reconversion", description:"Métiers exercés avant la reconversion", valuetype:"discrete", valueunique:false, coefficientmax:10, coefficientmin:0},
        //métiers passés : privilégier la proximité, plusieurs options possibles, distance quantifiable
        //La distance est qualifiée à partir de deux niveaux (valeurs interprétées) : grand domaine d'activité et intitulé (base Pôle emploi) 
        {id:3, name:"Métiers post-reconversion", description:"Métiers exercés ou visés après la reconversion", valuetype:"discrete", valueunique:false, coefficientmax:10, coefficientmin:0},
        //métiers visés : privilégier la proximité, plusieurs options possibles, distance quantifiable
        //La distance est qualifiée à partir de deux niveaux (valeurs interprétées) : grand domaine d'activité et intitulé (base Pôle emploi) 
        {id:4, name:"Secteur d'activité pré-reconversion", description:"Secteur(s) dans lesquel(s) la personne a travaillé avant sa reconversion", valuetype:"discrete", valueunique:false, coefficientmax:10, coefficientmin:0},
        //métiers visés : privilégier la proximité, plusieurs options possibles, distance (indirectement) quantifiable
        //La distance est quantifiée à partir d'une valeur (nombre de secteurs en commun) 
        {id:5, name:"Secteur d'activité pré-reconversion", description:"Secteur(s) dans lesquel(s) la personne a travaillé ou souhaite travailler après sa reconversion", valuetype:"discrete", valueunique:false, coefficientmax:10, coefficientmin:0},
        //métiers visés : privilégier la proximité, plusieurs options possibles, distance (indirectement) quantifiable
        //La distance est quantifiée à partir d'une valeur (nombre de secteurs en commun) 
        {id:6, name:"Raisons de la reconversion", description:"Raisons derrière la reconversion professionnelle", valuetype:"discrete", valueunique:false, coefficientmax:10, coefficientmin:0},
        //Raisons de la reconversion : privilégier la proximité, plusieurs options possibles, distance non-quantifiable
        //Matching direct de l'entrée des utilisateurs, sans interprétation
        {id:7, name:"Phase de la reconversion", description:"Phase de la reconversion professionnelle dans laquelle se trouve la personne.", valuetype:"discrete", valueunique:true, coefficientmax:10, coefficientmin:0},
        //métiers visés : privilégier l'écart', une seule option possible, distance quantifiable
        //Interprétation directe du choix des utilisateurs : réflexion -> 1, préparation -> 2, etc.
        {id:8, name:"Sexe", description:"Sexe de la personne", valuetype:"discrete", valueunique:true, coefficientmax:10, coefficientmin:0},
        //Sexe : privilégier la proximité, une seule option possible, distance quantifiable
        //Matching direct de l'entrée des utilisateurs, sans interprétation
        {id:9, name:"Situation d'activité post-reconversion", description:"La situation d'emploi après la reconversion: public/privé, emploi/indépendant, entrepreneuriat, etc.", valuetype:"discrete", valueunique:false, coefficientmax:10, coefficientmin:0},
        //Situation d'activité : privilégier la proximité, plusieurs options possibles, distance quantifiable
        //Interprétation directe du choix des utilisateurs : réflexion -> 1, préparation -> 2, etc.
        {id:10, name:"Localisation", description:"Zones géographiques dans laquelle la personne est disponible pour un rendez-vous", valuetype:"continuous", valueunique:true, coefficientmax:10, coefficientmin:0},
        //Localisation : privilégier la proximité, une seule option possible, distance quantifiable
        //Interprétation de la localisation des utilisateurs : écart entre les distances respectives du point (0,0)
        //Chaque utilisateur peut renseigner plusieurs localisations, on garde la combinaison la plus proche comme point de référence
        {id:20, name:"Se connaître", description:"La capacité à connaître ses envies, motivations, compétences, forces et faiblesses", valuetype:"continuous", valueunique:true, coefficientmax:10, coefficientmin:0},
        //Se connaître : privilégier l'écart, une seule option possible, distance quantifiable
        //Interprétation indirecte : combinaison d'une multitude de valeurs
        {id:21, name:"Trouver des idées de métier", description:"La capacité à s'inspirer et à trouver des pistes de métier", valuetype:"continuous", valueunique:true, coefficientmax:10, coefficientmin:0},
        //Trouver des idées de métier : privilégier l'écart, une seule option possible, distance quantifiable
        //Interprétation indirecte : combinaison d'une multitude de valeurs
        {id:22, name:"Choisir un métier", description:"La capacité à faire un choix éclairé de son nouveau métier tenant compte des opportunités sur le marché du travail", valuetype:"continuous", valueunique:true, coefficientmax:10, coefficientmin:0},
        //Choisir un métier : privilégier l'écart, une seule option possible, distance quantifiable
        //Interprétation indirecte : combinaison d'une multitude de valeurs
        {id:23, name:"Réseautage", description:"La capacité à développer et activer son réseau professionnel", valuetype:"continuous", valueunique:true, coefficientmax:10, coefficientmin:0},
        //Réseautage : privilégier l'écart,, une seule option possible, distance quantifiable
        //Interprétation indirecte : combinaison d'une multitude de valeurs
        {id:24, name:"Présenter son projet", description:"La capacité à présenter son projet de reconversion", valuetype:"continuous", valueunique:true, coefficientmax:10, coefficientmin:0},
        //Réseautage : privilégier l'écart, une seule option possible, distance quantifiable
        //Interprétation indirecte : combinaison d'une multitude de valeurs
        {id:25, name:"Postuler", description:"La capacité à postuler à une offre d'emploi à l'issue d'une reconversion", valuetype:"continuous", valueunique:true, coefficientmax:10, coefficientmin:0},
        //Réseautage : privilégier l'écart, une seule option possible, distance quantifiable
        //Interprétation indirecte : combinaison d'une multitude de valeurs
        {id:30, name:"S'organiser", description:"La capacité à procéder de façon méthodologique.", valuetype:"continuous", valueunique:true, coefficientmax:10, coefficientmin:0},
        //Réseautage : privilégier l'écart, une seule option possible, distance quantifiable
        //Interprétation indirecte : combinaison d'une multitude de valeurs
        {id:31, name:"Se motiver", description:"Retrouver confiance et du soutien dans son projet de reconversion.", valuetype:"continuous", valueunique:true, coefficientmax:10, coefficientmin:0}
        //Réseautage : privilégier l'écart, une seule option possible, distance quantifiable
        //Interprétation indirecte : combinaison d'une multitude de valeurs
    ]

    public cards : any = {
    }
}
