//Built-in
import { Component, OnInit, Injectable } from '@angular/core';
import { element } from 'protractor';
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

@Component({
    selector: 'app-signinup',
    templateUrl: './signinup.component.html',
    styleUrls: ['./signinup.component.css']
})

export class SigninupComponent implements OnInit {

    private errormessagefr:string;
    errormsg = []; 
    
    constructor(
        public firebaseauth: FirebaseauthService,
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
        setTimeout(()=>{this.router.navigate(["beneficiaire/monplanning"]);},2000);
    }

    //FUnction triggered when user clicks on sign in
    onSignin(form: NgForm) {
        const email = form.value.signinemail;
        const password = form.value.signinpassword;
        this.signin(email, password);
    }
    
    signin(email, password){
        this.firebaseauth.signinUser(email, password)
        .then(
            (response) => {
                this.firebaseauth.setToken();
                console.log("signinup: firebase signin successful");
                this.meetingservice.getcurrentusermeetings();
                this.readwriteservice.getcurrentuserinfo()
                .then ((userinfo)=> {
                    this.dbuserinfoservice.integrate(userinfo)
                    let hellomsg:string = "Bonjour "+this.dbuserinfoservice.userinfo.publicinfo.firstname;
                    this.errormsg = [];
                    this.errormsg.push({severity:'success', summary:'Connexion', detail:hellomsg});
                    //console.log("this.router.navigate([this.dbuserinfoservice.userinfo.publicinfo.status] = "+ this.dbuserinfoservice.userinfo.publicinfo.status +")");
                    setTimeout(()=>{this.router.navigate([this.dbuserinfoservice.userinfo.publicinfo.status]);},1);//go to main after logging in
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
        const email = form.value.signupemail;
        const firstname = form.value.signupfirstname;
        const surname = form.value.signupsurname;
        const password = form.value.signuppassword;
        this.firebaseauth.signupUser(email, password)
        .then(
            (response) => {
                this.errormsg = [];
                this.errormsg.push({severity:'success', summary:'Création de compte', detail:response});
                this.firebaseauth.setToken();
                console.log("signinup: firebase signup successful")
                //console.log(response);
                this.readwriteservice.registercurrentuser(firstname,surname);                
                this.router.navigate([this.dbuserinfoservice.userinfo.publicinfo.status]);//go to main after creating account                
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