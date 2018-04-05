import { Injectable } from '@angular/core';

//This service evaluates the experience saved in dbuserinfo Service
@Injectable()
export class ScoringevaluateService {
    
    constructor() { }

    //This is how the guide works :
    //1) It starts evaluating one item
    //2) It takes out the list of values to be gathered
    //3) It checks which values are available
    //4) It cycles through values to evaluate the item
    //5) It checks to what kind of card the value is attached
    //6) If value interpretation is continuous:
        //SimplePlacement -> value/max = value
        //MultipleChoice -> dilution based on min, max, selected and value
        //Orderrelative -> value/max
        //Orderregular_match --> if value=value (=order correct) --> value, else --> value
        //Orderregular_weighing --> ((ranks - rank)/ranks) - 1
        //Swipecards -> value = value
    //6) If value interpretation is discrete
        //SimplePlacement -> ?????
        //MultipleChoice -> ?????
        //Orderrelative -> ?????
        //Orderregular_match --> ?????
        //Orderregular_weighing --> ?????
        //Swipecards -> ?????
    //7) It checks how to integrate calculated value into item value
        //integration mode can be...
        //...set maximum (value can no longer be above)
        //...set minimum (value can no longer be below)
        //...set to value
        //...value (item value will be the )
    //8) It sets the value weight
        //0,1,2,3, etc.
        //-99 means absolute priority
    //9) It iteratively sums up calculated values to item value

    //guides contains different guide settings in an array
    public guides : any[] = [
        {
            id:1,//guide id 1
            name:"Guide 1",
            description:"Evaluates individual experiences",
            items:[
                {id:1, name:"Séniorité", description:"Années d'expérience professionnelle", valuetype:"discrete", valueunique:true, coefficientmax:10, coefficientmin:0},
                //séniorité : valeurs différentes, une seule option possible, distance quantifiable
                {id:2, name:"Métiers passés", description:"Métiers exercés avant la reconversion", valuetype:"discrete", valueunique:false, coefficientmax:10, coefficientmin:0},
                //métiers passés : valeurs différentes, plusieurs options possibles, distance quantifiable
                {id:3, name:"Métiers visés", description:"Métiers visés après la reconversion", valuetype:"discrete", valueunique:false, coefficientmax:10, coefficientmin:0},
                //métiers visés : valeurs différentes, plusieurs options possibles, distance quantifiable
                {id:4, name:"Raisons de la reconversion", description:"Raisons derrière la reconversion professionnelle", valuetype:"discrete", valueunique:false, coefficientmax:10, coefficientmin:0},
                //métiers visés : valeurs différentes, plusieurs options possibles, distance non-quantifiable
                {id:5, name:"Stade", description:"Raisons derrière la reconversion professionnelle", valuetype:"discrete", valueunique:false, coefficientmax:10, coefficientmin:0},
                //métiers visés : valeurs différentes, une seule option possible, distance quantifiable
            ]

        }
    ]

    public cards : any = {
    }
}
