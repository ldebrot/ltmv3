//Built-in
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Home-made
import { AuthService } from './../../auth/auth.service';
//PrimeNG
import {ConfirmDialogModule, ConfirmationService} from 'primeng/primeng';

@Component({
    selector: 'app-connect',
    templateUrl: './connect.component.html',
    styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {
    
    constructor(
        private authService: AuthService,
        private confirmationService: ConfirmationService,//PrimeNG confirmation dialog here
        private router : Router
        ) { }
    
    ngOnInit() {
    
    }

   
    signOut () {
        this.confirmationService.confirm({
            message: 'Souhaitez-vous vous déconnecter ?',
            accept: () => {
                this.authService.signOut();
                this.router.navigate(['']);//go to main after logging out                
            }
        });
    }
    
}
