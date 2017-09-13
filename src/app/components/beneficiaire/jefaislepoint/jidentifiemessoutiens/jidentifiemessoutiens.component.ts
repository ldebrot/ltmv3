//Built-in
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//PrimeNG
import { ProgressBarModule, CheckboxModule, SelectButtonModule, SelectItem, ToggleButtonModule } from 'primeng/primeng';

//Home-grown:
import { NavigationService } from './../../../../services/navigation.service';
import { DbuserinfoService } from './../../../../services/dbuserinfo.service';
import { ReadwritebufferService } from './../../../../services/readwritebuffer.service';

@Component({
    selector: 'app-jidentifiemessoutiens',
    templateUrl: './jidentifiemessoutiens.component.html',
    styleUrls: ['./jidentifiemessoutiens.component.css']
})
export class JidentifiemessoutiensComponent implements OnInit {
    
    
    public currentstepvalid:boolean=false;
    public ouinon : SelectItem[];
    public jidentifiemessoutiensjeveuxensavoirplus: string[] = [];
    
    public localvalues = {
    };    
    
    constructor(
        public navigationservice: NavigationService,
        public dbuserinfoservice: DbuserinfoService,
        public readwritebufferservice: ReadwritebufferService,
        public activatedroute : ActivatedRoute
    ) {
        this.ouinon = [];
        this.ouinon.push({label:'OUI', value:'oui'})
        this.ouinon.push({label:'NON', value:'non'})
    }
    
    ngOnInit() {
        
        this.setstepatbeginning();
        this.initiate();
        this.checkifstepvalid();
        if (this.activatedroute.snapshot.params['step']!==undefined) {
            if (this.activatedroute.snapshot.params['step'].toString()!==""){
                this.navigationservice.jidentifiemessoutienscurrentstep=Number(this.activatedroute.snapshot.params['step']);
            }
        }
    }
    
    ngOnDestroy() {
        this.checkifinprogress();
        this.navigationservice.updatemodulelevels();
        this.readwritebufferservice.transmitbuffer();
        this.readwritebufferservice.emptybuffer();
    }
    
    //This function initiates the module by filling in values from dbuserservice
    //it fills in only for the steps indicated in OnInit
    public initiate():void {
        for (let i = 0; i < Object.keys(this.localvalues).length; i++) {
            //console.log(Object.keys(this.localvalues)[i])
            if (this.dbuserinfoservice.userinfo.experience[Object.keys(this.localvalues)[i]]!=="") {
                //console.log("Object.keys(this.localvalues)[i]");
                //console.log(Object.keys(this.localvalues)[i]);
                //console.log("this.dbuserinfoservice.userinfo.experience[Object.keys(this.localvalues)[i]]");
                //console.log(this.dbuserinfoservice.userinfo.experience[Object.keys(this.localvalues)[i]]);
                this.localvalues[Object.keys(this.localvalues)[i]]=this.dbuserinfoservice.userinfo.experience[Object.keys(this.localvalues)[i]];
            }
        }
    }
    
    public valuechanged(objectname:any):void {
        this.readwritebufferservice.updatebuffer(objectname,this.localvalues[objectname],"update");
        this.checkifstepvalid();
    }
    
    public checkifstepvalid():void{
        let tempnumbera : number = 0;
        let tempnumberb : number = 0;
        switch (this.navigationservice.jidentifiemessoutienscurrentstep) {
            default:
            console.log("cannot check whether step is valid");
            this.currentstepvalid = false;
        }
    }
    
    public goonestepfurther():void {
        this.navigationservice.jidentifiemessoutienscurrentstep = this.navigationservice.jidentifiemessoutienscurrentstep + 1;
        this.checkifstepvalid();
        console.log("currentstep: "+this.navigationservice.jidentifiemessoutienscurrentstep);
        if (this.navigationservice.jidentifiemessoutienscurrentstep === this.navigationservice.jidentifiemessoutiensnumberofsteps) {
            this.conclude();
        }
    } 
    
    //This function "concludes" this module 
    public conclude():void{
        this.readwritebufferservice.updatebuffer("etapejidentifiemessoutiens","done","update");
        this.readwritebufferservice.transmitbuffer();
    }
    
    //This function checks whether the current module is in progress (is not done, but does have changes)
    public checkifinprogress():void{
        if(
            this.dbuserinfoservice.userinfo.experience.etapejeconstruismonprojet!=="done"
            && this.dbuserinfoservice.userinfo.experience.etapejeconstruismonprojet!=="inprogress"
            && Object.keys(this.readwritebufferservice.buffer).length!==0
        ){
            this.readwritebufferservice.updatebuffer("etapejeconstruismonprojet","inprogress","update");            
        }        
    }
    
    public goonestepback():void {
        this.navigationservice.jidentifiemessoutienscurrentstep = this.navigationservice.jidentifiemessoutienscurrentstep - 1;
        this.checkifstepvalid();
        console.log("currentstep: "+this.navigationservice.jidentifiemessoutienscurrentstep);
    } 
    
    public setstepatbeginning():void {
        let step : number = 0;
        step = Math.max(this.dbuserinfoservice.userinfo.experience.jidentifiemessoutiensstepvalidation);
        this.navigationservice.jidentifiemessoutienscurrentstep = step + 1;//if step == null, go to first step, if step == 2, go to the one after, and so on
    }
    
}
