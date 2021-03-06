import { OnDestroy, ViewChild } from '@angular/core';
//Built-in
import { Component, OnInit, Injectable } from '@angular/core';
//import { element } from 'protractor';
import { NgForm } from "@angular/forms/forms";
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
//Hand-made services
import { FirebaseauthService } from './../../services/firebaseauth.service';//Firebase-based auth service
import { TitleService } from './../../services/title.service';//title handling service
import { ReadwriteService } from './../../services/readwrite.service';//handles read and write operations with Firebase
import { DbuserinfoService } from './../../services/dbuserinfo.service';//handles user info operations with Firebase
import { MeetingService } from './../../services/meeting.service';//This service handles the meetings based on dbuserinfo
 
//Graphic
import { 
    MessagesModule,
    GrowlModule,
    TabViewModule} from 'primeng/primeng';//PrimeNG error message handling
import { Subscription } from "rxjs/Rx";

@Component({
    selector: 'app-signinup',
    templateUrl: './signinup.component.html',
    styleUrls: ['./signinup.component.css']
})

export class SigninupComponent implements OnInit, OnDestroy {

    private errormessagefr:string;
    public firebaseitemsubscription:Subscription;
    errormsg = []; 

    constructor(
        public firebaseauthservice: FirebaseauthService,
        public router : Router,
        public titleservice: TitleService,
        public readwriteservice:ReadwriteService,
        public dbuserinfoservice:DbuserinfoService,
        public meetingservice:MeetingService
    ) {
        setTimeout(function (){titleservice.titlesubject.next("Se connecter");},500);//sets title in title service to "Se connecter" after half a second
    }
    
    ngOnInit() {
    }

    ngOnDestroy() {
        if(this.firebaseitemsubscription!==undefined){
            this.firebaseitemsubscription.unsubscribe();
        }
    }

    public getfrencherrormessage(errorcode:string):string {
        let errormessagefr : string = "";
        switch (errorcode) {
            case "auth/invalid-email" :
            errormessagefr = "L'adresse électronique n'est pas dans le bon format."
            break;
            case "auth/user-disabled" :
            errormessagefr = "Ce compte utilisateur a été suspendu. Veuillez nous contacter : team@lunchtimementoring.fr"
            break;
            case "auth/email-already-in-use" :
            errormessagefr = "Il existe déjà un compte avec cette adresse électronique."
            break;
            case "auth/weak-password" :
            errormessagefr = "Ce mot de passe est trop court."
            break;
            case "auth/wrong-password" :
            errormessagefr = "Mot de passe erroné."
            break;
            case "auth/user-not-found" :
            errormessagefr = "Identifiant erroné."
            break;
            case "auth/network-request-failed" :
            errormessagefr = "Problème de connexion Internet"
            break;            
            default :
            errormessagefr = "Il y a comme un souci..."
            console.log("errorcode : "+errorcode);
        }
        return errormessagefr;
    }

    //tryme just testing stuff:
    public tryme():void {
        this.readwriteservice.tryme();
    }

    //FUnction triggered when user clicks on sign in
    onSignin(form: NgForm) {
        const email = form.value.signinemail;
        const password = form.value.signinpassword;
        this.signin(email, password);
    }
    
    signin(email, password){
        this.firebaseauthservice.signinUser(email, password)
        .then(
            (response) => {
                this.firebaseauthservice.setToken();
                console.log("signinup: firebase signin successful");
                this.readwriteservice.getcurrentuserinfo();
                this.firebaseitemsubscription = this.readwriteservice.firebaseitem.valueChanges().subscribe(snapshot=>{
                    this.dbuserinfoservice.integrate(snapshot);
                    this.dbuserinfoservice.currentuserid=this.firebaseauthservice.angularfireauth.auth.currentUser.uid;
                    this.meetingservice.getcurrentusermeetings("creator")
                    .then(()=>{
                        let hellomsg:string = "Bonjour "+this.dbuserinfoservice.userinfo.publicinfo.firstname;
                        this.errormsg = [];
                        this.errormsg.push({severity:'success', summary:'Connexion', detail:hellomsg});
                        setTimeout(()=>{this.router.navigate([this.dbuserinfoservice.userinfo.publicinfo.status]);},500);//go to main after logging in
                    });
                });
            }
        )
        .catch(
            (firebaseerror) => {
                this.errormsg = [];
                let errorobject : any = firebaseerror;
                this.errormsg.push({severity:'error', summary:'Connexion', detail:this.getfrencherrormessage(errorobject.code)});
                //console.log("signinup: firebase signin failed!")
                //console.log(firebaseerror);
            }
        );
    }

    //FUnction triggered when user clicks on sign up
    onSignup(form: NgForm) {
        this.dbuserinfoservice.empty();
        this.dbuserinfoservice.userinfo.publicinfo.firstname = form.value.signupfirstname;
        this.dbuserinfoservice.userinfo.publicinfo.surname = form.value.signupsurname;
        this.dbuserinfoservice.userinfo.privateinfo.email = form.value.signupemail;
        this.dbuserinfoservice.userinfo.publicinfo.pictureurl = this.dbuserinfoservice.takerandompictureurl();
        const email = form.value.signupemail;
        const password = form.value.signuppassword;
        this.firebaseauthservice.signupUser(email, password)
        .then(
            (response) => {
                this.errormsg = [];
                this.errormsg.push({severity:'success', summary:'Création de compte', detail:"Compte créé !"});
                this.firebaseauthservice.setToken();
                console.log("signinup: firebase signup successful")
                this.readwriteservice.registercurrentuser("beneficiaire")
                .then(()=>{
                    this.firebaseitemsubscription = this.readwriteservice.firebaseitem.valueChanges().subscribe(snapshot=>{
                        this.dbuserinfoservice.integrate(snapshot);
                        this.meetingservice.getcurrentusermeetings("creator");
                        this.router.navigate([this.dbuserinfoservice.userinfo.publicinfo.status]);//go to main after creating account                
                    });                
                });
            }
        )
        .catch(
            (firebaseerror) => {
                this.errormsg = [];
                let errorobject : any = firebaseerror;
                this.errormsg.push({severity:'error', summary:'Création de compte', detail:this.getfrencherrormessage(errorobject.code)});
                console.log("signinup: firebase signup failed!")
                console.log(firebaseerror);
            }
        );
    }


}