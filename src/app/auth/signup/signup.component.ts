import { AuthService } from './../auth.service';//Firebase-based auth service
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms/forms";
import { MessagesModule } from 'primeng/primeng';//PrimeNG error message handling

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    
    errormsg = []; 

    constructor(
        private authService: AuthService
        ) { }
    
    ngOnInit() {
    }

    onSignup(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;
        this.authService.signupUser(email, password)
        .catch(
            (error) => {
                this.errormsg = [];
                this.errormsg.push({severity:'error', summary:'Erreur de connexion', detail:error.message});
            }
        );
    }
    
}
