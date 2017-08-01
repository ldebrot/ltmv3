//Built-in
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { NgForm } from "@angular/forms/forms";
import { Router } from '@angular/router';
//Hand-made
import { AuthService } from './../auth.service';//Firebase-based auth service
//Graphic
import { MessagesModule } from 'primeng/primeng';//PrimeNG error message handling

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
    ) { }
    
    ngOnInit() {
    }
    
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
                switch (errorobject.code) {
                    case "auth/invalid-email" :
                    this.errormessagefr = "L'adresse électronique n'est pas dans le bon format."
                    break;
                    case "auth/user-disabled" :
                    this.errormessagefr = "Ce compte utilisateur a été suspendu. Veuillez nous contacter : team@lunchtimementoring.fr"
                    break;
                    case "auth/wrong-password" :
                    this.errormessagefr = "L'adresse électronique ou le mot de passe est erroné."
                    break;
                    default :
                    this.errormessagefr = "Il y a comme un souci..."
                }
                this.errormsg.push({severity:'error', summary:'Connexion', detail:this.errormessagefr});
                console.log(firebaseerror);
            }
        );
    }
        
    onSignup(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;
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
            (error) => {
                this.errormsg = [];
                this.errormsg.push({severity:'error', summary:'Création de compte', detail:error.message});
                //console.log(error);
            }
        );
    }

}