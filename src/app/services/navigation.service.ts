//This service handles navigation modules: for instance, it says whether the user can take an appointment, it sets the todos, etc.

//Built-in
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

//Hand-made
import { DbuserinfoService } from './dbuserinfo.service';
import { monplanningitem } from './monplanning.model';
import { ReadwritebufferService } from './readwritebuffer.service';

@Injectable()
export class NavigationService implements OnInit {

    constructor(
        public dbuserinfoservice:DbuserinfoService,
        public readwritebufferservice:ReadwritebufferService
    ){

    }

    ngOnInit(){

    }

    public checkifstepvalid(experience,stepnumber):boolean {
        for (let i = 0; i < experience.length; i++) {
            if (experience[i]===stepnumber){
                return true;
            }
        }
        return false;
    }

    //MON PLANNING

    public monplanningitems:any = [];
    public monplanningnexttask:any = {
        title : "Ma prochaine étape :",
        item : {}
    };

    public monplanningitemrepository = [
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-available",
            "Je n'ai pas encore fait le point sur mon projet de reconversion",
            "btn ldb_btn ldb_btn_available",
            "/beneficiaire/jefaislepoint",
            "Je fais le point sur ma reconversion professionnelle",
            "modulejefaislepoint",
            "available",
            999
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard-check mdi-ldb-done",
            "Je peux refaire le point à n'importe quel moment.",
            "btn ldb_btn ldb_btn_done",
            "/beneficiaire/jefaislepoint",
            "J'ai fait le point sur ma reconversion professionnelle",
            "modulejefaislepoint",
            "done",
            0
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-available",
            "Je peux consulter mon bilan à tout moment",
            "btn ldb_btn ldb_btn_available",
            "/beneficiaire/jeconsultemonbilan",
            "Je consulte mon bilan",
            "modulejeconsultemonbilan",
            "available",
            0
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-unavailable",
            "Je ne peux pas encore contacter une personne.",
            "btn ldb_btn ldb_btn_unavailable",
            "/beneficiaire/jeprendsrendezvous",
            "Je contacte une personne qui a déjà changé de métier",
            "modulejeprendsrendezvous",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-available",
            "Je n'ai pas encore contacté de personne.",
            "btn ldb_btn ldb_btn_available",
            "/beneficiaire/jeprendsrendezvous",
            "Je contacte une personne qui a déjà changé de métier",
            "modulejeprendsrendezvous",
            "available",
            998
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard-check mdi-ldb-done",
            "J'ai déjà contacté une personne. A refaire ?",
            "btn ldb_btn ldb_btn_done",
            "/beneficiaire/jeprendsrendezvous",
            "Je contacte une personne qui a déjà changé de métier",
            "modulejeprendsrendezvous",
            "done",
            8
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-unavailable",
            "Je ne peux pas préparer de rencontre. Il faut d'abord prendre rendez-vous.",
            "btn ldb_btn ldb_btn_unavailable",
            "/beneficiaire/jepreparemarencontre",
            "Je prépare ma rencontre avec un témoin",
            "modulejepreparemarencontre",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-notdone",
            "Je n'ai pas encore préparé de rencontre.",
            "btn ldb_btn ldb_btn_notdone",
            "/beneficiaire/jepreparemarencontre",
            "Je prépare ma rencontre avec un témoin",
            "modulejepreparemarencontre",
            "notdone",
            997
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard-alert mdi-ldb-todo",
            "J'ai une rencontre à préparer.",
            "btn ldb_btn ldb_btn_todo",
            "/beneficiaire/jepreparemarencontre",
            "Je prépare ma rencontre avec un témoin",
            "modulejepreparemarencontre",
            "todo",
            9997
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard-check mdi-ldb-done",
            "J'ai fait la préparation de rencontre.",
            "btn ldb_btn ldb_btn_done",
            "/beneficiaire/jepreparemarencontre",
            "Je prépare ma rencontre avec un témoin",
            "modulejepreparemarencontre",
            "done",
            0
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-unavailable",
            "Je ne peux pas encore faire le suivi. Je dois d'abord faire une rencontre.",
            "btn ldb_btn ldb_btn_unavailable",
            "/beneficiaire/jefaislesuivi",
            "Je fais le suivi de ma rencontre",
            "modulejefaislesuivi",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-notdone",
            "Je n'ai pas encore fait le suivi.",
            "btn ldb_btn ldb_btn_notdone",
            "/beneficiaire/jefaislesuivi",
            "Je fais le suivi de ma rencontre",
            "modulejefaislesuivi",
            "notdone",
            995
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard-alert mdi-ldb-todo",
            "J'ai un suivi à faire!",
            "btn ldb_btn ldb_btn_todo",
            "/beneficiaire/jefaislesuivi",
            "Je fais le suivi de ma rencontre",
            "modulejefaislesuivi",
            "todo",
            9995
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard-check mdi-ldb-done",
            "J'ai fait le suivi.",
            "btn ldb_btn ldb_btn_done",
            "/beneficiaire/jefaislesuivi",
            "Je fais le suivi de ma rencontre",
            "modulejefaislesuivi",
            "done",
            0
        ),
    ]

    public monplanningupdateconditions = {
        modulejefaislepoint : {//name of the experience field to be updated
            updatevalue : "done",//value to which the experience field will be set in case conditions are met
            conditions : {//conditions (experience fields) to be met with corresponding value
                etapejapprendsapresentermonprojet : "done",
                etapejechoisismonnouveaumetier : "done",
                etapejeconstruismonprojet : "done",
                etapejedeveloppeetactivemonreseau : "done",
                etapejemeprepareetmelance : "done",
                etapejemerenseignesurmonmetier : "done",
                etapejetrouvedesideesdemetier : "done",
                etapejidentifiemessoutiens : "done"
            }
        },
        modulejeprendsrendezvous : {
            updatevalue : "available",
            conditions : {
                modulejefaislepoint : "done"
            }
        }
    }

    //this function checks all condition in the monplanningupdateconditions variable and updates experience fields accordingly
    public updatemodulelevels():void{
        let temp_somethingchanged : boolean = false;
        //console.log("updatemodulelevels here!");
        //console.log("Object.keys(this.monplanningupdateconditions).length");
        //console.log(Object.keys(this.monplanningupdateconditions).length);
        for (let i = 0; i < Object.keys(this.monplanningupdateconditions).length; i++){
            let temp_key = Object.keys(this.monplanningupdateconditions)[i];
            let temp_numberofconditions = Object.keys(this.monplanningupdateconditions[temp_key].conditions).length;
            let temp_metconditionscount = 0;
            if (this.dbuserinfoservice.userinfo.experience[temp_key]!==this.dbuserinfoservice.userinfo.experience[temp_key].updatevalue) {//make sure updatevalue is not already there
                for (let i2 = 0; i2 < Object.keys(this.monplanningupdateconditions[temp_key].conditions).length; i2++) {
                    let temp_condition = Object.keys(this.monplanningupdateconditions[temp_key].conditions)[i2];
                    let temp_conditionvalue = this.monplanningupdateconditions[temp_key].conditions[temp_condition];
                    //console.log(temp_condition);
                    //console.log(this.dbuserinfoservice.userinfo.experience[temp_condition]+"==="+temp_conditionvalue);
                    if (this.dbuserinfoservice.userinfo.experience[temp_condition]===temp_conditionvalue){
                        temp_metconditionscount++;
                    }
                }
                //console.log("temp_key");
                //console.log(temp_key);
                //console.log("temp_numberofconditions");
                //console.log(temp_numberofconditions);
                //console.log("temp_metconditionscount");
                //console.log(temp_metconditionscount);
                if (temp_metconditionscount===temp_numberofconditions){
                    let temp_updatevalue = this.monplanningupdateconditions[temp_key].updatevalue;
                    this.readwritebufferservice.updatebuffer(temp_key,temp_updatevalue,"update");  
                    temp_somethingchanged = true;    
                }
            }
        }
        if (temp_somethingchanged) {
            setTimeout(()=>{this.updatemodulelevels()},1000)
        }              
    }

    //sets up the list of button in the monplanning menu.
    preparemonplanningitems ():void {
        this.monplanningitems = [];
        for (let i = 0; i < this.monplanningitemrepository.length; i++) {
            if (this.dbuserinfoservice.userinfo.experience[this.monplanningitemrepository[i].formodule]==this.monplanningitemrepository[i].ifvalue) {
                //Here, before pushing it to the monplanningitems, you can enhance them, check whether there are pending issues (meeting to prepare, etc.)
                this.monplanningitems.push(this.monplanningitemrepository[i]);
            }
        }
        //console.log(this.monplanningitems);
    }

    //sets the next important task, also shown in the mon planning menu.
    setnexttaskmonplanning():void {
        let maxemergencylevel:number = 0;
        let itemnumber:number = 0;
        for (let i = 0; i < this.monplanningitems.length; i++) {
            console.log(this.monplanningitems[i].atext+"level : "+this.monplanningitems[i].emergencylevel);
            if (this.monplanningitems[i].emergencylevel >= maxemergencylevel) {
                maxemergencylevel=this.monplanningitems[i].emergencylevel;
                itemnumber = i;
            }
        }
        this.monplanningnexttask.item = this.monplanningitems[itemnumber];
    }

    //JE FAIS LE POINT

    public jefaislepointitems:any = [];
    public jefaislepointnexttask:any = {
        title : "Je passe à la prochaine étape :",
        item : {}
    };

    public jefaislepointitemrepository = [
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-alert mdi-ldb-unavailable",
            "Je ne peux pas encore passer à cette étape.",
            "btn ldb_btn_small ldb_btn_unavailable",
            "/beneficiaire/jeconstruismonprojet",
            "Je construis mon projet de reconversion",
            "etapejeconstruismonprojet",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-available",
            "Je peux maintenant apprendre à construire mon projet.",
            "btn ldb_btn_small ldb_btn_available",
            "/beneficiaire/jeconstruismonprojet",
            "Je construis mon projet de reconversion",
            "etapejeconstruismonprojet",
            "available",
            9
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-notdone",
            "Je n'ai pas encore appris à construire mon projet.",
            "btn ldb_btn_small ldb_btn_notdone",
            "/beneficiaire/jeconstruismonprojet",
            "Je construis mon projet de reconversion",
            "etapejeconstruismonprojet",
            "notdone",
            99
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-text mdi-ldb-inprogress",
            "J'ai commencé à construire mon projet. Je reprends mon travail.",
            "btn ldb_btn_small ldb_btn_inprogress",
            "/beneficiaire/jeconstruismonprojet",
            "Je construis mon projet de reconversion",
            "etapejeconstruismonprojet",
            "inprogress",
            999
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-alert mdi-ldb-todo",
            "Il est temps de m'intéresser à comment construire mon projet !",
            "btn ldb_btn_small ldb_btn_todo",
            "/beneficiaire/jeconstruismonprojet",
            "Je construis mon projet de reconversion",
            "etapejeconstruismonprojet",
            "todo",
            9999
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-check mdi-ldb-done",
            "Je sais maintenant comment construire mon projet.",
            "btn ldb_btn_small ldb_btn_done",
            "/beneficiaire/jeconstruismonprojet",
            "Je construis mon projet de reconversion",
            "etapejeconstruismonprojet",
            "done",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-alert mdi-ldb-unavailable",
            "Je ne peux pas encore passer à cette étape.",
            "btn ldb_btn_small ldb_btn_unavailable",
            "/beneficiaire/jetrouvedesideesdemetier",
            "Je trouve des pistes de métier",
            "etapejetrouvedesideesdemetier",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-available",
            "Je peux faire le point sur comment identifier des pistes de métier.",
            "btn ldb_btn_small ldb_btn_available",
            "/beneficiaire/jetrouvedesideesdemetier",
            "Je trouve des pistes de métier",
            "etapejetrouvedesideesdemetier",
            "available",
            8
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-notdone",
            "Je n'ai pas encore fait le point sur comment trouver des pistes de métier.",
            "btn ldb_btn_small ldb_btn_notdone",
            "/beneficiaire/jetrouvedesideesdemetier",
            "Je trouve des pistes de métier",
            "etapejetrouvedesideesdemetier",
            "notdone",
            98
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-text mdi-ldb-inprogress",
            "J'ai commencé à travailler sur comment identifier des pistes de métier. Je reprends mon travail.",
            "btn ldb_btn_small ldb_btn_inprogress",
            "/beneficiaire/jetrouvedesideesdemetier",
            "Je trouve des pistes de métier",
            "etapejetrouvedesideesdemetier",
            "inprogress",
            998
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-alert mdi-ldb-todo",
            "Il est temps de faire le point sur comment identifier des pistes de métier !",
            "btn ldb_btn_small ldb_btn_todo",
            "/beneficiaire/jetrouvedesideesdemetier",
            "Je trouve des pistes de métier",
            "etapejetrouvedesideesdemetier",
            "todo",
            9998
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-check mdi-ldb-done",
            "J'ai identifié des pistes de métier ou sais comment le faire.",
            "btn ldb_btn_small ldb_btn_done",
            "/beneficiaire/jetrouvedesideesdemetier",
            "Je trouve des pistes de métier",
            "etapejetrouvedesideesdemetier",
            "done",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-unavailable",
            "Je ne peux pas encore passer à cette étape.",
            "btn ldb_btn_small ldb_btn_unavailable",
            "/beneficiaire/jechoisismonnouveaumetier",
            "Je choisis un métier qui m'intéresse",
            "etapejechoisismonnouveaumetier",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard- mdi-ldb-available",
            "Je peux maintenant identifier un métier qui m'intéresse.",
            "btn ldb_btn_small ldb_btn_available",
            "/beneficiaire/jechoisismonnouveaumetier",
            "Je choisis un métier qui m'intéresse",
            "etapejechoisismonnouveaumetier",
            "available",
            7
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-notdone",
            "Je n'ai pas encore identifié un métier qui m'intéresse.",
            "btn ldb_btn_small ldb_btn_notdone",
            "/beneficiaire/jechoisismonnouveaumetier",
            "Je choisis un métier qui m'intéresse",
            "etapejechoisismonnouveaumetier",
            "notdone",
            97
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-text mdi-ldb-inprogress",
            "J'ai commencé à choisir un métier qui m'intéresse.",
            "btn ldb_btn_small ldb_btn_inprogress",
            "/beneficiaire/jechoisismonnouveaumetier",
            "Je choisis un métier qui m'intéresse",
            "etapejechoisismonnouveaumetier",
            "inprogress",
            997
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-alert mdi-ldb-todo",
            "Il est temps de choisir un métier qui m'intéresse !",
            "btn ldb_btn_small ldb_btn_done",
            "/beneficiaire/jechoisismonnouveaumetier",
            "Je choisis un métier qui m'intéresse",
            "etapejechoisismonnouveaumetier",
            "todo",
            9997
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-check mdi-ldb-done",
            "J'ai choisi un métier qui m'intéresse.",
            "btn ldb_btn_small ldb_btn_done",
            "/beneficiaire/jechoisismonnouveaumetier",
            "Je choisis un métier qui m'intéresse",
            "etapejechoisismonnouveaumetier",
            "done",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-unavailable",
            "Je ne peux pas encore passer à cette étape.",
            "btn ldb_btn_small ldb_btn_unavailable",
            "/beneficiaire/jemerenseignesurmonmetier",
            "Je me renseigne sur mon métier",
            "etapejemerenseignesurmonmetier",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-available",
            "Je peux maintenant faire le point sur comment me renseigner sur mon métier.",
            "btn ldb_btn_small ldb_btn_available",
            "/beneficiaire/jemerenseignesurmonmetier",
            "Je me renseigne sur mon métier",
            "etapejemerenseignesurmonmetier",
            "available",
            6
        ),
            new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-notdone",
            "Je n'ai pas encore fait le point sur comment me renseigner sur mon métier.",
            "btn ldb_btn_small ldb_btn_notdone",
            "/beneficiaire/jemerenseignesurmonmetier",
            "Je me renseigne sur mon métier",
            "etapejemerenseignesurmonmetier",
            "notdone",
            96
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-text mdi-ldb-inprogress",
            "J'ai commencé à faire le point sur comment me renseigner sur mon métier.",
            "btn ldb_btn_small ldb_btn_inprogress",
            "/beneficiaire/jemerenseignesurmonmetier",
            "Je me renseigne sur mon métier",
            "etapejemerenseignesurmonmetier",
            "inprogress",
            996
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-alert mdi-ldb-todo",
            "Il est temps de faire le point sur comment me renseigner sur mon métier.",
            "btn ldb_btn_small ldb_btn_todo",
            "/beneficiaire/jemerenseignesurmonmetier",
            "Je me renseigne sur mon métier",
            "etapejemerenseignesurmonmetier",
            "todo",
            9996
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-check mdi-ldb-done",
            "Je me suis renseigné sur mon métier ou sais comment le faire.",
            "btn ldb_btn_small ldb_btn_done",
            "/beneficiaire/jemerenseignesurmonmetier",
            "Je me renseigne sur mon métier",
            "etapejemerenseignesurmonmetier",
            "done",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-unavailable",
            "Je ne peux pas encore passer à cette étape.",
            "btn ldb_btn_small ldb_btn_unavailable",
            "/beneficiaire/japprendsapresentermonprojet",
            "J'apprends à présenter mon projet",
            "etapejapprendsapresentermonprojet",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-alert mdi-ldb-available",
            "Je peux maintenant apprendre à présenter mon projet.",
            "btn ldb_btn_small ldb_btn_available",
            "/beneficiaire/japprendsapresentermonprojet",
            "J'apprends à présenter mon projet",
            "etapejapprendsapresentermonprojet",
            "available",
            5
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-notdone",
            "Je n'ai pas encore appris à présenter mon projet.",
            "btn ldb_btn_small ldb_btn_notdone",
            "/beneficiaire/japprendsapresentermonprojet",
            "J'apprends à présenter mon projet",
            "etapejapprendsapresentermonprojet",
            "notdone",
            95
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-text mdi-ldb-inprogress",
            "J'ai commencé à apprendre à présenter mon projet.",
            "btn ldb_btn_small ldb_btn_inprogress",
            "/beneficiaire/japprendsapresentermonprojet",
            "J'apprends à présenter mon projet",
            "etapejapprendsapresentermonprojet",
            "inprogress",
            995
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-alert mdi-ldb-todo",
            "Il est temps d'apprendre à présenter mon projet.",
            "btn ldb_btn_small ldb_btn_todo",
            "/beneficiaire/japprendsapresentermonprojet",
            "J'apprends à présenter mon projet",
            "etapejapprendsapresentermonprojet",
            "todo",
            9995
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-check mdi-ldb-done",
            "J'ai appris à présenter mon projet.",
            "btn ldb_btn_small ldb_btn_done",
            "/beneficiaire/japprendsapresentermonprojet",
            "J'apprends à présenter mon projet",
            "etapejapprendsapresentermonprojet",
            "done",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-unavailable",
            "Je ne peux pas encore passer à cette étape.",
            "btn ldb_btn_small ldb_btn_unavailable",
            "/beneficiaire/jedeveloppeetactivemonreseau",
            "Je développe et active mon réseau",
            "etapejedeveloppeetactivemonreseau",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-available",
            "Je peux maintenant faire le point sur comment développer et activer mon réseau.",
            "btn ldb_btn_small ldb_btn_available",
            "/beneficiaire/jedeveloppeetactivemonreseau",
            "Je développe et active mon réseau",
            "etapejedeveloppeetactivemonreseau",
            "available",
            4
        ),    
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-notdone",
            "Je n'ai pas fait le point sur mon réseau de contacts.",
            "btn ldb_btn_small ldb_btn_notdone",
            "/beneficiaire/jedeveloppeetactivemonreseau",
            "Je développe et active mon réseau",
            "etapejedeveloppeetactivemonreseau",
            "notdone",
            94
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-text mdi-ldb-inprogress",
            "J'ai commencé à faire le point sur mon réseau professionnel.",
            "btn ldb_btn_small ldb_btn_inprogress",
            "/beneficiaire/jedeveloppeetactivemonreseau",
            "Je développe et active mon réseau",
            "etapejedeveloppeetactivemonreseau",
            "inprogress",
            994
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-alert mdi-ldb-todo",
            "Il est temps de faire le point sur comment développer et activer mon réseau.",
            "btn ldb_btn_small ldb_btn_todo",
            "/beneficiaire/jedeveloppeetactivemonreseau",
            "Je développe et active mon réseau",
            "etapejedeveloppeetactivemonreseau",
            "todo",
            9994
        ),    
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-check mdi-ldb-done",
            "Je sais comment développer et activer mon réseau.",
            "btn ldb_btn_small ldb_btn_done",
            "/beneficiaire/jedeveloppeetactivemonreseau",
            "Je développe et active mon réseau",
            "etapejedeveloppeetactivemonreseau",
            "done",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-unavailable",
            "Je ne peux pas encore passer à cette étape.",
            "btn ldb_btn_small ldb_btn_unavailable",
            "/beneficiaire/jidentifiemessoutiens",
            "J'identifie mes soutiens",
            "etapejidentifiemessoutiens",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-available",
            "Je peux maintenant identifier les soutiens à mon projet.",
            "btn ldb_btn_small ldb_btn_available",
            "/beneficiaire/jidentifiemessoutiens",
            "J'identifie mes soutiens",
            "etapejidentifiemessoutiens",
            "available",
            3
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-notdone",
            "Je n'ai pas encore identifié les soutiens à mon projet.",
            "btn ldb_btn_small ldb_btn_notdone",
            "/beneficiaire/jidentifiemessoutiens",
            "J'identifie mes soutiens",
            "etapejidentifiemessoutiens",
            "notdone",
            93
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-text mdi-ldb-inprogress",
            "J'ai commencé à identifier les soutiens à mon projet.",
            "btn ldb_btn_small ldb_btn_inprogress",
            "/beneficiaire/jidentifiemessoutiens",
            "J'identifie mes soutiens",
            "etapejidentifiemessoutiens",
            "inprogress",
            993
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-alert mdi-ldb-todo",
            "Il est temps d'identifier les soutiens à mon projet !",
            "btn ldb_btn_small ldb_btn_todo",
            "/beneficiaire/jidentifiemessoutiens",
            "J'identifie mes soutiens",
            "etapejidentifiemessoutiens",
            "todo",
            9993
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-check mdi-ldb-done",
            "J'ai identifié les soutiens à mon projet ou sais comment le faire.",
            "btn ldb_btn_small ldb_btn_done",
            "/beneficiaire/jidentifiemessoutiens",
            "J'identifie mes soutiens",
            "etapejidentifiemessoutiens",
            "done",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-unavailable",
            "Je ne peux pas encore passer à cette étape.",
            "btn ldb_btn_small ldb_btn_unavailable",
            "/beneficiaire/jemeprepareetmelance",
            "Je me prépare et me lance",
            "etapejemeprepareetmelance",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-check mdi-ldb-available",
            "Je peux maintenant préparer le lancement de mon projet de reconversion.",
            "btn ldb_btn_small ldb_btn_available",
            "/beneficiaire/jemeprepareetmelance",
            "Je me prépare et me lance",
            "etapejemeprepareetmelance",
            "available",
            2
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-notdone",
            "Je ne me suis pas encore préparé à me lancer dans mon projet.",
            "btn ldb_btn_small ldb_btn_notdone",
            "/beneficiaire/jemeprepareetmelance",
            "Je me prépare et me lance",
            "etapejemeprepareetmelance",
            "notdone",
            92
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-text mdi-ldb-inprogress",
            "J'ai commencé à préparer le lancement de mon projet de reconversion.",
            "btn ldb_btn_small ldb_btn_inprogress",
            "/beneficiaire/jemeprepareetmelance",
            "Je me prépare et me lance",
            "etapejemeprepareetmelance",
            "inprogress",
            992
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-alert mdi-ldb-todo",
            "Il est temps de préparer le lancement de mon projet de reconversion.",
            "btn ldb_btn_small ldb_btn_todo",
            "/beneficiaire/jemeprepareetmelance",
            "Je me prépare et me lance",
            "etapejemeprepareetmelance",
            "todo",
            9992
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-check mdi-ldb-done",
            "Je me suis préparé à me lancer dans mon projet. Je peux maintenant prendre rendez-vous avec un grand témoin.",
            "btn ldb_btn_small ldb_btn_done",
            "/beneficiaire/jemeprepareetmelance",
            "Je me prépare et me lance",
            "etapejemeprepareetmelance",
            "done",
            0
        )
    ]

     
    //sets up the list of button in the monplanning menu.
    preparejefaislepointitems ():void {
        this.jefaislepointitems = [];
        //console.log("this.jefaislepointitemrepository");
        //console.log(this.jefaislepointitemrepository);
        //console.log("this.dbuserinfoservice.userinfo.experience");
        //console.log(this.dbuserinfoservice.userinfo.experience);
        for (let i = 0; i < this.jefaislepointitemrepository.length; i++) {
            if (this.dbuserinfoservice.userinfo.experience[this.jefaislepointitemrepository[i].formodule]===this.jefaislepointitemrepository[i].ifvalue) {
                this.jefaislepointitems.push(this.jefaislepointitemrepository[i]);
            }
        }
        //console.log("this.jefaislepointitems");
        //console.log(this.jefaislepointitems);
    }

    //sets the next important task, also shown in the mon planning menu.
    setnexttaskjefaislepoint ():void {
        let maxemergencylevel:number = 0;
        let itemnumber:number = 0;
        for (let i = 0; i < this.jefaislepointitems.length; i++) {
            //console.log(this.jefaislepointitems[i].atext+"level : "+this.jefaislepointitems[i].emergencylevel);
            if (this.jefaislepointitems[i].emergencylevel >= maxemergencylevel) {
                maxemergencylevel=this.jefaislepointitems[i].emergencylevel;
                itemnumber = i;
            }
        }
        //console.log("itemnumber");
        //console.log(itemnumber);
        //console.log("this.jefaislepointitems");
        //console.log(this.jefaislepointitems);
        if(this.jefaislepointitems[itemnumber].emergencylevel!==0) {
            this.jefaislepointnexttask.item = this.jefaislepointitems[itemnumber];
        }else{
            this.jefaislepointnexttask.item = {};
        }
    }


    // JE CONSTRUIS MON PROJET

    public jeconstruismonprojetnumberofsteps:number = 8; //Here we set the number of steps in this module. This is used for the progress bar.
    public jeconstruismonprojetcurrentstep:number = 1; //This variable shows at which step we are in this module.
    public jeconstruismonprojetvalidatable = [
        false, //THIS IS NOT A STEP, THERE IS NO STEP 0
        false, //you have to select options 
        true, //you have to read it
        true, //you have to read it
        false, //you have to select options 
        false, //you have to select options 
        false, //you have to select options 
        false, //you have to select options 
        true, //you have to read it
    ];

    //J'IDENTIFIE DES PISTES DE METIER
    public jetrouvedesideesdemetiernumberofsteps:number = 1; //Here we set the number of steps in this module. This is used for the progress bar.
    public jetrouvedesideesdemetiercurrentstep:number = 1; //This variable shows at which step we are in this module.
    public jetrouvedesideesdemetiervalidatable = [
        false, //THIS IS NOT A STEP, THERE IS NO STEP 0
        true, //you have to read it
    ];

    //JE CHOISIS MON NOUVEAU METIER
    public jechoisismonnouveaumetiernumberofsteps:number = 1; //Here we set the number of steps in this module. This is used for the progress bar.
    public jechoisismonnouveaumetiercurrentstep:number = 1; //This variable shows at which step we are in this module.
    public jechoisismonnouveaumetiervalidatable = [
        false, //THIS IS NOT A STEP, THERE IS NO STEP 0
        true, //you have to read it
    ];

    //JE ME RENSEIGNE SUR MON METIER
    public jemerenseignesurmonmetiernumberofsteps:number = 1; //Here we set the number of steps in this module. This is used for the progress bar.
    public jemerenseignesurmonmetiercurrentstep:number = 1; //This variable shows at which step we are in this module.
    public jemerenseignesurmonmetiervalidatable = [
        false, //THIS IS NOT A STEP, THERE IS NO STEP 0
        true, //you have to read it
    ];

    //J'APPRENDS A PRESENTER MON PROJET'
    public japprendsapresentermonprojetnumberofsteps:number = 1; //Here we set the number of steps in this module. This is used for the progress bar.
    public japprendsapresentermonprojetcurrentstep:number = 1; //This variable shows at which step we are in this module.
    public japprendsapresentermonprojetvalidatable = [
        false, //THIS IS NOT A STEP, THERE IS NO STEP 0
        true, //you have to read it
    ];

    //JE DEVELOPPE ET ACTIVE MON RESEAU
    public jedeveloppeetactivemonreseaunumberofsteps:number = 1; //Here we set the number of steps in this module. This is used for the progress bar.
    public jedeveloppeetactivemonreseaucurrentstep:number = 1; //This variable shows at which step we are in this module.
    public jedeveloppeetactivemonreseauvalidatable = [
        false, //THIS IS NOT A STEP, THERE IS NO STEP 0
        true, //you have to read it
    ];

    //J'IDENTIFIE MES SOUTIENS'
    public jidentifiemessoutiensnumberofsteps:number = 1; //Here we set the number of steps in this module. This is used for the progress bar.
    public jidentifiemessoutienscurrentstep:number = 1; //This variable shows at which step we are in this module.
    public jidentifiemessoutiensvalidatable = [
        false, //THIS IS NOT A STEP, THERE IS NO STEP 0
        true, //you have to read it
    ];

    //JE ME PREPARE ET ME LANCE
    public jemeprepareetmelancenumberofsteps:number = 1; //Here we set the number of steps in this module. This is used for the progress bar.
    public jemeprepareetmelancecurrentstep:number = 1; //This variable shows at which step we are in this module.
    public jemeprepareetmelancevalidatable = [
        false, //THIS IS NOT A STEP, THERE IS NO STEP 0
        true, //you have to read it
    ];
    

}