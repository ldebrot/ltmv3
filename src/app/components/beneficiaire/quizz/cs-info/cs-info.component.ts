import { QuizzService } from 'app/services/quizz.service';
import { Component, OnInit } from '@angular/core';
import { ProgressBarModule } from 'primeng/primeng';

@Component({
    selector: 'app-cs-info',
    templateUrl: './cs-info.component.html',
    styleUrls: ['./cs-info.component.css']
})
export class CsInfoComponent implements OnInit {
    
    //Timer stuff
    public timervisible : boolean = false;
    public timercurrentstep : number = 0;
    public timermaxsteps : number = 1;
    public timercharactersperstep : number = 7;
    public timerstepinterval : number = 200;//in milliseconds
    public timerstartinterval : number = 1000;//in milliseconds

    //Card stuff
    public cardtext : String = "";
    
    constructor(
        private quizzservice : QuizzService
    ) {        
     }
    
    ngOnInit() {
        this.setuptimer();
        this.setupcard();
    }

    //Timer stuff

    public setuptimer() {
        this.timervisible = this.quizzservice.currentcardobject.optional.timer; 
        if (this.quizzservice.currentcardobject.optional.timer === true) {
            this.timercurrentstep = 0;//reset current step
            let tempmaxsteps = Math.round(this.quizzservice.currentcardobject.optional.text.length / this.timercharactersperstep);
            this.timermaxsteps = tempmaxsteps === 0 ? 1 : tempmaxsteps;
            //console.log("this.timermaxsteps");
            //console.log(this.timermaxsteps);
            setTimeout(()=>{this.movetimer();},this.timerstartinterval);
        }
    }

    public movetimer() {
        //console.log("this.timercurrentstep");
        //console.log(this.timercurrentstep);
        if (this.timercurrentstep < this.timermaxsteps) {
            this.timercurrentstep++;
            setTimeout(()=>{this.movetimer();},this.timerstepinterval);
        }
    }

    //Card stuff

    public setupcard() {
        this.cardtext = this.quizzservice.currentcardobject.optional.text;
    }

}
