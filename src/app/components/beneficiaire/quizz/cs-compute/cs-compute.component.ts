import { ScoringevaluateService } from './../../../../services/scoringevaluate.service';
import { DbuserinfoService } from './../../../../services/dbuserinfo.service';
import { QuizzService } from './../../../../services/quizz.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

//home-brewn services
import { ReadwritebufferService } from './../../../../services/readwritebuffer.service';
import { LibrarymetiersService } from './../../../../services/library_metiers.service';

//This component carries out tailor-made processes such as processing previous input and saving it as new experience 
@Component({
    selector: 'app-cs-compute',
    templateUrl: './cs-compute.component.html',
    styleUrls: ['./cs-compute.component.css']
})
export class CsComputeComponent implements OnInit {
    
    public outputexperienceid : string = "";

    constructor(
        private readwritebufferservice : ReadwritebufferService,
        private quizzservice : QuizzService,
        private librarymetiersservice : LibrarymetiersService,
        private dbuserinfoservice : DbuserinfoService,
        private scoringevaluateservice : ScoringevaluateService
    ) { }
    
    ngOnInit() {
        setTimeout(() => {
            this.executeprocess();
        }, 1);
    }
    
    public updaterwbuffer_byexperience(experienceid, experiencevalue):void{
        this.readwritebufferservice.updatebuffer(experienceid,experiencevalue,"update");            
    }

    public executeprocess () : void {
        this.outputexperienceid = this.quizzservice.currentcardobject.parameters.outputexperienceid;//for compute components, experience id is stored in quizzcards service
        let validprocess : boolean = true;
        let temp_promises_executeprocess = []
        temp_promises_executeprocess.push(new Promise(
            (resolve_executeprocess, reject_executeprocess) => {

            switch(String(this.quizzservice.currentcardobject.parameters.process)) {
                case "translategrandsdomainesintocodegranddomain":
                    console.log("computecomponent: load process 'translategrandsdomainesintocodegranddomain'");
                    this.translategrandsdomainesintocodegranddomain();
                    resolve_executeprocess();
                    break
                case "translatelibelle_appellation_courtintointitule":
                    console.log("computecomponent: load process 'translatelibelle_appellation_courtintointitule'");
                    this.translatelibelle_appellation_courtintointitule();
                    resolve_executeprocess();
                    break
                case "translate145into146":
                    console.log("computecomponent: load process 'translate145into146'");
                    this.translate145into146();
                    resolve_executeprocess();
                    break
                case "setvalue":
                    console.log("computecomponent: load process 'setvalue'");
                    this.setvalue();
                    resolve_executeprocess();
                    break
                case "useguide":
                    console.log("computecomponent: load process 'useguide'");
                            this.scoringevaluateservice.useguide(this.quizzservice.currentcardobject.parameters.instruction)
                            .then(()=>{
                                resolve_executeprocess();
                                console.log("ALL DONE NOW!");
                            });    
                    break
                case "generatecommonoutput":
                    console.log("computecomponent: load process 'generatecommonoutput'");
                    this.generatecommonoutput();
                    resolve_executeprocess();
                    break
                case "launchprescoring":
                    console.log("computecomponent: load process 'launchprescoring'");
                    this.launchprescoring();
                    resolve_executeprocess();
                    break
                default:
                    console.log("computecomponent : ERROR, did not find computing process")
                    reject_executeprocess();
                    break
                }
            }
        ));

        Promise.all(temp_promises_executeprocess)
        .then(()=>{
            this.quizzservice.gotonextcard();//you're done processing, so let's move on to the next card!
        });
            
    }

    //PROCESSES

    //this process checks which grands domaines were selected by user and then creates an experience containing an array of code_grand_domain, used for dropdown filtering later on, in card 143
    public translategrandsdomainesintocodegranddomain():void{
        let temp_array : any[] = [];
        let temp_experienceid : string = "";
        for (let i = 0; i < this.librarymetiersservice.domaines.experienceoptionid.length ; i++) {
            temp_experienceid = this.quizzservice.currentcardobject.parameters.inputexperienceid + this.librarymetiersservice.domaines.experienceoptionid[i];
            if (this.dbuserinfoservice.userinfo.experience[temp_experienceid] != null) {
                //console.log("translategrandsdomainesintocodegranddomain : experience found");
                if (this.dbuserinfoservice.userinfo.experience[temp_experienceid] == true) {
                    //console.log("translategrandsdomainesintocodegranddomain : experience true");
                    temp_array.push(this.librarymetiersservice.domaines.code_grand_domaine[i])
                }
            } else {
                //console.log("translategrandsdomainesintocodegranddomain : experience not found");
            }
        }
        this.updaterwbuffer_byexperience(this.outputexperienceid,temp_array);
    }

    //this process sets "intitule" values from metiers library corresponding to "libelle_appellation_court" (also a metiers library value)
    public translatelibelle_appellation_courtintointitule():void {
        let temp_array : any[] = [];
        let temp_input = this.dbuserinfoservice.userinfo.experience[this.quizzservice.currentcardobject.parameters.inputexperienceid];
        if (temp_input != null && Array.isArray(temp_input)){
            temp_input.forEach(element => {
                //console.log("element",element);
                let temp_index : number = this.librarymetiersservice.metiers.libelle_appellation_court.indexOf(element);
                if (temp_index != -1){
                    if (temp_array.indexOf(this.librarymetiersservice.metiers.intitule[temp_index])==-1){
                        temp_array.push(this.librarymetiersservice.metiers.intitule[temp_index]);
                    }
                } else {
                    console.log("translatelibelle_appellation_courtintointitule: ERROR, did not find equivalent");
                }
            });
            this.updaterwbuffer_byexperience(this.outputexperienceid,temp_array);
        }else{
            console.log("translatelibelle_appellation_courtintointitule: ERROR, inputexperienceid is either null or not an array!");
        }   
    }

    public translate145into146():void {
        let temp_value = this.dbuserinfoservice.userinfo.experience["2-145-1"] == true ? "temoin" : "beneficiaire";
        this.updaterwbuffer_byexperience(this.outputexperienceid,temp_value);
    }
    

    public launchprescoring():void{
        this.scoringevaluateservice.prescoringactiveuser(this.dbuserinfoservice.currentuserid);
    }

    //this one copies existing experience values from input to another output id, thus creating a common reference for further comparison during scoring process (e.g. compare métiers of témoins and users)
    public generatecommonoutput():void{
        let temp_inputexperienceid = this.quizzservice.currentcardobject.parameters.inputexperienceid;
        let temp_outputexperienceid = this.quizzservice.currentcardobject.parameters.outputexperienceid;
        
        if (typeof this.dbuserinfoservice.userinfo.experience[temp_inputexperienceid] != "undefined"){
            let temp_experiencevalue = this.dbuserinfoservice.userinfo.experience[temp_inputexperienceid];
            this.updaterwbuffer_byexperience(temp_outputexperienceid,temp_experiencevalue);
        } else {
            console.log("generatecommonoutput: ERROR, input experience of card " + this.quizzservice.currentcardid + " is not available for current user.")
        }

    }

    public setvalue():void{
        this.updaterwbuffer_byexperience(this.outputexperienceid,this.quizzservice.currentcardobject.parameters.inputexperienceid);
    }

}
