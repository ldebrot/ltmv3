import { QuizzService } from './../../../../services/quizz.service';
import { Component, OnInit } from '@angular/core';
import { SliderModule } from 'primeng/primeng'

@Component({
    selector: 'app-cs-placementsimple',
    templateUrl: './cs-placementsimple.component.html',
    styleUrls: ['./cs-placementsimple.component.css']
})
export class CsPlacementsimpleComponent implements OnInit {
    
    //sliderconfigs
    public slidervalue : Number = 0 ;
    public sliderstyle : String = ""
    public sliderstep : Number = 1;
    public slidermin : Number = 0;
    public slidermax : Number = 100;
    public sliderbasicclass : String = "csplacementsimpleslide";

    //options
    public numberofoptions : Number = 0;
    public options : any = [];
    public elementbasicclass : String = "csplacementsimpleelement";
    public elementheightclasssuffix : String = "csplacementsimpleelementheight";

    constructor(
        private quizzservice : QuizzService
    ) { }
    
    ngOnInit() {
        this.setupconfiguration();
        this.setupelements();
    }

    public setupconfiguration(){
        this.numberofoptions = this.quizzservice.currentcardobject.parameters.options.length;
        this.sliderstyle = "cssimpleplacementoptions" + String(this.numberofoptions)
        this.sliderstep = this.quizzservice.currentcardobject.parameters.step;
        this.slidermin = this.quizzservice.currentcardobject.parameters.min;
        this.slidermax = this.quizzservice.currentcardobject.parameters.max;
        console.log("this.sliderstep");
        console.log(this.sliderstep);
        console.log("this.slidermin");
        console.log(this.slidermin);
        console.log("this.slidermax");
        console.log(this.slidermax);
    }

    public setupelements(){
        this.options = [];//reset options
        for (let i = 0; i < this.numberofoptions; i++) {
            let temp_option : any = {};
            let temp_optionid = this.quizzservice.currentcardobject.parameters.options[i];
            temp_option = this.quizzservice.currentcardobject.options["option"+String(temp_optionid)]
            temp_option.class += (" "+this.elementbasicclass+" "+this.elementheightclasssuffix+String(this.numberofoptions));
            this.options.push(temp_option);
        }
    }
    
}
