//This service handles navigation modules: for instance, it says whether the user can take an appointment, it sets the todos, etc.

import { Injectable } from '@angular/core';
import { DbuserinfoService } from './dbuserinfo.service';
import { monplanningitem } from './monplanning.model';

@Injectable()
export class NavigationService {

    constructor(
        private dbuserinfoservice:DbuserinfoService
    ){

    }
   
    public monplanningitems:any = [];
    public mynexttask:any = {
        title : "Ma prochaine étape :",
        item : {}
    };

    public monplanningitemrepository = [
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard-alert mdi-ldb-primary","btn ldb_btn ldb_btn_primary",
            "/beneficiaire/jefaislepoint",
            "Je fais le point sur ma reconversion professionnelle.",
            "modulejefaislepoint",
            "notdone",
            1000
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard-check mdi-ldb-done","btn ldb_btn ldb_btn_done",
            "/beneficiaire/jefaislepoint",
            "J'ai fait le point sur ma reconversion professionnelle.",
            "modulejefaislepoint",
            "done",
            0
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-unavailable",
            "btn ldb_btn ldb_btn_unavailable",
            "/beneficiaire/jeprendsrendezvous",
            "Je contacte une personne qui a déjà changé de métier.",
            "modulejeprendsrendezvous",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-notdone",
            "btn ldb_btn ldb_btn_notdone",
            "/beneficiaire/jeprendsrendezvous",
            "Je contacte une personne qui a déjà changé de métier.",
            "modulejeprendsrendezvous",
            "notdone",
            100
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard-check mdi-ldb-done",
            "btn ldb_btn ldb_btn_done",
            "/beneficiaire/jeprendsrendezvous",
            "Je contacte une personne qui a déjà changé de métier.",
            "modulejeprendsrendezvous",
            "done",
            10
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-unavailable",
            "btn ldb_btn ldb_btn_unavailable",
            "/beneficiaire/jepreparemarencontre",
            "Je prépare ma rencontre avec un témoin.",
            "modulejepreparemarencontre",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-notdone",
            "btn ldb_btn ldb_btn_notdone",
            "/beneficiaire/jepreparemarencontre",
            "Je prépare ma rencontre avec un témoin.",
            "modulejepreparemarencontre",
            "notdone",
            1000
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-todo",
            "btn ldb_btn ldb_btn_todo",
            "/beneficiaire/jepreparemarencontre",
            "Je prépare ma rencontre avec un témoin.",
            "modulejepreparemarencontre",
            "todo",
            10000
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard-check mdi-ldb-done",
            "btn ldb_btn ldb_btn_done",
            "/beneficiaire/jepreparemarencontre",
            "Je prépare ma rencontre avec un témoin.",
            "modulejepreparemarencontre",
            "done",
            0
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-unavailable",
            "btn ldb_btn ldb_btn_unavailable",
            "/beneficiaire/jefaislesuivi",
            "Je fais le suivi de ma rencontre.",
            "modulejefaislesuivi",
            "unavailable",
            0
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-notdone",
            "btn ldb_btn ldb_btn_notdone",
            "/beneficiaire/jefaislesuivi",
            "Je fais le suivi de ma rencontre.",
            "modulejefaislesuivi",
            "notdone",
            100
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard mdi-ldb-todo",
            "btn ldb_btn ldb_btn_todo",
            "/beneficiaire/jefaislesuivi",
            "Je fais le suivi de ma rencontre.",
            "modulejefaislesuivi",
            "todo",
            1000
        ),
        new monplanningitem(
            "mdi mdi-36px mdi-clipboard-check mdi-ldb-done",
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
    setnexttask ():void {
        let maxemergencylevel:number = 0;
        let itemnumber:number = 0;
        for (let i = 0; i < this.monplanningitems.length; i++) {
            console.log(this.monplanningitems[i].atext+"level : "+this.monplanningitems[i].emergencylevel);
            if (this.monplanningitems[i].emergencylevel >= maxemergencylevel) {
                maxemergencylevel=this.monplanningitems[i].emergencylevel;
                itemnumber = i;
            }
        }
        this.mynexttask.item = this.monplanningitems[itemnumber];
    }
    

}