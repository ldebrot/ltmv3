//Built-in
import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { NgForm } from "@angular/forms/forms";
//Hand-made
import { AuthService } from './../auth.service';//Firebase-based auth service
//Graphic
import { MessagesModule } from 'primeng/primeng';//PrimeNG error message handling

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
    
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
                this.errormsg.push({severity:'success', summary:'Identification', detail:response});            }
        )
        .catch(
            (error) => {
                this.errormsg = [];
                this.errormsg.push({severity:'error', summary:'Erreur de connexion', detail:error.message});
            }
        );
    }
}
