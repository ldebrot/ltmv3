import { Subscription } from 'rxjs/Rx';
import { DbuserinfoService } from './../../../../services/dbuserinfo.service';
import { ReadwriteService } from './../../../../services/readwrite.service';
import { ReadwritebufferService } from './../../../../services/readwritebuffer.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { QuizzService } from "app/services/quizz.service";
import { FirebaseauthService } from 'app/services/firebaseauth.service';
import { checkbuttontooltipmodel } from '../../../../services/checkbuttontooltipmodel.model';

@Injectable()
@Component({
    selector: 'app-cs-multiplechoice',
    templateUrl: './cs-multiplechoice.component.html',
    styleUrls: ['./cs-multiplechoice.component.css']
})
export class CsMultiplechoiceComponent implements OnInit {

    public buttonitems : any[] = [];
    public button_value : any = {};
    public button_class : any = {};
    public firebaseitemsubscription:Subscription;
    public buttonclassbasic : String = "csmultiplechoice_buttonitem";
    public maxselected : number = 0;
    public minselected : number = 0;
    public listofselectedbuttons : any[] = [];
    public sounds_buttontick : any = {};
    public titlecaption : string = "";
    
    constructor(
        private quizzservice : QuizzService,
        private readwritebufferservice : ReadwritebufferService,
        private firebaseauthservice : FirebaseauthService,
        private readwriteservice : ReadwriteService,
        private dbuserinfoservice : DbuserinfoService
    ) {
    }
    
    ngOnInit() {
        this.temp_signin("mc@mc.com", "mcmcmcmc");
        this.populatebuttonitems();
        this.setupbuttonservice();
        this.setuptitle();
        this.sounds_buttontick = new Audio('./../../../../assets/sounds/buttontick.mp3')
    }

    //This one mixes up cardposition and cardit
    public togglebutton(buttonid:string):void{
        console.log("togglebutton - ID is :"+buttonid);
        console.log("togglebutton - String(ID) is :"+String(buttonid));  
        console.log("this.maxselected");
        console.log(this.maxselected);
  
        if (this.gettotalselected()<this.maxselected) {
            //we can still select one more
            console.log("togglebutton - ID is :"+buttonid);
            this.changebuttonvalue(buttonid);
            this.sounds_buttontick.play();
        }else{
            //we have reached the maximum number of selected items
            if (this.button_value[String(buttonid)] === false){//if this change would mean adding one too many (rather than deactivating a choice)
                this.deletesfirstselection();
            }
            this.changebuttonvalue(buttonid);            
            this.sounds_buttontick.play();
        }
        if (this.gettotalselected()>=this.minselected){
            if(this.quizzservice.checkbuttonstatus!=true){
                this.quizzservice.setcheckbutton(true);
                let temp_instructions = new checkbuttontooltipmodel("Clique ici quand tu as fait ta sélection", 500, 3500);
                this.quizzservice.setcheckbuttontt(temp_instructions);    
            }
        } else {
            this.quizzservice.setcheckbutton(false);
        }
    }

    //Checks how many buttons are selected
    public gettotalselected():number{
        let temp_totalselected : number = 0;
        for (let i = 0; i < Object.keys(this.button_value).length ; i++) {
            if (this.button_value[Object.keys(this.button_value)[i]] === true) {
                temp_totalselected++;
            }
        }
        console.log("temp_totalselected:"+temp_totalselected);
        return temp_totalselected;
    }

    //changes buttonvalue and saves changes
    public changebuttonvalue(buttonid:any):void{
        console.log("changebuttonvalue - ID is :"+buttonid);
        console.log("changebuttonvalue - String(ID) is :"+String(buttonid));        
        if (this.button_value[String(buttonid)] === true) {
            //was selected, is now unselected
            this.button_value[String(buttonid)] = false;
            this.button_class[String(buttonid)] = this.quizzservice.currentcardobject["option"+String(buttonid)].unselectedclass+" "+this.buttonclassbasic;
            this.deleteselectionfromlist(buttonid);
        } else {
            //was unselected, is now selected
            this.button_value[String(buttonid)] = true;
            this.button_class[String(buttonid)] = this.quizzservice.currentcardobject["option"+String(buttonid)].selectedclass+" "+this.buttonclassbasic
            this.addsselectiontolist(buttonid);
        }
        //save changes
        let button_id = String(this.quizzservice.currentquizzid) + "-" + String(this.quizzservice.currentcardid) +"-" + String(buttonid);
        this.readwritebufferservice.updatebuffer(button_id,this.button_value[String(buttonid)],"update");
        console.log(this.listofselectedbuttons);
    }

    public deleteselectionfromlist(id:any){
        let temp_position : number = -1;
        for (let i = 0; i < this.listofselectedbuttons.length; i++){
            if (this.listofselectedbuttons[i]===id){
                temp_position = i;
            }
        }
        console.log("deleted id:"+this.listofselectedbuttons[temp_position]+" position:"+temp_position);
        this.listofselectedbuttons.splice(temp_position, 1);
    }

    public addsselectiontolist(id:any){
        this.listofselectedbuttons.push(id);
    }

    public deletesfirstselection(){
        this.changebuttonvalue(this.listofselectedbuttons[0]);
    }

    public populatebuttonitems () {
        this.buttonitems = [];
        for (let i = 0; i < this.quizzservice.currentcardobject.parameters.options.length; i++) {
            let temp_optionid = this.quizzservice.currentcardobject.parameters.options[i];
            this.buttonitems.push(this.quizzservice.currentcardobject["option"+String(temp_optionid)]);
        }
        this.maxselected = (this.quizzservice.currentcardobject.parameters.maxselected == null) ? this.quizzservice.currentcardobject.parameters.options.length : this.quizzservice.currentcardobject.parameters.maxselected;
        this.minselected = (this.quizzservice.currentcardobject.parameters.minselected == null) ? 0 : this.quizzservice.currentcardobject.parameters.minselected;
    }

    public setupbuttonservice ():void {
        for (let i = 0; i < this.quizzservice.currentcardobject.parameters.options.length; i++) {
            let temp_optionid = this.quizzservice.currentcardobject.parameters.options[i];
            this.button_value[temp_optionid]=false;
            this.button_class[temp_optionid]=this.quizzservice.currentcardobject["option"+String(temp_optionid)].unselectedclass + " " + this.buttonclassbasic;          
        }
        console.log(this.button_class);
    }

    public setuptitle():void {
        if (this.quizzservice.currentcardobject.parameters.titlecaption !== null) {
            this.titlecaption = this.quizzservice.currentcardobject.parameters.titlecaption;
        }
    }

    temp_signin(email, password){
        this.firebaseauthservice.signinUser(email, password)
        .then(
            (response) => {
                this.firebaseauthservice.setToken();
                console.log("signinup: firebase signin successful");
                this.readwriteservice.getcurrentuserinfo();
                this.firebaseitemsubscription = this.readwriteservice.firebaseitem.valueChanges().subscribe(snapshot=>{
                    this.dbuserinfoservice.integrate(snapshot);
                    this.dbuserinfoservice.currentuserid=this.firebaseauthservice.angularfireauth.auth.currentUser.uid;
                });
            }
        )
        .catch(
            (firebaseerror) => {
                console.log("signinup: firebase signin failed!")
                console.log(firebaseerror);
            }
        );
    }


}
