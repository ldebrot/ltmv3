import { ReadwritebufferService } from './../../../../services/readwritebuffer.service';
import { QuizzService } from 'app/services/quizz.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cs-orderrelative',
    templateUrl: './cs-orderrelative.component.html',
    styleUrls: ['./cs-orderrelative.component.css']
})
export class CsOrderrelativeComponent implements OnInit {
    
    constructor(
        private quizzservice : QuizzService,
        private readwritebufferservice : ReadwritebufferService   
    ) { }
    
    ngOnInit() {
        this.maxpoints = this.quizzservice.currentcardobject.parameters.maxpoints;
        this.button_value[this.treasureid] = this.maxpoints;
        this.populatebuttonitems();
        this.setupbuttonservice();
    }
    
    public buttonitems : any[] = [];//holds button options, but stored according to position (not id!)
    public button_value : any = {};//holds values of each button, uses option id (not position!)
    public button_class : any = {};//holds classes of each button, uses option id (not position!)
    public pointrecipient_class : any = {};
    public buttonclassbasic : String = "csorderrelative_buttonitem";
    public pointrecipientclass : String = "csorderrelative_pointrecipient";
    public treasureclassbasic : String = "csorderrelative_treasure";
    public maxpoints : number = 0;
    public minpoints : number = 0;
    public treasurelevels : number = 4;//this is linked to the css classes, where there are 5 levels
    public treasureid = 99; //all 99 values pertain to treasure

    public increase(optionid){
        if (this.button_value[this.treasureid] > 0 && this.button_value[optionid] < this.maxpoints) {
            this.button_value[optionid]++;
            this.button_value[this.treasureid]--;
            this.updaterecipientclasses();
            this.updatetreasureclass();
        }
    }

    public decrease(optionid) : boolean {
        if (this.button_value[this.treasureid] < this.maxpoints && this.button_value[optionid] > this.minpoints) {
            this.button_value[optionid]--;
            this.button_value[this.treasureid]++;
            this.updaterecipientclasses();
            this.updatetreasureclass();
        }
        return false;
    }
    
    public populatebuttonitems () {
        this.buttonitems = [];
        for (let i = 0; i < this.quizzservice.currentcardobject.parameters.options.length; i++) {
            let temp_optionid = this.quizzservice.currentcardobject.parameters.options[i];
            this.buttonitems.push(this.quizzservice.currentcardobject["option"+String(temp_optionid)]);
        }
    }
    
    public getmeclasssuffix(optionid){
        let temp_divider = this.maxpoints / this.treasurelevels;
        let temp_value = this.button_value[optionid];
        let temp_level = String(Math.round(temp_value/temp_divider));
        return temp_level;
    }
    
    public updaterecipientclasses() {
        for (let i = 0; i < this.quizzservice.currentcardobject.parameters.options.length; i++) {
            let temp_optionid = this.quizzservice.currentcardobject.parameters.options[i];
            this.pointrecipient_class[temp_optionid] = "csorderrelative_" + this.getmeclasssuffix(temp_optionid) + " " + this.pointrecipientclass;
        }
    }
    
    public updatetreasureclass() {
        this.pointrecipient_class[this.treasureid] = "csorderrelative_" + this.getmeclasssuffix(this.treasureid) + " " + this.treasureclassbasic;  
    }
    
    public setupbuttonservice () {
        for (let i = 0; i < this.quizzservice.currentcardobject.parameters.options.length; i++) {
            let temp_optionid = this.quizzservice.currentcardobject.parameters.options[i];
            this.button_value[temp_optionid]=this.quizzservice.currentcardobject["option"+String(temp_optionid)].optionvalue;
            this.button_class[temp_optionid]=this.quizzservice.currentcardobject["option"+String(temp_optionid)].basicclass + " " + this.buttonclassbasic;          
        }
        this.updatetreasureclass();
        this.updaterecipientclasses();
        
        console.log("this.button_class");
        console.log(this.button_class);
        console.log("this.pointrecipient_class");
        console.log(this.pointrecipient_class);
    }
    
    
}
