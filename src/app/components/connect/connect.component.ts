//Built-in
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Home-made
import { FirebaseauthService } from './../../services/firebaseauth.service';
//PrimeNG
import {ConfirmDialogModule, ConfirmationService} from 'primeng/primeng';
//Service
import { DbuserinfoService } from './../../services/dbuserinfo.service';


@Component({
    selector: 'app-connect',
    templateUrl: './connect.component.html',
    styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {
    
    constructor(
        private firebaseauthservice: FirebaseauthService,
        private confirmationService: ConfirmationService,//PrimeNG confirmation dialog here
        private router : Router,
        private dbuserinfoService : DbuserinfoService
        ) { }
    
    ngOnInit() {
    
    }

   
    signOut () {
        this.confirmationService.confirm({
            message: 'Souhaitez-vous vous déconnecter ?',
            accept: () => {
                this.firebaseauthservice.signOut();
                this.dbuserinfoService.empty();
                this.router.navigate(['']);//go to main after logging out                
            }
        });
    }
    
}
