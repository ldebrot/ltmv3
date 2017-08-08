import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';//This is the Title service

import { AuthService } from './auth/auth.service';//TEMPORARY automatic login

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    
    public constructor(
        private titleService: Title,
        private authService: AuthService//TEMPORARY automatic login
    ) {
        this.titleService.setTitle('Lunchtime Version 1');//Sets title
     }
    
    ngOnInit() {
        //TEMPORARY automatic login
        this.authService.signinUser("test@test.com", "test1234")
        .then( (response) => {
            this.authService.setToken();
            console.log("app.components.ts: automatic firebase signin successful")
        })
        ;
    }
}

