import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';//This is the Title service

import * as firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    
    public constructor(private titleService: Title ) {
        this.titleService.setTitle('Lunchtime Version 1');//Sets title
     }
    
    ngOnInit() {
        firebase.initializeApp({
            apiKey: "AIzaSyCdWffhlLWk5olASIDHMw0Y7rzXsc_Sxu8",
            authDomain: "ltmv1-8873c.firebaseapp.com"
        });
    }
}

