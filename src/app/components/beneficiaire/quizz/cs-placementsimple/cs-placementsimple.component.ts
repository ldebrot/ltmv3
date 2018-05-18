import { ReadwritebufferService } from './../../../../services/readwritebuffer.service';
import { QuizzService } from './../../../../services/quizz.service';
import { Component, OnInit, ViewChild, SimpleChanges, AfterViewInit } from '@angular/core';
import { SliderModule } from 'primeng/primeng'
import { checkbuttontooltipmodel } from '../../../../services/checkbuttontooltipmodel.model';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-cs-placementsimple',
    templateUrl: './cs-placementsimple.component.html',
    styleUrls: ['./cs-placementsimple.component.css']
})
export class CsPlacementsimpleComponent implements OnInit {
    
    //sliderconfigs
    public slidervalue : number = 0 ;
    public oldslidervalue : number = -99;//stores old value in order to reduce readwritebuffer updates
    public sliderstyle : string = ""
    public sliderstep : number = 1;
    public slidermin : number = 0;
    public slidermax : number = 100;
    public sliderbasicclass : string = "csplacementsimpleslide";
    public cursorcaption : string = "";

    //options
    public numberofoptions : number = 0;
    public options : any = [];
    public basicclass_bullet = "csplacementsimplesliderbullet";
    public basicclass_caption = "csplacementsimpleslidercaption";    

    @ViewChild('indicatortooltip') public indicatortooltip: NgbTooltip;

    constructor(
        private quizzservice : QuizzService,
        private readwritebufferservice : ReadwritebufferService
    ) { 
    }
    
    ngOnInit() {
        this.setupconfiguration();
        this.setupelements();
        setTimeout(()=>{
            this.initialtooltipsetup();
        },100);
    }

    public initialtooltipsetup():void{
        this.quizzservice.setcheckbutton(true);
        let temp_instructions = new checkbuttontooltipmodel ("Clique ici quand tu as terminé",5000,9000);
        this.quizzservice.setcheckbuttontt(temp_instructions);
        this.indicatortooltip.open();
        this.indicatortooltip.close();
        setTimeout(()=>{
            this.indicatortooltip.open();
        },1000);
        setTimeout(()=>{
            this.indicatortooltip.close();
        },5000);
    }

    public setupconfiguration(){
        this.numberofoptions = this.quizzservice.currentcardobject.parameters.options.length;
        this.sliderstyle = "cssimpleplacementoptions" + String(this.numberofoptions)
        this.sliderstep = this.quizzservice.currentcardobject.parameters.step;
        this.slidermin = this.quizzservice.currentcardobject.parameters.min;
        this.slidermax = this.quizzservice.currentcardobject.parameters.max;
        this.cursorcaption = this.quizzservice.currentcardobject.parameters.cursorcaption;
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
            temp_option.bulletclass += " " + this.basicclass_bullet;
            temp_option.captionclass += " " + this.basicclass_caption;
            this.options.push(temp_option);
        }
    }

    public updaterwbuffer():void{
        if (this.oldslidervalue !== this.slidervalue){
            this.oldslidervalue = this.slidervalue;
            let temp_button_id = 1;//value is stored without taking into account steps/options
            let temp_button_value = this.slidervalue;
            let temp_option_id = String(this.quizzservice.currentquizzid) + "-" + String(this.quizzservice.currentcardid) +"-" + String(temp_button_id);    
            this.readwritebufferservice.updatebuffer(temp_option_id,temp_button_value,"update");            
        }
    }

    public setslidervaluetoclosest(event:any):void{
        let temp_distancearray = this.options.map((item,index) => {
            return Math.round(Math.abs((item.stepposition / this.slidermax) - (event.layerX/event.target.offsetWidth))*100);
        });
        this.setslidervalue(this.options[temp_distancearray.indexOf(Math.min.apply(Math, temp_distancearray))].stepposition);
        console.log("event.layerX)",event.layerX);
        console.log("event.target.offsetWidth",event.target.offsetWidth);
        console.log("this.options",this.options);
        console.log("temp_distancearray",temp_distancearray);
    }

    public setslidervalue(stepposition:number):void{
        this.slidervalue = stepposition;
        this.updaterwbuffer();
    }

    
}
