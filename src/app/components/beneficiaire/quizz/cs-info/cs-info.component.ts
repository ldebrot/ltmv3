import { QuizzService } from 'app/services/quizz.service';
import { Component, OnInit } from '@angular/core';
import { ProgressBarModule } from 'primeng/primeng';
import { checkbuttontooltipmodel } from '../../../../services/checkbuttontooltipmodel.model';

@Component({
    selector: 'app-cs-info',
    templateUrl: './cs-info.component.html',
    styleUrls: ['./cs-info.component.css']
})
export class CsInfoComponent implements OnInit {
    
    //Timeline Timer stuff
    public timervisible : boolean = false;
    public timercurrentstep : number = 0;
    public timermaxsteps : number = 1;
    public timercharactersperstep : number = 7;
    public timerstepinterval : number = 200;//in milliseconds
    public timerstartinterval : number = 1000;//in milliseconds
    public timertotaltime : number = 0;//in milliseconds

    //Word animation Timer stuff
    public wordanimation : boolean = false;
    public wordanimationtimerinterval : number = 0;
    public wordanimationtimermaxsteps : number = 0;
    public wordanimationtimercurrentstep : number = 0;

    //Card stuff
    public cardtext : string = "";
    public wordset : any[] = [];
    public wordclassstart : string = "csinfoworditem csinfoworditemstart";
    public wordclassend : string = "csinfoworditem csinfoworditemend";
    public wordclassnl : string = "csinfoworditem csinfoworditemnewline";

    constructor(
        private quizzservice : QuizzService
    ) {        
     }
    
    ngOnInit() {
        this.setupcard();
        this.setuptimer();
        this.quizzservice.setcheckbutton(false);
    }

    //check whether there is word animation
    public istherewordanimation():boolean{
        let temp_result : boolean = false;
        if(this.quizzservice.currentcardobject.optional.textanimation != null){
            if (this.quizzservice.currentcardobject.optional.textanimation) {
                temp_result = true
            }
        }
        return temp_result;        
    }

    //Timer stuff
    public setuptimer() {
        this.timervisible = this.quizzservice.currentcardobject.optional.timer; 
        if (this.quizzservice.currentcardobject.optional.timer === true) {

            //define timer for timeline
            this.timercurrentstep = 0;//reset current step
            let tempmaxsteps = Math.round(this.quizzservice.currentcardobject.optional.text.length / this.timercharactersperstep);
            this.timermaxsteps = tempmaxsteps === 0 ? 1 : tempmaxsteps;
            setTimeout(()=>{this.timelinetimermove();},this.timerstartinterval);

            //get total time
            this.timertotaltime = this.timerstartinterval + (this.timermaxsteps * this.timerstepinterval);

            //define timer for words
            if(this.istherewordanimation()){
                this.wordanimationtimermaxsteps = this.wordset.length === 0 ? 1 : this.wordset.length;
                this.wordanimationtimerinterval = Math.round(this.timertotaltime / this.wordanimationtimermaxsteps);
                setTimeout(()=>{this.wordanimationtimermove();},this.wordanimationtimerinterval);
            }

        }
    }

    public timelinetimermove() {
        //console.log("this.timercurrentstep");
        //console.log(this.timercurrentstep);
        if (this.timercurrentstep < this.timermaxsteps) {
            this.timercurrentstep++;
            setTimeout(()=>{this.timelinetimermove();},this.timerstepinterval);
        } else {
            this.quizzservice.setcheckbutton(true);
            let temp_instructions = new checkbuttontooltipmodel ("Clique ici quand tu as terminé",0,4000);
            this.quizzservice.setcheckbuttontt(temp_instructions);
        }
    }

    public wordanimationtimermove() {
//        console.log("this.wordanimationtimercurrentstep");
//        console.log(this.wordanimationtimercurrentstep);
        if (this.wordanimationtimercurrentstep < this.wordanimationtimermaxsteps) {
            if (this.wordanimationtimercurrentstep + 1 < this.wordanimationtimermaxsteps) {
                if (this.wordset[this.wordanimationtimercurrentstep+1].content=="!" ||
                    this.wordset[this.wordanimationtimercurrentstep+1].content=="?") {
                    let temp_sign = this.wordset[this.wordanimationtimercurrentstep+1].content;
                    this.wordset[this.wordanimationtimercurrentstep].content += " "+temp_sign;
                    this.wordset[this.wordanimationtimercurrentstep+1].content = "";
                }
            }
            this.wordset[this.wordanimationtimercurrentstep].class = (this.wordset[this.wordanimationtimercurrentstep].content == "<nl>") ? this.wordclassnl : this.wordclassend;
            this.wordanimationtimercurrentstep++;
            setTimeout(()=>{this.wordanimationtimermove();},this.wordanimationtimerinterval);
        }
    }

    //Card stuff
    public setupcard() {
        this.wordset = [];
        if (this.istherewordanimation()) {
            if (this.quizzservice.currentcardobject.optional.text.length>0){
                this.quizzservice.currentcardobject.optional.text.split(" ").forEach((value)=>{
                    let temp_class : string = (value == "<nl>") ? this.wordclassnl : this.wordclassstart;
                    let temp_wordsetitem = {content : value, class : temp_class};
                    this.wordset.push(temp_wordsetitem);
                });
            }
        } else {
            let temp_class : string = this.wordclassend;
            let temp_wordsetitem = {content : this.quizzservice.currentcardobject.optional.text, class : temp_class};
            this.wordset.push(temp_wordsetitem);
        }
    }

}
