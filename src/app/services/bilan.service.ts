//This service handles the situation recap (jeconsultemonbilan)

//Built-in
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

//Hand-made
import { bilantask } from './bilantask.model';
import { NavigationService } from './navigation.service';
import { DbuserinfoService } from './dbuserinfo.service';

@Injectable()
export class BilanService implements OnInit {


    //isinarray = multiple values to be checked (in expectedvalued) in an array (in experiencefield)
    //isvalue = is this the value of the experiencefield ?

    public bilanitemrepository_selected = {};//a selection of items which correspond to the choices of the user
    public levelitems = [];
    public totalcount = {};

    constructor(
        public navigationservice : NavigationService,
        public dbuserinfoservice : DbuserinfoService
    ){
    }

    public assesslevel():void {
        this.navigationservice.preparejefaislepointitems();//sets up the list of button in the monplanning menu.
        this.levelitems = this.navigationservice.jefaislepointitems;//take all available levels (=jefaislepointitems)
        //tempy everything
        this.bilanitemrepository_selected = []
        this.totalcount = {
            temoin : {},
            beneficiaire : {}
        };

        for (let i = 0; i < this.levelitems.length; i++) {
            this.bilanitemrepository_selected[this.levelitems[i].formodule]=[];
            this.levelitems[i]['beneficiairecount']=0;
            this.levelitems[i]['temoincount']=0;
            this.totalcount['temoin'][this.levelitems[i].formodule]=0;
            this.totalcount['beneficiaire'][this.levelitems[i].formodule]=0;            
        }

        for (let i = 0; i < this.bilanitemrepository.length; i++) {

            /*

            !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            SHIT GOES DOWN HERE
            WHY IS BILANITEMREPOSITORY_SELECTED EMPTY??
            !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            */

            if (this.bilanitemrepository[i].expectedvalue === this.dbuserinfoservice.userinfo.experience[this.bilanitemrepository[i].experiencefield]){
                this.bilanitemrepository_selected[this.bilanitemrepository[i].modulelevel].push(this.bilanitemrepository[i]);
                this.totalcount[this.bilanitemrepository[i].assignedto][this.bilanitemrepository[i].modulelevel]+=this.bilanitemrepository[i].impact;
            }
        }

        for (let i = 0; i < this.levelitems.length; i++) {
            this.levelitems[i].beneficiairecount=this.totalcount['beneficiaire'][this.levelitems[i].formodule];
            this.levelitems[i].temoincount=this.totalcount['temoin'][this.levelitems[i].formodule];
        }

        console.log("this.totalcount");
        console.log(this.totalcount);
        console.log("this.levelitems");
        console.log(this.levelitems);
        console.log("this.bilanitemrepository_selected");
        console.log(this.bilanitemrepository_selected);

        
    }

    public bilanitemrepository =  [
        new bilantask(
            "isinarray",//validationtype
            "J'ai indiqué vouloir exercer une activité d'indépendant ou d'entrepreneur.",//name
            "Lunchtime s'adresse actuellement aux personnes souhaitant se reconvertir dans une activité salariée. D'autres organismes proposent un accompagnement dédiés aux personnes souhaitant développer leur propre activité",//message
            "",//route
            "etapejeconstruismonprojet",//modulelevel
            1,//step
            "jeconstruismonprojetstep1values",//experiencefield
            [4,5,6],//expectedvalue
            "temoin",//assignedto
            -99,//impact
            "mdi mdi-24px mdi-block-helper",//iconclass
        ),
        new bilantask(
            "isinarray",//validationtype
            "J'ai indiqué vouloir exercer une activité salariée",//name
            "",//message
            "",//route
            "etapejeconstruismonprojet",//modulelevel
            1,//step
            "jeconstruismonprojetstep1values",//experiencefield
            [1,2,3],//expectedvalue
            "temoin",//assignedto
            99,//impact
            "",//iconclass
        ),    
        new bilantask(
            "isinarray",//validationtype
            "Je ne sais pas encore quel type d'activité je souhaite exercer.",//name
            "",//message
            "",//route
            "etapejeconstruismonprojet",//modulelevel
            1,//step
            "jeconstruismonprojetstep1values",//experiencefield
            [7],//expectedvalue
            "beneficiaire",//assignedto
            3,//impact
            "mdi mdi-24px mdi-help",//iconclass
        )        
    ]

            //string : "isinarray"/"isvalue" : validationtype
            //string : name
            //string : message
            //string or empty : route
            //name of module : modulelevel
            //step number : step
            //string : experiencefield
            //array : expectedvalue
            //string : "beneficiaire", "temoin" or "jeveuxensavoirplus" : assignedto
            //number : impact
            //string : iconclass


    ngOnInit(){

    }

}