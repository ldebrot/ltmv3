//This service handles the local copy of the user information (copied from firebase)
import { OnInit, Injectable } from '@angular/core';
//Firebase service
import * as firebase from 'firebase';

@Injectable()
export class DbuserinfoService {

    private meetings: object;
    private privateinfo: object;
    private publicinfo: object;
    private mobile:number;
    private email:string;
    private birthdate:string;
    private comment:string;
    private firstname:string;
    private surname:string;
    private twitter_followme:boolean;
    private twitter_id:string;
    private linkedin_followme:boolean;
    private linkedin_url:string;
    private status:string;

    constructor(
    ) {
    }

    //This gives a general structure, 
    public userinfo : any = {
        privateinfo : {
            email: "",
            mobile : "",
            birthdate: ""
        },
        publicinfo : {
            firstname : "",
            surname: "",
            twitter_followme : "",
            twitter_id: "",
            linkedin_followme : "",
            linkedin_url : "",
            status: ""
        },
        experience : {
            modulejefaislepoint : "",
            modulejeconsultemonbilan : "",
            modulejeprendsrendezvous : "",
            modulejepreparemarencontre : "",
            modulejefaislesuivi : "",
            etapejeconstruismonprojet : "",
            etapejetrouvedesideesdemetier : "",
            etapejechoisismonnouveaumetier : "",
            etapejemerenseignesurmonmetier : "",
            etapejapprendsapresentermonprojet : "",
            etapejedeveloppeetactivemonreseau : "",
            etapejidentifiemessoutiens : "",
            etapejemeprepareetmelance : "",
            jeconstruismonprojetstepvalidation : [0],//this array contains the numbers of validated steps, if a number is not there, the step is not validated
            jeconstruismonprojetstep1values : "",//this holds all values of step1 (checkboxes)
            jeconstruismonprojetstep4avalues : "",//this holds all values of step4 (checkboxes)
            jeconstruismonprojetstep4bvalues : "",//this holds all values of step4 (checkboxes)
            jeconstruismonprojetstep5avalues : "",//this holds all values of step5 (checkboxes)
            jeconstruismonprojetstep5bvalues : "",//this holds all values of step5 (checkboxes)
            jeconstruismonprojetstep6avalues : "",//this holds all values of step6 (checkboxes)
            jeconstruismonprojetstep6bvalues : "",//this holds all values of step6 (checkboxes)
            jeconstruismonprojetstep7avalues : "",//this holds all values of step7 (checkboxes)
            jeconstruismonprojetstep7bvalues : "",//this holds all values of step7 (checkboxes)
            jeconstruismonprojetstep7bselected:"",//this states whether a value has been confirmed by the user
            jeconstruismonprojetstep7bselectedvalue:0,//this holds all values of step7 (checkboxes)
            jeconstruismonprojetstep1jeveuxensavoirplus : "",//définition d'une reconversion
            jeconstruismonprojetstep2jeveuxensavoirplus : "",//présentation de la rencontre déclic et du partage d'expérience
            jeconstruismonprojetstep4ajeveuxensavoirplus : "",//comment cerner ses centres d'intérêts
            jeconstruismonprojetstep4bjeveuxensavoirplus : "",//bilan de compétences
            jeconstruismonprojetstep5ajeveuxensavoirplus : "",//informations du marché du travail
            jeconstruismonprojetstep5bjeveuxensavoirplus : "",//types de responsabilité
            jeconstruismonprojetstep6ajeveuxensavoirplus : "",//test de personnalité
            jeconstruismonprojetstep6bjeveuxensavoirplus : "",//comment interpréter les résultats test de personnalité
            jeconstruismonprojetstep7jeveuxensavoirplus : ""//étapes clés d'une reconversion professionnelle
        },
        meetings : {
        }
    }

    //This function cleans the userinfo, setting all values to ""
    public empty():void {
        for (var key in this.userinfo) {
            let userinfosublevel:object = this.userinfo[key];
            for (var subkey in userinfosublevel) {
                this.userinfo[key][subkey] = "";
                //console.log("key: "+key+" / subkey: "+ subkey+" cleaned!");
            }
        }
    }

    //This function sets the default (starting) values for newly registered users
    public setstartvalues():void {
        this.userinfo.experience.modulejefaislepoint = "notdone",
        this.userinfo.experience.modulejeconsultemonbilan = "notdone",
        this.userinfo.experience.modulejeprendsrendezvous = "unavailable",
        this.userinfo.experience.modulejepreparemarencontre = "unavailable",
        this.userinfo.experience.modulejefaislesuivi = "unavailable"
    }

    //This function integrates the values passed in the inputobject into the userinfo object, which is available as a service. The inputobject usually comes from firebase.
    public integrate(inputobject:object):void {
        //loop through keys of userinfo object
        for (var key in this.userinfo) {
            if (
                this.userinfo.hasOwnProperty(key)
                && inputobject.hasOwnProperty(key)//check if inputobject has this key as well
            ) {
                //console.log("both have key '"+key+"'");
                //loop through subkeys of userinfo object
                let userinfosublevel:object = this.userinfo[key];//key as object
                let subkeycount:number = 0;
                for (var subkey in userinfosublevel) {
                    if (
                        userinfosublevel.hasOwnProperty(subkey)
                        && inputobject[key].hasOwnProperty(subkey)
                    ) {
                        //console.log("both have subkey '"+subkey+"'");
                        this.userinfo[key][subkey] = inputobject[key][subkey];
                        subkeycount++;
                    }
                }
                if(subkeycount===0) {//this means they only have the key in common (therefore no common subkey)
                    this.userinfo[key] = inputobject[key];
                } else {
                    //console.log("Saved "+subkeycount+" items in dbuserinfoservice!");
                }
            }
        }
        console.log("this.userinfo is now :");
        console.log(this.userinfo);
    }

}