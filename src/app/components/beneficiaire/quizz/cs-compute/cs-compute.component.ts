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
    
    public experience : string = "";

    constructor(
        private readwritebufferservice : ReadwritebufferService,
        private quizzservice : QuizzService,
        private librarymetiersservice : LibrarymetiersService,
        private dbuserinfoservice : DbuserinfoService
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
        this.experience = this.quizzservice.currentcardobject.parameters.experience;//for compute components, experience id is stored in quizzcards service
        let validprocess : boolean = true;
        switch(String(this.quizzservice.currentcardobject.parameters.process)) {
            case "translate141into142":
                console.log("computecomponent: load process 'translate141into142'");
                this.translate141into142();
                break
            case "translate143into144":
                console.log("computecomponent: load process 'translate143into144'");
                this.translate143into144();
                break
            default:
                console.log("computecomponent : did not find computing process")
                validprocess = false;
                break
        }
        if (validprocess) {
            this.quizzservice.gotonextcard();//you're done processing, so let's move on to the next card!
        }
    }

    //PROCESSES

    //this process checks which grands domaines were selected by user and then creates an experience containing an array of code_grand_domain, used for dropdown filtering later on, in card 143
    public translate141into142():void{
        let temp_array : any[] = [];
        let temp_experienceid : string = "";
        for (let i = 0; i < this.librarymetiersservice.domaines.experienceid.length ; i++) {
            temp_experienceid = this.librarymetiersservice.domaines.experienceid[i];
            if (this.dbuserinfoservice.userinfo.experience[temp_experienceid] != null) {
                //console.log("translate141into142 : experience found");
                if (this.dbuserinfoservice.userinfo.experience[temp_experienceid] == true) {
                    //console.log("translate141into142 : experience true");
                    temp_array.push(this.librarymetiersservice.domaines.code_grand_domaine[i])
                }
            } else {
                //console.log("translate141into142 : experience not found");
            }
        }
        this.updaterwbuffer_byexperience(this.experience,temp_array);
    }

    //this process sets "intitule" values from metiers library corresponding to "libelle_appellation_court" (also a metiers library value)
    public translate143into144():void {
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
                    console.log("translate143into144: did not find equivalent");
                }
            });
            this.updaterwbuffer_byexperience(this.experience,temp_array);
        }else{
            console.log("translate143into144: inputexperienceid is either null or not an array!");
        }
        
    }

}
