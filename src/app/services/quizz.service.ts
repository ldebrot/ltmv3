import { QuizzcardsService } from './quizzcards.service';
import { QuizzesService } from './quizzes.service';

//ReactiveX
import "rxjs/Rx";
import { Subject } from "rxjs/Subject";

//This service handles the meetings based on dbuserinfo

//Firebase service

//Built-in stuff:
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

//Hand-made
import { QuizzComponent } from './../components/beneficiaire/quizz/quizz.component';
import { checkbuttontooltipmodel } from "./checkbuttontooltipmodel.model";
import { DbuserinfoService } from './dbuserinfo.service';
import { ReadwritebufferService } from './readwritebuffer.service';
import { quizzitemmodel } from "./quizzitem.model";
import { delay } from "rxjs/operator/delay";
import { Router } from "@angular/router";

//Firebase


@Injectable()
export class QuizzService implements OnInit{
    
    constructor(
        private readwritebufferservice : ReadwritebufferService,
        private dbuserinfoservice : DbuserinfoService,
        private router : Router,
        private quizzesservice : QuizzesService,
        private quizzcardsservice : QuizzcardsService
    ) {
        this.cards = this.quizzcardsservice.cards;
        this.quizzes = this.quizzesservice.quizzes;
    }

    ngOnInit() {
    }

    public currentquizzid : number = 0;
    public currentquizzobject : any = {};//this holds the current quizz object
    public currentcardid : number = 0;
    public currentcardsubject : Subject<number> = new Subject();
    public currentcardobject : any = {};//this holds the current card object
    public currentcardposition : number = -99;//this is the position of the current card in the currentcardset

    public checkbuttonsubject : Subject<boolean> = new Subject();//this observable subject holds the value of check button being enabled or disabled
    public checkbuttonttsubject : Subject<checkbuttontooltipmodel> = new Subject();//this observable subject triggers changes in and shows checkbutton tooltip
    public checkbuttonstatus : boolean = false;//stores value of checkbutton. False means not visible

    public currentquizzselection : any[] = [];//holds the current quizz selection shown in quizzselection component

    //go to next card
    public gotonextcard(){
        this.readwritebufferservice.transmitbuffer();//has to be first here to make condition check possible
        if(this.setcurrentcardpositiontonext()){//makes position changed, if position changed, returns true and actually loads card
            this.chargecardbyposition(this.currentcardposition, false);
        }
    }

    //initiates quizz
    public chargequizzbyid(quizzid:number, checkifchanged?:boolean){
        if (this.currentquizzid !== quizzid || checkifchanged==false) {
            this.currentquizzid = quizzid;//updates current quizz id
            this.updatecurrentquizzobject();//updates current quizz object
            console.log("quizzservice : loaded quizz id "+ this.currentquizzid);
        } else {
            console.log("quizzservice : quizz id did not change!")
        }
    }

    public checkifquizzloaded():boolean{
        let temp_result : boolean = false;
        if (this.currentquizzid!== 0 
            && this.currentquizzobject.cardids.length !== 0 
            && this.currentcardobject.parameters != null){
                temp_result = true
            }
        return temp_result;
    }

    //set card position to the beginning
    public setcurrentcardpositiontofirst(){
        this.currentcardposition = 0;
        console.log("current card position set to"+this.currentcardposition);
    }

    //set card position to next, returns true if currentcardpositionchanged
    public setcurrentcardpositiontonext():boolean{
        let temp_cardpositionchanged : boolean = false;
        let temp_maxposition : number = this.currentquizzobject.cardids.length - 1;
        if (this.currentcardposition < temp_maxposition) {
            this.currentcardposition++;
            console.log("current card position set to"+this.currentcardposition);

            //let's check whether there is a condition to be met            
            let temp_idofnextcard : number = this.currentquizzobject.cardids[(this.currentcardposition)];
            let temp_nextcarditem : any = this.cards["card"+temp_idofnextcard];
            let temp_nbconditions : number = 0;
            if (temp_nextcarditem.optional.condition != null){
                    temp_nbconditions = temp_nextcarditem.optional.condition.length;
            }
            console.log("We have "+temp_nbconditions+" condition(s) to be met for this card");

            //let's check any conditions
            if (temp_nbconditions>0){
                let temp_conditionsmet : boolean = false;
                temp_nextcarditem.optional.condition.forEach(element => {
                    if (element.compulsory) {
                        //if condition is compulsory, visible is set to false it if condition unmet
                        temp_conditionsmet = this.checkifconditionmet(element.experience, element.value);
                    } else {
                        //if condition is not compulsory, visible is set to true only if condition met
                        if (this.checkifconditionmet(element.experience, element.value)) {
                            temp_conditionsmet = true;
                        }
                    };
                });

                if (temp_conditionsmet) {
                    temp_cardpositionchanged = true;//conditions met, so cardpositionchanged
                    console.log("conditions for card are met");
                } else {
                    console.log("conditions for card are NOT met. Jump to next.");
                    setTimeout(() => {
                        this.gotonextcard();
                    }, 100);
                }
            } else {
                temp_cardpositionchanged = true;//no conditions to be met, so cardpositionchanged
            }

        } else {
            console.log("you reached the end of the quizz at card position "+this.currentcardposition+".");
            if (this.currentquizzobject.followupaction!=null){
                this.processfollowupaction(this.currentquizzobject.followupaction);
            } else {
                console.log("no follow-up action indicated");
            }
        }
        return temp_cardpositionchanged;
    }

    //follow-up action designates what happens after a quizz has reached the end
    public processfollowupaction(followupaction:any){
        let temp_command :string = (followupaction.command == null) ? "empty" : followupaction.command; 
        switch(temp_command) {
            case "navigate":
                let temp_route : string = (followupaction.route == null) ? "empty" : followupaction.route;
                if (temp_route != "empty") {
                    console.log("will navigate to "+temp_route);
                    this.router.navigate([temp_route]);//go to main after creating account                                
                } else {
                    console.log("route not specified. therefore no navigation")
                }
                break
            default:
                console.log("processfollowupaction: could not determine followupaction")
                break
        }
    }

    //launches card by specified position
    public chargecardbyposition(cardposition:number, checkifchanged?:boolean){
        if (this.currentcardposition !== cardposition || checkifchanged==false) {
            this.currentcardposition = cardposition;//updates current card position (which is not the card id!)
            this.updatecurrentcardobjectbyposition(this.currentcardposition);//updates current card object
            this.updatecurrentcardid(this.currentcardposition);
            console.log("quizzservice : loaded  card id "+ this.currentcardid);
            this.currentcardsubject.next(this.currentcardid);
        } else {
            console.log("quizzservice : card position did not change!")
        }
    }

    public updatecurrentquizzobject() {
        //gets current quizz object based on current quizz id
        this.currentquizzobject = this.quizzes["quizz"+String(this.currentquizzid)];
    }

    public updatecurrentcardobjectbyposition(cardposition : number) {
        //gets current card object based on current card position
        let temp_cardid = this.currentquizzobject.cardids[cardposition];
        this.currentcardobject = this.cards["card"+String(temp_cardid)]
        console.log("this.currentcardobject");
        console.log(this.currentcardobject);
    }

    public updatecurrentcardid(cardposition:number) {
        this.currentcardid = this.currentquizzobject.cardids[cardposition];
    }

    public setcheckbutton (value:boolean){
        this.checkbuttonstatus = value;
        this.checkbuttonsubject.next(value);
    }

    public setcheckbuttontt (instructions:checkbuttontooltipmodel){
        this.checkbuttonttsubject.next(instructions);
    }

    public createquizzselection():void{
        this.currentquizzselection = [];
        Object.keys(this.quizzes).map((key)=>{
            //console.log(key);
            //console.log(this.quizzes[key]);
            let temp_iconclass = this.quizzes[key].iconclass;
            let temp_description = this.quizzes[key].description;
            let temp_caption = this.quizzes[key].caption;
            let temp_visible = true;
            let temp_quizzid = key.slice(5,);//this takes off 'quizz' in the beginning of the key
            //check if to be visible
            if (this.quizzes[key].conditionvisible!==false){
                temp_visible = false;
                let temp_conditions = this.quizzes[key].conditionvisible.length;
                console.log("We have "+temp_conditions+" condition(s) to be met for visibility");
                this.quizzes[key].conditionvisible.forEach(element => {
                    if (element.compulsory) {
                        //if condition is compulsory, visible is set to false it if condition unmet
                        temp_visible = this.checkifconditionmet(element.experience, element.value);
                    } else {
                        //if condition is not compulsory, visible is set to true only if condition met
                        if (this.checkifconditionmet(element.experience, element.value)) {
                            temp_visible = true;
                        }
                    }
                });
            } else {
                console.log ("no visibility condition")
            }
            if (temp_visible) {
                let temp_newentry = new quizzitemmodel(temp_iconclass,temp_description,temp_caption,temp_visible, temp_quizzid);
                this.currentquizzselection.push(temp_newentry);
            }
        });
        //console.log("created quizz selection");
        //console.log(this.currentquizzselection);
    }

    public checkifconditionmet(experience:string, value:any):boolean{
        let temp_result : boolean = false;
        if (this.dbuserinfoservice.userinfo.experience[experience]!=null){
            temp_result = (this.dbuserinfoservice.userinfo.experience[experience] == value) ? true : false;
        } else {
            if (value == undefined) {
                temp_result = true;
            }
        }
        return temp_result;
    }

//xcards

    public cards:any = {

    } 
    
//xquizzes

    public quizzes:any = {
    }

}