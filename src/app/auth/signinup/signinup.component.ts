//Built-in
import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { NgForm } from "@angular/forms/forms";
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
    
    errormsg = []; 
    
    constructor(
    private authService: AuthService
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
                console.log(response);
                }
        )
        .catch(
            (error) => {
                this.errormsg = [];
                this.errormsg.push({severity:'error', summary:'Connexion', detail:error.message});
                console.log(error);
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
                console.log(response);
                }
        )
        .catch(
            (error) => {
                this.errormsg = [];
                this.errormsg.push({severity:'error', summary:'Création de compte', detail:error.message});
                console.log(error);
            }
        );
    }       
}