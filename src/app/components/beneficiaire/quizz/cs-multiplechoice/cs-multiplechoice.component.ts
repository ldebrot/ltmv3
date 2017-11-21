import { Subscription } from 'rxjs/Rx';
import { DbuserinfoService } from './../../../../services/dbuserinfo.service';
import { ReadwriteService } from './../../../../services/readwrite.service';
import { ReadwritebufferService } from './../../../../services/readwritebuffer.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { QuizzService } from "app/services/quizz.service";
import { FirebaseauthService } from 'app/services/firebaseauth.service';

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
    }

    public togglebutton(id:any):void{
        this.button_value[String(id)]=!this.button_value[String(id)];
        this.button_class[String(id)] = this.button_value[String(id)] === true ? this.quizzservice.currentcardobject.options[id].selectedclass+" "+this.buttonclassbasic  : this.quizzservice.currentcardobject.options[id].unselectedclass+" "+this.buttonclassbasic;
        let button_id = String(this.quizzservice.currentcardobject.parameters.quizzid) + "-" + String(this.quizzservice.currentcardobject.parameters.cardid) +"-" + String(id);
        this.readwritebufferservice.updatebuffer(button_id,this.button_value[String(id)],"update");
        console.log(id);
    }

    public populatebuttonitems () {
        this.buttonitems = [];
        for (let i = 0; i < this.quizzservice.currentcardobject.options.length; i++) {
            console.log("i"+String(i));
            this.buttonitems.push(this.quizzservice.currentcardobject.options[i]);
        }
    }

    public setupbuttonservice () {
        for (let i = 0; i < this.quizzservice.currentcardobject.options.length; i++) {
            console.log("i"+String(i));
            this.button_value[i]=false;
            this.button_class[i]=this.quizzservice.currentcardobject.options[i].unselectedclass + " " + this.buttonclassbasic;          
        }
    }

    temp_signin(email, password){
        this.firebaseauthservice.signinUser(email, password)
        .then(
            (response) => {
                this.firebaseauthservice.setToken();
                console.log("signinup: firebase signin successful");
                this.readwriteservice.getcurrentuserinfo();
                this.firebaseitemsubscription = this.readwriteservice.firebaseitem.subscribe(snapshot=>{
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
