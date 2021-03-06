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
        //it goes through each prescore item
        //within the prescore item, it goes through each experience
        //within the experience, it goes through each option
        //each option is processed according to the card type
        //processed option values are saved in temp_processedexperiencevalue
        //for each experience is added a weighing item from the weighing array
        //if an experience is not available, the weighing item is not added and will not be taken into account.
        this.readwriteprescoreservice.emptyprescorebuffer();

        //goes through prescoreitems
        console.log("prescoringactiveuser: there are "+this.prescoringitems.length+" items set up for prescoring");
        let temp_prescoreitem : any = [];
        let temp_prescorename = "";
        let temp_processedexperiencevalue : any;
        let temp_optionids = [];
        let temp_weighingarray = [];
        let temp_nbunavailableoptions : number = 0;
        this.prescoringitems.forEach((value, index)=>{
            temp_prescorename = value.prescorename;
            temp_prescoreitem = [];

            //what kind of user info experience do we have? (training purpose only)
            console.log("prescoringactiveuser : current user info experience :");
            console.log(this.dbuserinfoservice.userinfo.experience);

            if (value.inputexperienceids.length > 0) {
                value.inputexperienceids.forEach((temp_inputexperienceid,experienceidindex) => {
                    //there are experience ids to be processed
                    console.log("prescoringactiveuser: am now processing experience ids");
                    temp_processedexperiencevalue = [];
                    temp_nbunavailableoptions = 0;//sets number of unavailable values to 0
                    temp_optionids = [];

                    //check if card and card type are valid and available
                    let temp_cardandoptionids = this.getcardandoptionids(temp_inputexperienceid);
                    if (temp_cardandoptionids != false) {
                        let temp_cardtype = this.getcardtype(temp_cardandoptionids.cardid);
                        console.log("prescoringactiveuser : cardcomponentname is "+temp_cardtype);

                        //check if options are x or specified, prepare optionid array
                        if (temp_cardandoptionids.optionid == "x"){
                            temp_optionids = this.quizzcardservice.cards["card"+temp_cardandoptionids.cardid].parameters.options;
                        } else {
                            temp_optionids.push(Number(temp_cardandoptionids.optionid));
                        }

                        //Go through each option and process it according to the card type
                        temp_optionids.forEach((temp_optionid) => {
                            let temp_optionvalue = this.getexperiencevalue(temp_cardandoptionids.cardid, temp_optionid);
                            if (temp_optionvalue != null){

                                //process according to card type
                                switch(temp_cardtype) {
                                    case "CsPlacementsimpleComponent":
                                        //console.log("prescoringactiveuser: it's a Placement Simple Card!");
                                        //register normalized value
                                        temp_processedexperiencevalue = (temp_optionvalue / this.quizzcardservice.cards["card"+temp_cardandoptionids.cardid].parameters.max);
                                        break;
                                    case "CsSwipecardComponent":
                                        //console.log("prescoringactiveuser: it's a swipecard!");
                                        temp_processedexperiencevalue.push(temp_optionvalue);
                                        break;
                                    case "CsOrderrelativeComponent":
                                        //console.log("prescoringactiveuser: it's a Order Relartive Card!");
                                        temp_processedexperiencevalue = (temp_optionvalue / this.quizzcardservice.cards["card"+temp_cardandoptionids.cardid].parameters.maxpoints)
                                        break;
                                    case "CsMultipleChoiceComponent":
                                        //console.log("prescoringactiveuser: it's a Multiple Choice Card!");
                                        temp_processedexperiencevalue = Number(temp_optionvalue);
                                    default:
                                        console.log("prescoringactiveuser : cardcomponentname does not match any Component");
                                        break;
                                }
                            } else {
                                //experience is not available
                                temp_nbunavailableoptions++;
                            }
                        });

                    }

                    if (temp_nbunavailableoptions == 0) {
                        //all options are available: save value to prescoreitem and add weighing
                        //Otherwise, if not all options are available, do not save value of this experience and do not add it to weighing array.
                        temp_prescoreitem = temp_prescoreitem.concat(temp_processedexperiencevalue);
                        temp_weighingarray.push(value.experienceweighing[experienceidindex]);
                    }
                    
                    
                });

                //make sure unique values are not registered as arrays
                if (Array.isArray(temp_prescoreitem) && temp_prescoreitem.length == 1) {
                    temp_prescoreitem = temp_prescoreitem[0];
                }

                //check if there is a sumup/weighing mode
                switch(value.experiencesumupmode) {
                    case "none":
                        //will not do anything, output will be array of calculated values
                        break;
                    case "weighing":
                        //will return weighed values
                        temp_prescoreitem = this.getweighedvalue(temp_prescoreitem, temp_weighingarray);
                        break;
                    case "average":
                        //just take average of all values in array
                        temp_prescoreitem = this.getaveragevalue(temp_prescoreitem);
                        break;
                    default:
                        console.log("prescoringactiveuser : cardcomponentname does not match any Component");
                        break;
                }

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


    public getaveragevalue(valuearray):any{
        let temp_response : any = false;
        let temp_sum : number = 0;
        if (valuearray.length > 0) {
            valuearray.forEach((temp_valuearray) => {
                if (isNaN(parseFloat(temp_valuearray)) || !isFinite(temp_valuearray)) {
                    console.log("getaveragevalue: ERROR, could not take average because all values are not numeric. Example : " + temp_valuearray);
                } else {
                    temp_sum = temp_sum + parseFloat(temp_valuearray);
                }
            });
            temp_response = Math.round(temp_sum * 100 / valuearray.length) / 100;

        } else {
            console.log("getaveragevalue: ERROR, there are no values in array");            
        }
        return temp_response;
    }

    public getweighedvalue(valuearray, weighingarray):any{
        let temp_response : any = false;
        let temp_sum : number = 0;
        let temp_weighingsum : number = 0;
        //check if there is a weigh for each value:
        if (valuearray.length == weighingarray.length && valuearray.length > 0) {

            //get sum of weighing points
            weighingarray.forEach((temp_temp_weighingarray) => {
                if (isNaN(parseFloat(temp_temp_weighingarray)) || !isFinite(temp_temp_weighingarray)) {
                    console.log("getweighedvalue: ERROR, could not calculate sum of weighing points as all values are not numeric. Example : " + temp_temp_weighingarray);
                } else {
                    temp_weighingsum += Math.abs(parseFloat(temp_temp_weighingarray));
                }
            });

            //Let's normalize weighing
            if (temp_weighingsum == 0) {
                console.log("getweighedvalue: ERROR, weighing sum equals 0");
                return false;
            } else {
                weighingarray = this.getnormalizedarray(weighingarray, temp_weighingsum);
            }

            //get weighed value
            for (let valuepos = 0; valuepos < valuearray.length; valuepos++) {
                if (isNaN(parseFloat(valuearray[valuepos])) || !isFinite(valuearray[valuepos]) ||
                    isNaN(parseFloat(weighingarray[valuepos])) || !isFinite(weighingarray[valuepos])
                ) {
                    console.log("getweighedvalue: ERROR, valuearray or weighing array contains not numeric values.");
                } else {
                    if (parseFloat(weighingarray[valuepos]) >= 0){
                        temp_sum = temp_sum + ( parseFloat(weighingarray[valuepos]) * parseFloat(valuearray[valuepos]));
                    } else {
                        let temp_value = (parseFloat(valuearray[valuepos]) === 0) ? 1 : parseFloat(valuearray[valuepos]);
                        temp_sum = temp_sum + ( Math.abs(parseFloat(weighingarray[valuepos])) * temp_value);
                    }
                }
            }

            temp_response = Math.round(temp_sum * 100) / 100;

        } else {
            console.log("getaveragevalue: ERROR, list of value and weighing arrays are not equal OR lists do not contain values ");            
        }

        //console.log("temp_weighingsum");
        //console.log(temp_weighingsum);
        //console.log("valuearray");
        //console.log(valuearray);
        //console.log("weighingarray");
        //console.log(weighingarray);
        //console.log("temp_response");
        //console.log(temp_response);

        return temp_response;
    }

    //brings back an array of normalized values (e.g. [5,10,4,1] --> [0.25, 0.5, 0.2, 0.05] )
    public getnormalizedarray(input_array, input_sum):any{
        let response = [];
        input_array.forEach((item) => {
            response.push(Math.round(item * 100 / input_sum) / 100);
        });
        return response;
    }


//    /prescores/mumu

    public getexperiencevalue(cardid,optionid):any{
        //console.log("I'm here!");
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
            //console.log("getexperiencevalue: value is:");
            //console.log(temp_value);
        }else {
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
            if (Object.keys(this.quizzcardservice.cards).indexOf("card"+temp_cardid) != -1){//was includes() before (replaced all "includes" statements by indexOf because of shitty EcmaScript)
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
        let temp_promises_useguide = []
        temp_promises_useguide.push(new Promise(
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
        )); 

/* no longer required
        temp_promises_useguide.push(new Promise(
            (resolveuseguidecompleteprofile, reject) => {
                this.guideresult_completeuserprofiles();
                //implement as then structure --> resolve after guideresult_completeuserprofiles, which is async. XXX
                resolveuseguidecompleteprofile();
            }
        ));
*/

        return Promise.all(temp_promises_useguide)
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
                if (temp_useridswithprescore && temp_useridswithprescore.indexOf(this.dbuserinfoservice.currentuserid)!=-1) {
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
                    console.log("processscoreitem: cannot process score item as not all prescores are available. Scorename : "+scoreitemfromguide.scorename);
                }
            });
            console.log("loaded prescorenames of current score item:")
            console.log(temp_arrayofprescorenames)
            console.log("loaded userids of thoe who have all necessary prescores:")
            console.log(temp_arrayofuseridswithallprescores)

            if (temp_prescoresallavailable) {
                //add userids of those who have all necessary prescores for the current score item
                this.dbotherusersservice.getpublicinfovalue_fromfirebase(temp_arrayofuseridswithallprescores)
                .then(()=>{
                    this.guideresult_adduserids(temp_arrayofuseridswithallprescores, guidename);

                    let temp_prescoreresults = [];//stores results of prescoring
                    let temp_scoreresultobject = {};//holds results of scoring
        
                    //Process each prescore of the score item
                    temp_scoreitem.prescoreitems.forEach ((prescoreitemvalue, prescoreitemindex)=>{
                        switch(prescoreitemvalue.evaluationmode){
                            case "proximity_continuous":
                                //proximity_continuous = distance between values (3 - 2 = 1) over value span (5) : 1/5 = 20% -->  then reversed (1 - 20% = 80%)
                                temp_prescoreresults.push(this.getprescore_proximity_continuous(temp_arrayofuseridswithallprescores, prescoreitemvalue.prescorename));
                                break;
                            case "proximity_discrete":
                                //proximity_discrete = basic matching ratio 3 out of 6 are matching --> 50%
                                //proximity_discrete = other possibility, not implemented: probability of matching over one (For instance, 3 options out of 6 are matching. Probability of 3/6 matching = 0.83% * 20 = 16%) --> then reversed and logarithmic value
                                temp_prescoreresults.push(this.getprescore_proximity_discrete(temp_arrayofuseridswithallprescores, prescoreitemvalue.prescorename));
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
        
                    console.log("temp_prescoreresults on score name : " + scoreitemfromguide.scorename);
                    console.log(temp_prescoreresults);
        
                    //calculates score here based on prescores (+weighing)
                    //This is where multiple prescores are merged into a single score for a given score item
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
                        temp_scoreresultobject = temp_prescoreresults[0];
                    }
        
                    console.log("temp_scoreresultobject");
                    console.log(temp_scoreresultobject);
        
                    //saves score results to guideresult object
                    if(temp_scoreavailable){
                        this.guideresult_addresults(temp_scoreresultobject, guidename, scoreitemfromguide.scorename);
                    } else {
                        console.log("processcoreitem: no score available on scorename : "+scoreitemfromguide.scorename);
                    }
                    console.log("resolve promise: processscoreitem on scorename : "+scoreitemfromguide.scorename)
                    resolveprocessscoreitem();
                });
            } else {
                console.log("resolve promise: processscoreitem on scorename : "+scoreitemfromguide.scorename)
                resolveprocessscoreitem();
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

    public getprescore_proximity_discrete(userids:string[], prescorename):any{
        let temp_responseobject : any = {}
        let temp_matches : number = 0;
        let temp_maxvalues : number;
        userids.forEach((temp_userid)=>{
        if (temp_userid != this.dbuserinfoservice.currentuserid){
                temp_matches = 0;
                console.log("check this");
                console.log(this.prescores[prescorename][temp_userid]);
                temp_maxvalues = this.prescores[prescorename][temp_userid].length;
                for (let i = 0; i < temp_maxvalues; i++){
                    if (this.prescores[prescorename][this.dbuserinfoservice.currentuserid][i] == this.prescores[prescorename][temp_userid][i]) {
                        temp_matches++;
                    }
                }
                console.log("temp_maxvalues : " + temp_maxvalues);
                console.log("temp_matches : " + temp_matches);
                temp_responseobject[temp_userid] = Math.round((temp_matches * 100) / temp_maxvalues) / 100; 
            }
        });
        return temp_responseobject;
    }

    //adds guidename and result structure to guideresult object
    public guideresult_addguidename(guidename:string):void{
        if (this.guideresults.guidenames.indexOf(guidename)==-1) {//was includes before
            console.log("adding guide "+guidename+" to guide results and");
            this.guideresults.guidenames.push(guidename);
        }
        this.guideresults[guidename]={};
        this.guideresults[guidename].userids=[];
        this.guideresults[guidename].scorenames={};
        this.guideresults[guidename].users={};
        let temp_date = new Date();
        let temp_lastevaluationdate = (temp_date.getDate() + "-" + temp_date.getMonth() + "-" + temp_date.getFullYear())
        this.guideresults[guidename].lastevaluationdate=temp_lastevaluationdate;
    }

    //adds guidename and result structure to guideresult object
    public guideresult_adduserids(userids:string[], guidename:string):void{
        if (Object.keys(this.guideresults).indexOf(guidename)!=-1){
            //add user and structure if userid not in guideresult object yet
            userids.forEach((value_userid)=>{
                if (Object.keys(this.guideresults[guidename]).indexOf(value_userid)==-1 && value_userid !=this.dbuserinfoservice.currentuserid){
                    this.guideresults[guidename].users[value_userid] = {};
                    this.guideresults[guidename].users[value_userid].scores = {};                    
                    if (this.guideresults[guidename].userids.indexOf(value_userid)==-1){
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
        if (Object.keys(this.guideresults[guidename].scorenames).indexOf(scorename)==-1){
            this.guideresults[guidename].scorenames[scorename]=[];
        } 

        Object.keys(resultobject).forEach((value_userid) => {
            this.guideresults[guidename].users[value_userid].scores[scorename] = resultobject[value_userid];
            if (this.guideresults[guidename].scorenames[scorename].indexOf(value_userid)==-1){
                this.guideresults[guidename].scorenames[scorename][value_userid] = resultobject[value_userid];        
            }
        });

    }

    /* no longer required
    // yyy here, user information (name and picture must be added, from Firebase)
    public guideresult_completeuserprofiles(){
        console.log("Now completing user profiles");
    }
    */

    //sends back ids of users which have a certain prescore, as an array 
    public getuseridsforprescores(prescorename):any{
        let temp_array : any;
        if (Object.keys(this.prescores).indexOf(prescorename)!=-1) {
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
            if (Object.keys(value).indexOf(inputvariable)!=-1) {
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
                {scorename:"seniority",  usercoefficient:"none", prescoreweighing:[], prescoresumupmode:"none"},
                {scorename:"domainandsector", usercoefficient:"coefficient_domainandsector", prescoreweighing:[1,2], prescoresumupmode:"weighing"}
//                {name:"SPECIFY", evaluationmode:"SPECIFY", usercoefficient:"xxx-xx-x" experience id or prescore, sumupmode:"none"}
            ]  
        }
    ]

    //instructions for individual preprocessing
    public prescoringitems : any[] = [
        {
            prescorename:"coefficient_domainandsector", 
            description:"Coefficient du critère domaine et secteur", 
            inputexperienceids: ["x-23-5", "x-23-6", "x-25-1", "x-29-2", "x-29-3", "x-29-4", "x-29-5", "x-45-1", "x-81-1", "x-82-1", "x-83-1", "x-83-2", "x-83-3", "x-83-4", "x-122-1"], 
            experienceweighing:[1, 1, -1, 0.15, 0.15, 0.15, 0.15, -1, -4, 1, 1, -1, -1, 1, -1], 
            experiencesumupmode:"weighing"
        },
        //weighing and sumup mode is not indicated as there is only one value
        {
            prescorename:"yearsofexperience", 
            description:"Années d'expérience professionnelle", 
            inputexperienceids: ["x-151-1"], 
            experienceweighing:[], 
            experiencesumupmode:"none"
        },//weighing and sumup mode is not indicated as there is only one value
        {
            prescorename:"domainandsector_before", 
            description:"Profil secteurs pré-reconversion", 
            inputexperienceids: ["x-141-x"], 
            experienceweighing:[], 
            experiencesumupmode:"none"
        }, //weighing and sumup mode is not indicated as it is about a profile (true/false/true, etc.) , not a value
        {
            prescorename:"domainandsector_after", 
            description:"Profil secteurs post-reconversion", 
            inputexperienceids: ["x-106-x"], 
            experienceweighing:[], 
            experiencesumupmode:"none"
        }, //weighing and sumup mode is not indicated as it is about a profile (true/false/true, etc.) , not a value
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
/*

Todo XXX :
- probably not necessary to make a prescore item out of metier_before, already stored in common
- configure directly the score item and the guide for pre-reorientation and post-reorientation matching around métier appellation and métier general
- create more user accounts to show matches.

*/
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        {//this one compares metiers of temoins and users BEFORE their reorientation, previously, there choices where saved in the same experience id
            prescorename:"metiers_appellation_before",
            description:"Profil métiers pré-reconversion", 
            inputexperienceids: ["common-1-1"], //artificial common experience of both temoins and users 
            experienceweighing:[], 
            experiencesumupmode:"none"
        }, //weighing and sumup mode is not indicated as it is about a profile (true/false/true, etc.) , not a value
        {//this one compares metiers of temoins and users AFTER their reorientation, previously, there choices where saved in the same experience id
            prescorename:"metiers_appellation_after",
            description:"Profil métiers et secteurs post-reconversion", 
            inputexperienceids: ["common-2-1"],  //artificial common experience of both temoins and users
            experienceweighing:[], 
            experiencesumupmode:"none"
        } //weighing and sumup mode is not indicated as it is about a profile (true/false/true, etc.) , not a value
    ]

    //this contains prescores saved on Firebase
    public prescores : any = {};

    public getothervalueofscoreitemsbyscorename(inputscorename:string, inputothervalue:string):any{
        let temp_response = "";
        this.scoreitems.forEach((value)=>{
            if (value.scorename = inputscorename){
                temp_response = value[inputothervalue];
            }
        });
        if (temp_response == ""){
            console.log("getscoredescriptionlongbyscorename: ERROR, did not get long description of scorename: "+inputscorename);
        }
        return temp_response;
    }

    //instructions for score items used by guide
    public scoreitems : any[] = [
        {
            scorename:"seniority",
            description:"Séniorité en année d'expérience:",
            description_long:"Séniorité en année d'expérience: si la jauge est pleine, vous avez la même séniorité que la personne dont vous consultez le profil.",
            prescoreitems : [
                {prescorename: "yearsofexperience", evaluationmode:"proximity_continuous"}
            ]
        },
        {
            scorename:"domainandsector", 
            description:"Domaine et secteurs",
            description_long:"Domaine et secteurs: si la jauge est pleine, vous avez travaillé ou souhaitez travailler dans le même secteur et le même domaine respectivement avant et après votre reconversion.",
            prescoreitems : [
                {prescorename:"domainandsector_before", evaluationmode:"proximity_discrete"},
                {prescorename:"domainandsector_after", evaluationmode:"proximity_discrete"} //weighing and sumup mode is not indicated as it is about a profile (true/false/true, etc.) , not a value
            ]
        },
        {//XXX
            scorename:"metiers",
            description:"Métiers",
            description_long:"Métiers: si la jauge est pleine, vous avez exercé ou souhaitez exercer les mêmes métiers que la personne dont le profil s'affiche.",
            prescoreitems : [
                {prescorename:"domainandsector_before", evaluationmode:"proximity_discrete"},
                {prescorename:"domainandsector_after", evaluationmode:"proximity_discrete"} //weighing and sumup mode is not indicated as it is about a profile (true/false/true, etc.) , not a value
            ]
        }

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

}
