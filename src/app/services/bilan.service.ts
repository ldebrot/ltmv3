//This service handles the situation recap (jeconsultemonbilan)

//Built-in
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

//Hand-made
import { bilantask } from './bilantask.model';

@Injectable()
export class BilanService implements OnInit {


    //isinarray = multiple values to be checked (in expectedvalued) in an array (in experiencefield)
    //isvalue = is this the value of the experiencefield ?

    public bilanitemrepository_filtered = [];

    constructor(
    ){

    }

    public assesslevel(level:string):void {
        this.bilanitemrepository_filtered = []
        for (let i = 0; i < this.bilanitemrepository.length; i++) {
            if (this.bilanitemrepository[i].modulelevel===level){
                this.bilanitemrepository_filtered.push(this.bilanitemrepository[i])
            }
        }
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
            "mdi mdi-block-helper",//iconclass
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
            "mdi mdi-help",//iconclass
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