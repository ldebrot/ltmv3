import { DbotherusersService } from './dbotherusersservice.service';
import { ReadwriteprescoreService } from './readwriteprescore.service';
import { QuizzcardsService } from './quizzcards.service';
import { DbuserinfoService } from './dbuserinfo.service';
import { Injectable } from '@angular/core';

//This service evaluates the experience saved in dbuserinfo Service
@Injectable()
export class ScoringevaluateService {
    
    constructor(
        private quizzcardservice : QuizzcardsService,
        private dbuserinfoservice : DbuserinfoService,
        private dbotherusersservice : DbotherusersService,
        private readwriteprescoreservice : ReadwriteprescoreService
    ) { }

    /*
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
    //experience is taken from active user, but for dev purposes, output can be saved for other users
    */

    public prescoringactiveuser(outputuserid:string):any {
        //prepares read-write service for prescoring
        this.readwriteprescoreservice.emptyprescorebuffer();

        //goes through prescoreitems
        console.log("prescoringactiveuser: there are "+this.prescoringitems.length+" items set up for prescoring");
        let temp_prescoreitem : any = [];
        let temp_prescorename = "";
        let temp_value : any
        this.prescoringitems.forEach((value, index)=>{
            temp_prescorename = value.prescorename;
            temp_prescoreitem = [];
            if (value.inputexperienceids.length > 0) {
                value.inputexperienceids.forEach((temp_inputexperienceid,experienceidindex) => {
                    //there are experience ids to be processed
                    console.log("prescoringactiveuser: am now processing experience ids");
                    temp_value = "";
                    //check if card and card type are valid and available
                    let temp_cardandoptionids = this.getcardandoptionids(temp_inputexperienceid);
                    if (temp_cardandoptionids != false) {
                        let temp_cardtype = this.getcardtype(temp_cardandoptionids.cardid);
                        console.log("prescoringactiveuser : cardcomponentname is "+temp_cardtype);

                        //now get saved experience 
                        console.log(this.dbuserinfoservice.userinfo.experience);
                        let temp_experiencevalue = this.getexperiencevalue(temp_cardandoptionids.cardid, temp_cardandoptionids.optionid);

                        //process according to card type
                        switch(temp_cardtype) {
                            case "CsPlacementsimpleComponent":
                                //register normalized value
                                temp_value = (temp_experiencevalue / this.quizzcardservice.cards["card"+temp_cardandoptionids.cardid].parameters.max)
                                break;
                            default:
                                console.log("prescoringactiveuser : cardcomponentname does not match any Component");
                                break;
                        }
                    }
                    temp_prescoreitem.push(temp_value);
                });

                //check if there is a sumup/weighing mode


                //Save prescores
                this.readwriteprescoreservice.addtoprescorebuffer(temp_prescorename,outputuserid,temp_prescoreitem);
                console.log("temp_prescoreitem");
                console.log(temp_prescoreitem);

            } else if (value.inputexperienceids.length == 0) {
                //there is no experience id to be processed
                console.log("prescoringactiveuser: error, there is no input experience id");
                return;
            } 

        });
        return this.readwriteprescoreservice.transmitprescorebuffer()
        .then(()=>{
            console.log("Done with prescoring");
        });
    }


//    /prescores/mumu

    public getexperiencevalue(cardid,optionid):any{
        console.log("I'm here!");
        let temp_value : any = null;
        let experiencecardid : any;
        let experienceoptionid : any;
        Object.keys(this.dbuserinfoservice.userinfo.experience).forEach((value, index)=>{
            experiencecardid = value.split("-")[1];
            experienceoptionid = value.split("-")[2];
            if (experiencecardid==String(cardid) && experienceoptionid==String(optionid)){
                temp_value = this.dbuserinfoservice.userinfo.experience[value]
            }
        });

        if (temp_value!=null) {
            console.log("getexperiencevalue: value is:");
            console.log(temp_value);
        }else {
            temp_value = false
            console.log("getexperiencevalue: did not get experiencevalue");
            console.log("cardid" + cardid);
            console.log("optionid" + optionid);
        }
        return temp_value
    }

    public getcardandoptionids(inputexperienceid):any {
        let temp_value : any = false;
        if (inputexperienceid.split("-").length == 3){
            let temp_cardid = inputexperienceid.split("-")[1];
            let temp_optionid = inputexperienceid.split("-")[2];
            //checks if card exists
            if (Object.keys(this.quizzcardservice.cards).includes("card"+temp_cardid)){
                temp_value = {};
                temp_value["cardid"] = temp_cardid;
                temp_value["optionid"] = temp_optionid;
            }
        }
        if (temp_value) {
            console.log("isinputexperienceidvalid : valid");
            console.log(temp_value);
        } else{
            console.log("isinputexperienceidvalid : INVALID");
        }
        return temp_value;
    }

    public getcardtype(cardid:any):any{
        return this.quizzcardservice.cards["card"+cardid].parameters.cardcomponentname;
    }

    //This function compares the values of the active user to 
    public useguide(guidename:string):any{
        let temp_promise_useguide = new Promise(
            (resolveuseguidetotal, reject) => {

                //Checks if guide exist
                let temp_guide = this.getitemfromarray_byvaluefromvariable(this.guides, "guidename", guidename);
                if (temp_guide) {
                    console.log("useguide: loaded guide: " + temp_guide.guidename);
                    this.guideresult_addguidename(temp_guide.guidename)

                    //load prescore experience from firebase
                    this.readwriteprescoreservice.getprescores((prescoresinput)=>{
                        console.log("Loaded prescores");
                        console.log(prescoresinput);
                        this.prescores = prescoresinput;

                        //loop through scoreitems of guide:
                        temp_guide.scoreitems.forEach((value, index) => {
                            console.log("useguide: load and process scoreitem: " + value.scorename);
                            this.processscoreitem(value, guidename).then(()=>{
                                if (temp_guide.scoreitems.length == (index+1)){
                                    resolveuseguidetotal();
                                }
                            });
                        }); 
                    });

                } else {
                    console.log("useguide: error, guide does not exist.")
                    resolveuseguidetotal();
                }

            }
        ); 

        return Promise.all([temp_promise_useguide])
        .then(()=>{
            console.log("resolve promise:useguide");
            console.log("this.guideresults");
            console.log(this.guideresults);
            console.log("this.dbotherusersservice.dbotherusers");
            console.log(this.dbotherusersservice.dbotherusers);        
            });

    }

    public processscoreitem(scoreitemfromguide:any, guidename:string):any{
        return new Promise(
            (resolveprocessscoreitem, reject) => {
            let temp_scoreresultarray : any = [];

            //make array of all prescore names and of userids who have all necessary prescores
            let temp_arrayofprescorenames : any = [];
            let temp_arrayofuseridswithallprescores : any = [];
            let temp_scoreitem = this.getitemfromarray_byvaluefromvariable(this.scoreitems, "scorename", scoreitemfromguide.scorename);
            let temp_prescoresallavailable : boolean = true;
            temp_scoreitem.prescoreitems.forEach ((prescoreitemvalue, prescoreitemindex)=>{
                temp_arrayofprescorenames.push(prescoreitemvalue.prescorename)
                //check if prescore is saved at all
                let temp_useridswithprescore = this.getuseridsforprescores(prescoreitemvalue.prescorename);
                if (temp_useridswithprescore && temp_useridswithprescore.includes(this.dbuserinfoservice.currentuserid)) {
                    if (prescoreitemindex < 1) {
                        //add userids of those who have the first prescore
                        temp_arrayofuseridswithallprescores = temp_useridswithprescore;
                    } else {
                        //take intersection of current array of userids and new array of userids
                        temp_arrayofuseridswithallprescores = temp_arrayofuseridswithallprescores.filter(function(temp_useridfilter) {
                            return temp_useridswithprescore.indexOf(temp_useridfilter) !== -1;
                        });
                    }
                } else {
                    temp_prescoresallavailable = false;
                    console.log("processscoreitem: cannot process score item as not all prescores are available")
                }
            });
            console.log("loaded prescorenames of current score item:")
            console.log(temp_arrayofprescorenames)
            console.log("loaded userids of thoe who have all necessary prescores:")
            console.log(temp_arrayofuseridswithallprescores)

            if (temp_prescoresallavailable) {
                //add userids of those who have all necessary prescores
                this.dbotherusersservice.getpublicinfovalue_fromfirebase(temp_arrayofuseridswithallprescores)
                .then(()=>{
                    this.guideresult_adduserids(temp_arrayofuseridswithallprescores, guidename);

                    let temp_prescoreresults = [];//stores results of prescoring
                    let temp_scoreresultobject = {};//holds results of scoring
        
                    //
                    temp_scoreitem.prescoreitems.forEach ((prescoreitemvalue, prescoreitemindex)=>{
                        switch(prescoreitemvalue.evaluationmode){
                            case "proximity_continuous":
                                temp_prescoreresults.push(this.getprescore_proximity_continuous(temp_arrayofuseridswithallprescores, prescoreitemvalue.prescorename));
                                break;
                            case "proximity_discrete":
                                break;
                            case "distance_continuous":
                                break;
                            case "distance_discrete":
                                break;
                            default:
                                console.log("processscoreitem: error, evaluationmode does not exist");
                                break;
                        }
                    });
        
                    console.log("temp_prescoreresults");
                    console.log(temp_prescoreresults);
        
                    //calculates score here based on prescores (+weighing)
                    let temp_scoreavailable : boolean = true;
                    if(temp_prescoreresults.length < 1) {
                        //there is no prescoreresult!
                        temp_scoreavailable = false;
                        console.log("processscoreitem: score note available as there is no prescore result!");
                    } else if (temp_prescoreresults.length == 1) {
                        //there is only one set of prescores
                        temp_scoreresultobject = temp_prescoreresults[0];
                    } else {
                        //tere are several prescores for this score item
                        // XXX finish calculation, including weighing process
                        temp_prescoreresults.forEach(()=>{
                        });
                    }
        
                    console.log("temp_scoreresultobject");
                    console.log(temp_scoreresultobject);
        
                    //saves score results to guideresult object
                    if(temp_scoreavailable){
                        this.guideresult_addresults(temp_scoreresultobject, guidename, scoreitemfromguide.scorename);
                    }
                    console.log("resolve promise: processscoreitem")
                    resolveprocessscoreitem();
                });
            }
        });
    }

    //this process compares prescores by proximity, for continuous values
    public getprescore_proximity_continuous(userids:string[], prescorename):any{
        let temp_responseobject : any = {}
        userids.forEach((temp_userid)=>{
            if (temp_userid != this.dbuserinfoservice.currentuserid){
                temp_responseobject[temp_userid] = Math.abs(this.prescores[prescorename][temp_userid] - this.prescores[prescorename][this.dbuserinfoservice.currentuserid])
            }
        });
        return temp_responseobject;
    }

    //adds guidename and result structure to guideresult object
    public guideresult_addguidename(guidename:string):void{
        if (!this.guideresults.guidenames.includes(guidename)) {
            console.log("adding guide "+guidename+" to guide results and");
            this.guideresults.guidenames.push(guidename);
        }
        this.guideresults[guidename]={};
        this.guideresults[guidename].userids=[];
        let temp_date = new Date();
        let temp_lastevaluationdate = (temp_date.getDate() + "-" + temp_date.getMonth() + "-" + temp_date.getFullYear())
        this.guideresults[guidename].lastevaluationdate=temp_lastevaluationdate;
    }

    //adds guidename and result structure to guideresult object
    public guideresult_adduserids(userids:string[], guidename:string):void{
        if (Object.keys(this.guideresults).includes(guidename)){
            //add user and structure if userid not in guideresult object yet
            userids.forEach((value_userid)=>{
                if (!Object.keys(this.guideresults[guidename]).includes(value_userid) && value_userid !=this.dbuserinfoservice.currentuserid){
                    this.guideresults[guidename][value_userid] = {};
                    this.guideresults[guidename][value_userid].scores = {};
                    
                    //this.guideresults[guidename][value_userid].firstname = this.readwriteotherusersservice.getpublicinfovalue(value_userid,"firstname");
                    this.guideresults[guidename][value_userid].pictureurl = "pictureurldummy";
                    // XXX here, user information (name, picture, must be added)
                    if (!this.guideresults[guidename].userids.includes(value_userid)){
                        this.guideresults[guidename].userids.push(value_userid);
                    }
                }            
            });
        } else {
            console.log("guideresult_adduseridsguideresult_adduserids : error, guidename does not exist in guideresult object")
        }
    }

    public guideresult_addresults(resultobject:any, guidename:string, scorename:string):void{
        let temp_score : any;
        Object.keys(resultobject).forEach((value_userid) => {
            this.guideresults[guidename][value_userid].scores[scorename] = resultobject[value_userid];
        });

    }


    //sends back ids of users which have a certain prescore, as an array 
    public getuseridsforprescores(prescorename):any{
        let temp_array : any;
        if (Object.keys(this.prescores).includes(prescorename)) {
            temp_array = Object.keys(this.prescores[prescorename]); 
        } else {
            console.log("getuseridsforprescores : error, following prescorename is not in loaded prescores:");
            console.log(prescorename);
            temp_array = false;
        }
        return temp_array;
    }



    public getitemfromarray_byvaluefromvariable (inputarray:any, inputvariable:string, inputvalue:any):any {
        let temp_value : any = false;
        inputarray.forEach((value,index) => {
            if (Object.keys(value).includes(inputvariable)) {
                if (value[inputvariable] == inputvalue){
                    temp_value = value;
                }
            }
        });
        if (!temp_value) {
            console.log("error:getitemfromarray_byvaluefromvariable, did not get item");
            console.log("inputarray");
            console.log(inputarray);
            console.log("inputvariable");
            console.log(inputvariable);
            console.log("inputvalue");
            console.log(inputvalue);     
        }
        return temp_value;
    }

    //This guideresult stores the result of past guide evaluations
    public guideresultssample : any = {
        guidenames : ["guide1"],
        guide1 : {
            userids : [123,456,789,321,654],
            lastevaluationdate : "07/04/2018-12h00",
            user123 : {
                username : "Marie",
                pictureurl : "Marie",
                scores : {
                    seniority : 0.7,
                    domainandsector_before : 0.6,
                    domainandsector_after : 0.3
                }
            },
            user456 : {
                username : "Jean-Pierre",
                pictureurl : "Marie",
                scores : {
                    seniority : 0.5,
                    domainandsector_before : 0.4,
                    domainandsector_after : 0.1
                }
            },
            user789 : {
                username : "Lucien",
                pictureurl : "Marie",
                scores : {
                    seniority : 0.9,
                    domainandsector_before : 0.1,
                    domainandsector_after : 0.1
                }
            }
        }
    }

    //This guideresult stores the result of past guide evaluations
    public guideresults : any = {
        guidenames : []        
    };

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
    //      "weighing" : uses an array in scoreitems which holds values totalling 1 and calculates final score by weighing each individual score accordingly  
    public guides : any = [
        {
            guidename:"guide1",
            description:"Evaluates individual experiences",
            maxitems:5,//show the first 5 of items
            scoreitems: [//
                {scorename:"seniority",  usercoefficient:"xxx-xx-x", prescoreweighing:[], prescoresumupmode:"none"}
                /*
                ,
                {scorename:"domainandsector", usercoefficient:"xxx-xx-x", prescoreweighing:[], prescoresumupmode:"none"}
                */
//                {name:"SPECIFY", evaluationmode:"SPECIFY", usercoefficient:"xxx-xx-x", sumupmode:"none"}
            ]  
        }
    ]

    //instructions for individual preprocessing
    public prescoringitems : any[] = [
        {prescorename:"yearsofexperience", description:"Années d'expérience professionnelle", inputexperienceids: ["x-151-1"], experienceweighing:[], experiencesumupmode:"none"}, //weighing and sumup mode is not indicated as there is only one value
        {prescorename:"domainandsector_before", description:"Profil métiers et secteurs pré-reconversion", inputexperienceids: ["x-151-1"], experienceweighing:[], experiencesumupmode:"none"}, //weighing and sumup mode is not indicated as it is about a profile (true/false/true, etc.) , not a value
        {prescorename:"domainandsector_after", description:"Profil métiers et secteurs post-reconversion", inputexperienceids: ["x-151-1"], experienceweighing:[], experiencesumupmode:"none"} //weighing and sumup mode is not indicated as it is about a profile (true/false/true, etc.) , not a value
    ]

    //this contains prescores saved on Firebase
    public prescores : any = {};

    //instructions for score items used by guide
    public scoreitems : any[] = [
        {scorename:"seniority", 
        description:"Séniorité: Années d'expérience professionnelle", 
        prescoreitems : [
            {prescorename: "yearsofexperience", evaluationmode:"proximity_continuous"}
        ]},
        {scorename:"domainandsector", 
        description:"Domaine et secteurs", 
        prescoreitems : [
            {prescorename:"domainandsector_before", evaluationmode:"proximity_discrete"},
            {prescorename:"domainandsector_after", evaluationmode:"proximity_discrete"} //weighing and sumup mode is not indicated as it is about a profile (true/false/true, etc.) , not a value
        ]}

        //séniorité : une seule option possible, distance quantifiable
        //la valeur est une interprétation directe de la séniorité (0-3 ans -> 1, 4-6 ans -> 2, etc.)
        /*
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
        */
    ]

    public cards : any = {
    }
}
