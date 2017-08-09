//Built-in
import { Component, OnInit, Injectable } from '@angular/core';
import { element } from 'protractor';
import { NgForm } from "@angular/forms/forms";
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
//Hand-made services
import { AuthService } from './../auth.service';//Firebase-based auth service
import { TitleService } from './../../services/title.service';//title handling service
import { ReadwriteService } from './../../services/readwrite.service';//handles read and write operations with Firebase
//Graphic
import { MessagesModule } from 'primeng/primeng';//PrimeNG error message handling
import { TabViewModule } from 'primeng/primeng';//PrimeNG TabView

@Component({
    selector: 'app-signinup',
    templateUrl: './signinup.component.html',
    styleUrls: ['./signinup.component.css']
})

export class SigninupComponent implements OnInit {

    private errormessagefr:string;
    errormsg = []; 
    
    constructor(
        private authService: AuthService,
        private router : Router,
        private titleservice: TitleService,
        private readwriteservice:ReadwriteService   
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
            errormessagefr = "L'adresse électronique ou le mot de passe est erroné."
            break;
            default :
            errormessagefr = "Il y a comme un souci..."
        }
        return errormessagefr;
    }

    //FUnction triggered when user clicks on sign in
    onSignin(form: NgForm) {
        const email = form.value.signinemail;
        const password = form.value.signinpassword;
        this.authService.signinUser(email, password)
        .then(
            (response) => {
                this.authService.setToken();
                console.log("signinup: firebase signin successful")
                //console.log(response);

                this.readwriteservice.readcurrentuser("","public")
                .then((publicinfo:any)=>{
                    console.log(publicinfo);
                    let hellomsg:string = "Bonjour "+publicinfo.firstname;
                    this.errormsg = [];
                    this.errormsg.push({severity:'success', summary:'Connexion', detail:hellomsg});
                    setTimeout(()=>{this.router.navigate(['']);},2000);//go to main after logging in
                });

            }
        )
        .catch(
            (firebaseerror) => {
                this.errormsg = [];
                let errorobject : any = firebaseerror;
                this.errormsg.push({severity:'error', summary:'Connexion', detail:this.getfrencherrormessage(errorobject.code)});
                console.log("signinup: firebase signin failed!")
                console.log(firebaseerror);
            }
        );
    }
        
    //FUnction triggered when user clicks on sign up
    onSignup(form: NgForm) {
        const email = form.value.signupemail;
        const firstname = form.value.signupfirstname;
        const surname = form.value.signupsurname;
        const password = form.value.signuppassword;
        this.authService.signupUser(email, password)
        .then(
            (response) => {
                this.errormsg = [];
                this.errormsg.push({severity:'success', summary:'Création de compte', detail:response});
                this.authService.setToken();
                console.log("signinup: firebase signup successful")
                //console.log(response);
                this.readwriteservice.registercurrentuser(firstname,surname);                
                this.router.navigate(['']);//go to main after creating account                
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