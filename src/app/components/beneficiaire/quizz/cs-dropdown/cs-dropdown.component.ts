import { DbuserinfoService } from './../../../../services/dbuserinfo.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

//My own stuff
import { QuizzService } from './../../../../services/quizz.service';
import { LibrarymetiersService } from './../../../../services/library_metiers.service';
import { ReadwritebufferService } from './../../../../services/readwritebuffer.service';

//PrimeNG here
import {AutoCompleteModule} from 'primeng/autocomplete';

//Underscore here
import * as _ from 'underscore';

@Component({
    selector: 'app-cs-dropdown',
    templateUrl: './cs-dropdown.component.html',
    styleUrls: ['./cs-dropdown.component.css']
})
export class CsDropdownComponent implements OnInit {
    
    public titlecaption : string = "";
    public prefiltersuggestionbase : any;//this object holds the suggestion base object 
    public suggestionbase : any[] = [];//this array holds all available suggestions (before any filtering for autocomplete)
    public autocompletevalue : string[] = [];//this array
    public autocompletesuggestions : string[];
    public autocompletemultiple : boolean = false;//this value defines whether multiple items can be selected
    public minselected : number = 0;
    public maxselected : number = 0;

    constructor(
        private librarymetiersservice : LibrarymetiersService,
        private quizzservice : QuizzService,
        private dbuserinfoservice : DbuserinfoService,
        private readwritebufferservice : ReadwritebufferService
    ) { }
    
    ngOnInit() {
        this.setuptitle();
        this.setupautocompleteoptions();
        this.setupprefiltersuggestionbase();
        this.setupsuggestionbase();
    }


    public autocompletesearch(event):void {
        this.checkifinarray(event.query);
    }

    public updateautocompletevalue():void{
        this.checknumberofvalues();
    }

    //generates experience id for read write buffer - uses option 1 by default
    public returnexperience():string{
        return String(this.quizzservice.currentquizzid) + "-" + String(this.quizzservice.currentcardid) +"-" + "1";
    }

    public checknumberofvalues():void{
        let temp_checkbuttonenabled : boolean = false;
        if (this.autocompletevalue.length>=this.minselected){
            temp_checkbuttonenabled = true;
            if (this.autocompletevalue.length>this.maxselected){
                this.autocompletevalue = this.autocompletevalue.slice(1);
            }
            this.readwritebufferservice.updatebuffer(this.returnexperience(),this.autocompletevalue,"update");
        }
        this.quizzservice.setcheckbutton(temp_checkbuttonenabled);
    }

    public checkifinarray(expression:string):void {
        this.autocompletesuggestions = []
        if (expression.length>2){
            this.suggestionbase.forEach((item,index)=>{
                if (String(" " + item).toLowerCase().includes(" " + expression.toLowerCase()) && !this.autocompletevalue.includes(String(item))) {
                    this.autocompletesuggestions.push(String(item));
                }
            });
        }
        //console.log(this.autocompletesuggestions);
        //console.log("this.autocompletevalue", this.autocompletevalue);
    }
    
    //set up prefilter suggestions
    public setupprefiltersuggestionbase():void{
        this.prefiltersuggestionbase = this.quizzservice.currentcardobject.parameters.suggestionbase;
        //check what kind of input is there and replaces placeholder by actual object if possible
        let temp_type : string = "";
        if (typeof this.prefiltersuggestionbase === "object"){
            if (Array.isArray(this.prefiltersuggestionbase)) {
                temp_type = "array";
            } else {
                temp_type = "object";
            }
        } else {
            temp_type = "placeholder";
        }
        //console.log("type of prefiltersuggestionbase :"+temp_type);

        //if prefiltersuggestionbase is an object, use valuekey to extract array
        if (temp_type === "object") {
            this.prefiltersuggestionbase = this.prefiltersuggestionbase[this.quizzservice.currentcardobject.parameters.valuekey]
        }

        //if prefiltersuggestionbase is an array, there is nothing to do
        if (temp_type === "array") {
        }

        //if prefiltersuggestionbase is a placeholder, you have to import it
        if (temp_type === "placeholder") {
            let validsuggestionbase : boolean = true;
            switch(String(this.prefiltersuggestionbase)) {
                case "metiers":
                    //console.log("suggestionbase is 'metiers'");
                    this.prefiltersuggestionbase = this.librarymetiersservice.metiers;
                    break
                default:
                    console.log("dropdown : did not find suggestionbase")
                    this.prefiltersuggestionbase = [];
                    validsuggestionbase = false;
                    break
            }
        }
        
    }

    public setupsuggestionbase():void{
        // TO BE FILTERED ? YES / NO
        let filters = this.quizzservice.currentcardobject.parameters.filters;//filters is a series of objects
        let filterkeyarray : any = Object.keys(filters);//this array holds all keys of the objects
        let filtervaluearray : any = Object.keys(filters).map(key=>filters[key]);//this array holds all values of the objects
        let prefiltersuggestionbasekeyarray : any = Object.keys(this.prefiltersuggestionbase);//this array holds all keys of the prefilter-suggestion base (if there is anything to be filtered, it would be logic that there are other objects in the prefilter-suggestionbase than the values)
        let currentvaluearray : any = [];//this array holds all values that will be matched with the values in the prefilter-suggestionbase during the filtering process
        let currentmatchingvalues : any = [];//this one holds the position of matching values for current filter
        let matchingvalues : any = [];//this one holds the positions of matching values

        //SAVE INTO SUGGESTIONBASE
        if (!Array.isArray(this.prefiltersuggestionbase)) {
            //console.log("placeholder is an object")
            this.suggestionbase = this.prefiltersuggestionbase[this.quizzservice.currentcardobject.parameters.valuekey]                
        } else {
            //console.log("placeholder is an array")
            this.suggestionbase = this.prefiltersuggestionbase
        }
        console.log("setupsuggestionbase: suggestion base before filtering is : ",this.suggestionbase);            

        //prepare array containing positions (indexes) of matching values
        if (filterkeyarray.length > 0 && prefiltersuggestionbasekeyarray.length > 0) {
            //there is at least one filter, so let's cycle through them
            for (let i = 0; i < filterkeyarray.length; i++) {
                if (prefiltersuggestionbasekeyarray.includes(filterkeyarray[i])) {
                    //console.log("setupsuggestionbase: Filterkey is available");
                    currentmatchingvalues = [];//reset list of current matching values (current = matching for this filter given that there can be several filters)
                    if (Array.isArray(this.prefiltersuggestionbase[filterkeyarray[i]])){
                        //console.log("setupsuggestionbase: Filterkey is an array");
                        if (Array.isArray(filtervaluearray[i])) {
                            //console.log("setupsuggestionbase: Filtervalue is an array");
                            currentvaluearray = filtervaluearray[i];
                        }else{
                            //console.log("setupsuggestionbase: Filtervalue is a placeholder");
                            if (this.dbuserinfoservice.userinfo.experience[filtervaluearray[i]]!=null){
                                console.log("filtervalue: ",filtervaluearray[i]," // experience: ",this.dbuserinfoservice.userinfo.experience[filtervaluearray[i]]);
                                if (Array.isArray(this.dbuserinfoservice.userinfo.experience[filtervaluearray[i]])){
                                    //console.log("setupsuggestionbase: placeholder refers to actual array")
                                    currentvaluearray = this.dbuserinfoservice.userinfo.experience[filtervaluearray[i]];
                                }else{
                                    //console.log("setupsuggestionbase: placeholder refers to value which is not an array")
                                    currentvaluearray = [];
                                    currentvaluearray.push(this.dbuserinfoservice.userinfo.experience[filtervaluearray[i]]);
                                }
                            }else{
                                console.log("setupsuggestionbase: placeholder refers to value which is not set")
                            }
                        }
                        //Let's loop through values in the pre-filter suggestion base and check whether they match with one of the matching values
                        this.prefiltersuggestionbase[filterkeyarray[i]].map((item, index)=>{
                            if (currentvaluearray.includes(item)){
                                currentmatchingvalues.push(index);
                            }
                        });
                        //now integrate currentmatchingvalues into matchingvalues (in case there are several filter keys)
                        if (i==0){
                            //this is the first key
                            matchingvalues = currentmatchingvalues;
                        } else {
                            matchingvalues = _.intersection(matchingvalues,currentmatchingvalues);
                        }
                        //console.log("currentmatchingvalues:", currentmatchingvalues);
                    } else {
                        console.log("setupsuggestionbase: Filterkey is not an array");
                    }

                } else {
                    console.log("setupsuggestionbase : Filterkey >>",filterkeyarray[i],"<< is not in prefiltersuggestionbase");
                }
            }
            //Filter out matching values in suggestionbase
            let temp_suggestionbase = [];
            this.suggestionbase.map((value,index)=>{
                if (matchingvalues.includes(index)) {
                    if (!temp_suggestionbase.includes(value)) {
                        temp_suggestionbase.push(value);
                    }
                }
            });
            this.suggestionbase = temp_suggestionbase;
            console.log("setupsuggestionbase: suggestion base after filtering is : ",this.suggestionbase);            
        }else{
            console.log("setupsuggestionbase : there is no filter");
        }
        

}

    public setuptitle():void {
        if (this.quizzservice.currentcardobject.parameters.titlecaption != null) {
            this.titlecaption = this.quizzservice.currentcardobject.parameters.titlecaption;
        }
    }

    public setupautocompleteoptions():void{
        if (this.quizzservice.currentcardobject.parameters.minselected != null) {
            this.minselected = this.quizzservice.currentcardobject.parameters.minselected;
        }
        if (this.quizzservice.currentcardobject.parameters.maxselected != null) {
            this.maxselected = this.quizzservice.currentcardobject.parameters.maxselected;
            this.autocompletemultiple = (this.maxselected>1) ? true : false;
        }
    }

}
