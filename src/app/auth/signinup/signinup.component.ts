//Built-in
import { Component, OnInit, Injectable } from '@angular/core';
import { element } from 'protractor';
import { NgForm } from "@angular/forms/forms";
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
//Hand-made services
import { AuthService } from './../auth.service';//Firebase-based auth service
import { TitleService } from './../../services/title.service';//title handling service
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
        const email = form.value.email;
        const password = form.value.password;
        this.authService.signinUser(email, password)
        .then(
            (response) => {
                this.errormsg = [];
                this.errormsg.push({severity:'success', summary:'Connexion', detail:response});
                this.authService.setToken();
                console.log(response);
                this.router.navigate(['']);//go to main after logging in
                }
        )
        .catch(
            (firebaseerror) => {
                this.errormsg = [];
                let errorobject : any = firebaseerror;
                this.errormsg.push({severity:'error', summary:'Connexion', detail:this.getfrencherrormessage(errorobject.code)});
                console.log(firebaseerror);
            }
        );
    }
        
    //FUnction triggered when user clicks on sign up
    onSignup(form: NgForm) {
        const email = form.value.signupemail;
        const password = form.value.signuppassword;
        this.authService.signupUser(email, password)
        .then(
            (response) => {
                this.errormsg = [];
                this.errormsg.push({severity:'success', summary:'Création de compte', detail:response});
                this.authService.setToken();
                //console.log(response);
                this.router.navigate(['']);//go to main after creating account                
                }
        )
        .catch(
            (firebaseerror) => {
                this.errormsg = [];
                let errorobject : any = firebaseerror;
                this.errormsg.push({severity:'error', summary:'Création de compte', detail:this.getfrencherrormessage(errorobject.code)});
                console.log(firebaseerror);
            }
        );
    }

}