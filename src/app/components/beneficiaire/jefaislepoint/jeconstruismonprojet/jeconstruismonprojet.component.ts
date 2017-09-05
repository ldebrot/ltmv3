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
    selector: 'app-jeconstruismonprojet',
    templateUrl: './jeconstruismonprojet.component.html',
    styleUrls: ['./jeconstruismonprojet.component.css']
})

export class JeconstruismonprojetComponent implements OnInit {


    public currentstepvalid:boolean=false;
    public ouinon : SelectItem[];
    public jeconstruismonprojetjeveuxensavoirplus: string[] = [];
    public jeconstruismonprojetstep7bvalues:any = {
        atext: [
            "Réflexion",
            "Préparation",
            "Formation",
            "Insertion",
            "Nouvelle vie"
        ],
        descriptiontext: [
            "Vous envisagez éventuellement une reconversion professionnelle. Vous n'en êtes pas entièrement sûr et n'avez pas encore choisi un métier.",
            "C'est sûr, vous allez changer de voie. Vous vous renseignez activement sur la reconversion professionnelle et différents métiers.",
            "Vous avez choisi un nouveau métier. Vous vous préparez activement à l'exercer, par exemple à travers une formation.",
            "Vous avez terminé votre formation et cherchez un poste dans votre nouveau domaine.",
            "Vous avez trouvé un poste dans votre nouveau domaine."
        ]
    };

    public localvalues = {
        jeconstruismonprojetstep1values:"",
        jeconstruismonprojetstep4avalues:"",
        jeconstruismonprojetstep4bvalues:"",
        jeconstruismonprojetstep5avalues:"",
        jeconstruismonprojetstep5bvalues:"",
        jeconstruismonprojetstep6avalues:"",
        jeconstruismonprojetstep6bvalues:"",
        jeconstruismonprojetstep7avalues:"",
        jeconstruismonprojetstep7bvalues:"",
        jeconstruismonprojetstep7bselected:"",
        jeconstruismonprojetstep7bselectedvalue:0,
        jeconstruismonprojetstep1jeveuxensavoirplus:"",
        jeconstruismonprojetstep2jeveuxensavoirplus:"",
        jeconstruismonprojetstep3jeveuxensavoirplus:"",
        jeconstruismonprojetstep4ajeveuxensavoirplus:"",
        jeconstruismonprojetstep4bjeveuxensavoirplus:"",
        jeconstruismonprojetstep5ajeveuxensavoirplus:"",
        jeconstruismonprojetstep5bjeveuxensavoirplus:"",
        jeconstruismonprojetstep6ajeveuxensavoirplus:"",
        jeconstruismonprojetstep6bjeveuxensavoirplus:"",
        jeconstruismonprojetstep7ajeveuxensavoirplus:""
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
                this.navigationservice.jeconstruismonprojetcurrentstep=Number(this.activatedroute.snapshot.params['step']);
            }
        }
    }

    ngOnDestroy() {
        this.readwritebufferservice.transmitbuffer();
        this.readwritebufferservice.emptybuffer();
    }

    //This function initiates the module by filling in values from dbuserservice
    //it fills in only for the steps indicated in OnInit
    public initiate():void {
        for (let i = 0; i < Object.keys(this.localvalues).length; i++) {
            //console.log(Object.keys(this.localvalues)[i])
            if (this.dbuserinfoservice.userinfo.experience[Object.keys(this.localvalues)[i]]!==undefined) {
                //console.log(Object.keys(this.localvalues)[i]);
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
        switch (this.navigationservice.jeconstruismonprojetcurrentstep) {
            case 1:
                //you need to select at least one value, therefore localvalues cannot be empty
                this.currentstepvalid = (this.localvalues['jeconstruismonprojetstep1values'].toString()==="") ? false : true ;
                //console.log("currentstep: "+ this.currentstepvalid);
            break;
            case 4:
                //you need to select at least one value, therefore localvalues cannot be empty
                tempnumbera = (this.localvalues['jeconstruismonprojetstep4avalues'].toString()==="") ? 0 : 1 ;
                tempnumberb = (this.localvalues['jeconstruismonprojetstep4bvalues'].toString()==="") ? 0 : 1 ;
                this.currentstepvalid = ((tempnumbera + tempnumberb) === 2) ? true : false ;
                //console.log("currentstep: "+ this.currentstepvalid);
            break;
            case 5:
                //you need to select at least one value, therefore localvalues cannot be empty
                tempnumbera = (this.localvalues['jeconstruismonprojetstep5avalues'].toString()==="") ? 0 : 1 ;
                tempnumberb = (this.localvalues['jeconstruismonprojetstep5bvalues'].toString()==="") ? 0 : 1 ;
                this.currentstepvalid = ((tempnumbera + tempnumberb) === 2) ? true : false ;
                //console.log("currentstep: "+ this.currentstepvalid);
            break;
            case 6:
                //you need to select at least one value, therefore localvalues cannot be empty
                tempnumbera = (this.localvalues['jeconstruismonprojetstep6avalues'].toString()==="") ? 0 : 1 ;
                tempnumberb = (this.localvalues['jeconstruismonprojetstep6bvalues'].toString()==="") ? 0 : 1 ;
                this.currentstepvalid = ((tempnumbera + tempnumberb) === 2) ? true : false ;
                //console.log("currentstep: "+ this.currentstepvalid);
            break;
            case 7:
                //you need to select at least one value, therefore localvalues cannot be empty
                tempnumbera = (this.localvalues['jeconstruismonprojetstep7avalues'].toString()==="") ? 0 : 1 ;
                tempnumberb = (this.localvalues['jeconstruismonprojetstep7bselected'].toString()==="") ? 0 : 1 ;
                this.currentstepvalid = ((tempnumbera + tempnumberb) === 2) ? true : false ;
                //console.log("currentstep: "+ this.currentstepvalid);
            break;
            default:
                console.log("cannot check whether step is valid");
                this.currentstepvalid = false;
        }
    }

    public goonestepfurther():void {
        this.navigationservice.jeconstruismonprojetcurrentstep = this.navigationservice.jeconstruismonprojetcurrentstep + 1;
        this.checkifstepvalid();
        console.log("currentstep: "+this.navigationservice.jeconstruismonprojetcurrentstep);

        if (this.navigationservice.jeconstruismonprojetcurrentstep === this.navigationservice.jeconstruismonprojetnumberofsteps) {
            this.conclude();
        }
    } 

    //This function "concludes" this module 
    public conclude():void{
        this.readwritebufferservice.updatebuffer("etapejeconstruismonprojet","done","update");
        this.readwritebufferservice.transmitbuffer();
    }

    public goonestepback():void {
        this.navigationservice.jeconstruismonprojetcurrentstep = this.navigationservice.jeconstruismonprojetcurrentstep - 1;
        this.checkifstepvalid();
        console.log("currentstep: "+this.navigationservice.jeconstruismonprojetcurrentstep);
    } 

    public setstepatbeginning():void {
        let step : number = 0;
        step = Math.max(this.dbuserinfoservice.userinfo.experience.jeconstruismonprojetstepvalidation);
        this.navigationservice.jeconstruismonprojetcurrentstep = step + 1;//if step == null, go to first step, if step == 2, go to the one after, and so on
    }

    public jeconstruismonprojetstep7bnextvalue():void {
        if (this.localvalues['jeconstruismonprojetstep7bselectedvalue']===this.jeconstruismonprojetstep7bvalues.descriptiontext.length-1) {
            this.localvalues['jeconstruismonprojetstep7bselectedvalue']=0;
        } else {
            this.localvalues['jeconstruismonprojetstep7bselectedvalue']++;
        }
        this.localvalues['jeconstruismonprojetstep7bselected']="";
        this.checkifstepvalid();
    }

    public jeconstruismonprojetstep7bpreviousvalue():void{
        if (this.localvalues['jeconstruismonprojetstep7bselectedvalue']===0) {
            this.localvalues['jeconstruismonprojetstep7bselectedvalue']=this.jeconstruismonprojetstep7bvalues.descriptiontext.length-1;
        } else {
            this.localvalues['jeconstruismonprojetstep7bselectedvalue']--;
        }
        this.localvalues['jeconstruismonprojetstep7bselected']="";
        this.checkifstepvalid();
    }

    public jeconstruismonprojetstep7bsetvalue():void {
        this.valuechanged('jeconstruismonprojetstep7bselected');
        this.valuechanged('jeconstruismonprojetstep7bselectedvalue');
    }

}
