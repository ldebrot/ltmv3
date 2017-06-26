import { DialogModule } from 'primeng/primeng';
import { AuthService } from './../auth.service';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms/forms";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    
    constructor(private authService: AuthService) { }
    
    ngOnInit() {
    }

    display: boolean = false;

    showDialog() {
        this.display = true;
    }
        
    onSignup(form: NgForm) {
        const email = form.value.email;
        const password = form.value.password;
        this.authService.signupUser(email, password)
        .catch(
            (error) => {console.log(error)}
        );
    }
    
}
