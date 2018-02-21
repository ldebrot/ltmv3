
//PrimeNG
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { SidebarModule } from 'primeng/sidebar';

//Built-in
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Hand-made
import { FirebaseauthService } from './../../services/firebaseauth.service';
import { ConnectService } from './../../services/connect.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
    
    public display : boolean = false;

    constructor(
        private confirmationService: ConfirmationService,//PrimeNG confirmation dialog here
        private router : Router,
        private connectservice : ConnectService,
        private firebaseauthservice : FirebaseauthService
    ) { }

    ngOnInit() {
    }

    signOut () {
        this.confirmationService.confirm({
            message: 'Souhaitez-vous vous déconnecter ?',
            accept: () => {
                this.connectservice.signout();
                this.router.navigate(['']);//go to main after logging out                
            }
        });
    }

}
