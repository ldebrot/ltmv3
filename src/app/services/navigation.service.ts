//This service handles navigation modules: for instance, it says whether the user can take an appointment, it sets the todos, etc.

//Built-in
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

//Hand-made
import { DbuserinfoService } from './dbuserinfo.service';
import { monplanningitem } from './monplanning.model';

@Injectable()
export class NavigationService implements OnInit {

    constructor(
        public dbuserinfoservice:DbuserinfoService
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
            "mdi mdi-36px mdi-clipboard mdi-ldb-primary",
            "Je n'ai pas encore fait le point sur mon projet de reconversion",
            "btn ldb_btn ldb_btn_primary",
            "/beneficiaire/jefaislepoint",
            "Je fais le point sur ma reconversion professionnelle.",
            "modulejefaislepoint",
            "notdone",
            1000
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard-check mdi-ldb-done",
            "Je peux refaire le point à n'importe quel moment.",
            "btn ldb_btn ldb_btn_done",
            "/beneficiaire/jefaislepoint",
            "J'ai fait le point sur ma reconversion professionnelle.",
            "modulejefaislepoint",
            "done",
            0
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-unavailable",
            "Je ne peux pas encore contacter une personne.",
            "btn ldb_btn ldb_btn_unavailable",
            "/beneficiaire/jeprendsrendezvous",
            "Je contacte une personne qui a déjà changé de métier.",
            "modulejeprendsrendezvous",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-notdone",
            "Je n'ai pas encore contacté de personne.",
            "btn ldb_btn ldb_btn_notdone",
            "/beneficiaire/jeprendsrendezvous",
            "Je contacte une personne qui a déjà changé de métier.",
            "modulejeprendsrendezvous",
            "notdone",
            100
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard-check mdi-ldb-done",
            "J'ai déjà contacté une personne. A refaire ?",
            "btn ldb_btn ldb_btn_done",
            "/beneficiaire/jeprendsrendezvous",
            "Je contacte une personne qui a déjà changé de métier.",
            "modulejeprendsrendezvous",
            "done",
            10
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-unavailable",
            "Je ne peux pas préparer de rencontre. Il faut d'abord prendre rendez-vous.",
            "btn ldb_btn ldb_btn_unavailable",
            "/beneficiaire/jepreparemarencontre",
            "Je prépare ma rencontre avec un témoin.",
            "modulejepreparemarencontre",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-notdone",
            "Je n'ai pas encore préparé de rencontre.",
            "btn ldb_btn ldb_btn_notdone",
            "/beneficiaire/jepreparemarencontre",
            "Je prépare ma rencontre avec un témoin.",
            "modulejepreparemarencontre",
            "notdone",
            1000
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard-alert mdi-ldb-todo",
            "J'ai une rencontre à préparer.",
            "btn ldb_btn ldb_btn_todo",
            "/beneficiaire/jepreparemarencontre",
            "Je prépare ma rencontre avec un témoin.",
            "modulejepreparemarencontre",
            "todo",
            10000
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard-check mdi-ldb-done",
            "J'ai fait la préparation de rencontre.",
            "btn ldb_btn ldb_btn_done",
            "/beneficiaire/jepreparemarencontre",
            "Je prépare ma rencontre avec un témoin.",
            "modulejepreparemarencontre",
            "done",
            0
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-unavailable",
            "Je ne peux pas encore faire le suivi. Je dois d'abord faire une rencontre.",
            "btn ldb_btn ldb_btn_unavailable",
            "/beneficiaire/jefaislesuivi",
            "Je fais le suivi de ma rencontre.",
            "modulejefaislesuivi",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-notdone",
            "Je n'ai pas encore fait le suivi.",
            "btn ldb_btn ldb_btn_notdone",
            "/beneficiaire/jefaislesuivi",
            "Je fais le suivi de ma rencontre.",
            "modulejefaislesuivi",
            "notdone",
            100
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard-alert mdi-ldb-todo",
            "J'ai un suivi à faire!",
            "btn ldb_btn ldb_btn_todo",
            "/beneficiaire/jefaislesuivi",
            "Je fais le suivi de ma rencontre.",
            "modulejefaislesuivi",
            "todo",
            1000
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard-check mdi-ldb-done",
            "J'ai fait le suivi.",
            "btn ldb_btn ldb_btn_done",
            "/beneficiaire/jefaislesuivi",
            "Je fais le suivi de ma rencontre.",
            "modulejefaislesuivi",
            "done",
            0
        ),
    ]

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
            "Je construis mon projet de reconversion.",
            "etapejeconstruismonprojet",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-notdone",
            "Je n'ai pas encore construit mon projet.",
            "btn ldb_btn_small ldb_btn_notdone",
            "/beneficiaire/jeconstruismonprojet",
            "Je construis mon projet de reconversion.",
            "etapejeconstruismonprojet",
            "notdone",
            9999
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-text mdi-ldb-inprogress",
            "J'ai commencé à construire mon projet. Je reprends mon travail.",
            "btn ldb_btn_small ldb_btn_inprogress",
            "/beneficiaire/jeconstruismonprojet",
            "Je construis mon projet de reconversion.",
            "etapejeconstruismonprojet",
            "inprogress",
            9999
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-check mdi-ldb-done",
            "J'ai construit mon projet.",
            "btn ldb_btn_small ldb_btn_done",
            "/beneficiaire/jeconstruismonprojet",
            "Je construis mon projet de reconversion.",
            "etapejeconstruismonprojet",
            "done",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-alert mdi-ldb-unavailable",
            "Je ne peux pas encore passer à cette étape.",
            "btn ldb_btn_small ldb_btn_unavailable",
            "/beneficiaire/jetrouvedesideesdemetier",
            "Je trouve des pistes de métier.",
            "etapejetrouvedesideesdemetier",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-notdone",
            "Je ne sais pas encore comment trouver des pistes de métier.",
            "btn ldb_btn_small ldb_btn_notdone",
            "/beneficiaire/jetrouvedesideesdemetier",
            "Je trouve des pistes de métier.",
            "etapejetrouvedesideesdemetier",
            "notdone",
            9999
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-text mdi-ldb-inprogress",
            "J'ai commencé à identifier des pistes de métier. Je reprends mon travail.",
            "btn ldb_btn_small ldb_btn_inprogress",
            "/beneficiaire/jetrouvedesideesdemetier",
            "Je trouve des pistes de métier.",
            "etapejetrouvedesideesdemetier",
            "inprogress",
            9999
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-check mdi-ldb-done",
            "J'ai identifié des pistes de métier ou sais comment le faire.",
            "btn ldb_btn_small ldb_btn_done",
            "/beneficiaire/jetrouvedesideesdemetier",
            "Je trouve des pistes de métier.",
            "etapejetrouvedesideesdemetier",
            "done",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-alert mdi-ldb-unavailable",
            "Je ne peux pas encore passer à cette étape.",
            "btn ldb_btn_small ldb_btn_unavailable",
            "/beneficiaire/jechoisismonnouveaumetier",
            "Je choisis un métier qui m'intéresse.",
            "etapejechoisismonnouveaumetier",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-notdone",
            "Je n'ai pas encore identifié un métier qui m'intéresse.",
            "btn ldb_btn_small ldb_btn_notdone",
            "/beneficiaire/jechoisismonnouveaumetier",
            "Je choisis un métier qui m'intéresse.",
            "etapejechoisismonnouveaumetier",
            "notdone",
            9999
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-text mdi-ldb-inprogress",
            "J'ai commencé à choisir un métier qui m'intéresse.",
            "btn ldb_btn_small ldb_btn_inprogress",
            "/beneficiaire/jechoisismonnouveaumetier",
            "Je choisis un métier qui m'intéresse.",
            "etapejechoisismonnouveaumetier",
            "inprogress",
            9999
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-check mdi-ldb-done",
            "J'ai identifié un métier qui m'intéresse.",
            "btn ldb_btn_small ldb_btn_done",
            "/beneficiaire/jechoisismonnouveaumetier",
            "Je choisis un métier qui m'intéresse.",
            "etapejechoisismonnouveaumetier",
            "done",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-alert mdi-ldb-unavailable",
            "Je ne peux pas encore passer à cette étape.",
            "btn ldb_btn_small ldb_btn_unavailable",
            "/beneficiaire/jemerenseignesurmonmetier",
            "Je me renseigne sur mon métier.",
            "etapejemerenseignesurmonmetier",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-notdone",
            "Je ne me suis pas encore renseigné sur mon métier.",
            "btn ldb_btn_small ldb_btn_notdone",
            "/beneficiaire/jemerenseignesurmonmetier",
            "Je me renseigne sur mon métier.",
            "etapejemerenseignesurmonmetier",
            "notdone",
            9999
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-text mdi-ldb-inprogress",
            "J'ai commencé à me renseigner sur mon métier.",
            "btn ldb_btn_small ldb_btn_inprogress",
            "/beneficiaire/jemerenseignesurmonmetier",
            "Je me renseigne sur mon métier.",
            "etapejemerenseignesurmonmetier",
            "inprogress",
            9999
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-check mdi-ldb-done",
            "Je me suis renseigné sur mon métier ou sais comment le faire.",
            "btn ldb_btn_small ldb_btn_done",
            "/beneficiaire/jemerenseignesurmonmetier",
            "Je me renseigne sur mon métier.",
            "etapejemerenseignesurmonmetier",
            "done",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-alert mdi-ldb-unavailable",
            "Je ne peux pas encore passer à cette étape.",
            "btn ldb_btn_small ldb_btn_unavailable",
            "/beneficiaire/japprendsapresentermonprojet",
            "J'apprends à présenter mon projet'.",
            "etapejapprendsapresentermonprojet",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-notdone",
            "Je n'ai pas encore appris à présenter mon projet.",
            "btn ldb_btn_small ldb_btn_notdone",
            "/beneficiaire/japprendsapresentermonprojet",
            "J'apprends à présenter mon projet'.",
            "etapejapprendsapresentermonprojet",
            "notdone",
            9999
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-text mdi-ldb-inprogress",
            "J'ai commencé à apprendre à présenter mon projet.",
            "btn ldb_btn_small ldb_btn_inprogress",
            "/beneficiaire/japprendsapresentermonprojet",
            "J'apprends à présenter mon projet'.",
            "etapejapprendsapresentermonprojet",
            "inprogress",
            9999
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-check mdi-ldb-done",
            "J'ai appris à présenter mon projet.",
            "btn ldb_btn_small ldb_btn_done",
            "/beneficiaire/japprendsapresentermonprojet",
            "J'apprends à présenter mon projet'.",
            "etapejapprendsapresentermonprojet",
            "done",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-alert mdi-ldb-unavailable",
            "Je ne peux pas encore passer à cette étape.",
            "btn ldb_btn_small ldb_btn_unavailable",
            "/beneficiaire/jedeveloppeetactivemonreseau",
            "Je développe et active mon réseau'.",
            "etapejedeveloppeetactivemonreseau",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-notdone",
            "Je n'ai pas encore développé et activé mon réseau.",
            "btn ldb_btn_small ldb_btn_notdone",
            "/beneficiaire/jedeveloppeetactivemonreseau",
            "Je développe et active mon réseau'.",
            "etapejedeveloppeetactivemonreseau",
            "notdone",
            9999
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-text mdi-ldb-inprogress",
            "J'ai commencé à développer et activer mon réseau.",
            "btn ldb_btn_small ldb_btn_inprogress",
            "/beneficiaire/jedeveloppeetactivemonreseau",
            "Je développe et active mon réseau'.",
            "etapejedeveloppeetactivemonreseau",
            "inprogress",
            9999
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-check mdi-ldb-done",
            "Je sais comment développer et activer mon réseau.",
            "btn ldb_btn_small ldb_btn_done",
            "/beneficiaire/jedeveloppeetactivemonreseau",
            "Je développe et active mon réseau'.",
            "etapejedeveloppeetactivemonreseau",
            "done",
            0
        ),    
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-alert mdi-ldb-unavailable",
            "Je ne peux pas encore passer à cette étape.",
            "btn ldb_btn_small ldb_btn_unavailable",
            "/beneficiaire/jidentifiemessoutiens",
            "J'identifie mes soutiens.",
            "etapejidentifiemessoutiens",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-notdone",
            "Je n'ai pas encore identifié les soutiens à mon projet.",
            "btn ldb_btn_small ldb_btn_notdone",
            "/beneficiaire/jidentifiemessoutiens",
            "J'identifie mes soutiens.",
            "etapejidentifiemessoutiens",
            "notdone",
            9999
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-text mdi-ldb-inprogress",
            "J'ai commencé à identifier les soutiens à mon projet.",
            "btn ldb_btn_small ldb_btn_inprogress",
            "/beneficiaire/jidentifiemessoutiens",
            "J'identifie mes soutiens.",
            "etapejidentifiemessoutiens",
            "inprogress",
            9999
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-check mdi-ldb-done",
            "J'ai identifié les soutiens à mon projet ou sais comment le faire.",
            "btn ldb_btn_small ldb_btn_done",
            "/beneficiaire/jidentifiemessoutiens",
            "J'identifie mes soutiens.",
            "etapejidentifiemessoutiens",
            "done",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-alert mdi-ldb-unavailable",
            "Je ne peux pas encore passer à cette étape.",
            "btn ldb_btn_small ldb_btn_unavailable",
            "/beneficiaire/jemeprepareetmelance",
            "Je me prépare et me lance",
            "etapejemeprepareetmelance",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard mdi-ldb-notdone",
            "Je ne me suis pas encore préparé à me lancer dans mon projet.",
            "btn ldb_btn_small ldb_btn_notdone",
            "/beneficiaire/jemeprepareetmelance",
            "Je me prépare et me lance",
            "etapejemeprepareetmelance",
            "notdone",
            9999
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-text mdi-ldb-inprogress",
            "J'ai commencé à préparer mon lancement.",
            "btn ldb_btn_small ldb_btn_inprogress",
            "/beneficiaire/jemeprepareetmelance",
            "Je me prépare et me lance",
            "etapejemeprepareetmelance",
            "inprogress",
            9999
        ),
        new monplanningitem(
            "mdi mdi-24px mdi-clipboard-check mdi-ldb-done",
            "J'ai préparé à me lancer dans mon projet. Je peux maintenant prendre rendez-vous.",
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
        console.log("this.jefaislepointitemrepository");
        console.log(this.jefaislepointitemrepository);
        console.log("this.dbuserinfoservice.userinfo.experience");
        console.log(this.dbuserinfoservice.userinfo.experience);
        for (let i = 0; i < this.jefaislepointitemrepository.length; i++) {
            if (this.dbuserinfoservice.userinfo.experience[this.jefaislepointitemrepository[i].formodule]==this.jefaislepointitemrepository[i].ifvalue) {
                console.log("here!");
                //Here, before pushing it to the jefaislepointitems, you can enhance them, check whether there are pending issues (meeting to prepare, etc.)
                this.jefaislepointitems.push(this.jefaislepointitemrepository[i]);
            }
        }
        console.log("this.jefaislepointitems");
        console.log(this.jefaislepointitems);
    }

    //sets the next important task, also shown in the mon planning menu.
    setnexttaskjefaislepoint ():void {
        let maxemergencylevel:number = 0;
        let itemnumber:number = 0;
        for (let i = 0; i < this.jefaislepointitems.length; i++) {
            console.log(this.jefaislepointitems[i].atext+"level : "+this.jefaislepointitems[i].emergencylevel);
            if (this.jefaislepointitems[i].emergencylevel >= maxemergencylevel) {
                maxemergencylevel=this.jefaislepointitems[i].emergencylevel;
                itemnumber = i;
            }
        }
        this.jefaislepointnexttask.item = this.jefaislepointitems[itemnumber];
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
}